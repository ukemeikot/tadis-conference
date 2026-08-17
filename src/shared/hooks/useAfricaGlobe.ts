import { useEffect } from 'react'
import type { RefObject } from 'react'
import * as THREE from 'three'
import { AFRICA, MADAGASCAR, inside } from '../lib/africa'

/**
 * Africa, as a point cloud on a slowly turning globe.
 *
 * Ported from the design's `initGlobe`. Rather than load a GeoJSON continent
 * outline, it rejection-samples a lat/long grid against the inline polygon in
 * shared/lib/africa.ts — every 0.6° cell whose jittered centre falls inside the
 * outline becomes one gold dot, with roughly one in eight promoted to a larger
 * lime accent dot. Cheap, no network fetch, and the jitter keeps it from reading
 * as a grid.
 */
const RADIUS = 1.985

type Options = {
  /** Skip the animation loop entirely (reduced motion). Static frame is still drawn. */
  animate?: boolean
}

/**
 * Mounts the globe onto `canvasRef`. Returns nothing; all cleanup is handled on
 * unmount, including disposing geometries, materials and the WebGL context so
 * repeated hot reloads do not leak contexts.
 */
export function useAfricaGlobe(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  { animate = true }: Options = {},
) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // A browser without WebGL should get the gradient overlay alone, not a crash.
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    } catch (err) {
      console.warn('[TADIS] WebGL unavailable, skipping hero globe.', err)
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 0, 7.2)

    const group = new THREE.Group()
    group.rotation.z = -0.25
    group.rotation.y = -0.35
    scene.add(group)

    // ---- sample the continent into two point sets ----
    const land: number[] = []
    const accent: number[] = []

    for (let lat = -36; lat <= 38; lat += 0.6) {
      for (let lon = -19; lon <= 53; lon += 0.6) {
        const jx = lon + (Math.random() - 0.5) * 0.45
        const jy = lat + (Math.random() - 0.5) * 0.45
        if (!inside(jx, jy, AFRICA) && !inside(jx, jy, MADAGASCAR)) continue

        const phi = (jy * Math.PI) / 180
        const lambda = (jx * Math.PI) / 180
        const point = [
          RADIUS * Math.cos(phi) * Math.sin(lambda),
          RADIUS * Math.sin(phi),
          RADIUS * Math.cos(phi) * Math.cos(lambda),
        ]
        ;(Math.random() < 0.12 ? accent : land).push(point[0], point[1], point[2])
      }
    }

    // Track everything disposable so unmount is exhaustive.
    const disposables: Array<{ dispose(): void }> = []

    const makePoints = (coords: number[], color: number, size: number, opacity: number) => {
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(coords), 3),
      )
      const material = new THREE.PointsMaterial({ color, size, transparent: true, opacity })
      disposables.push(geometry, material)
      return new THREE.Points(geometry, material)
    }

    group.add(makePoints(land, 0xe9c935, 0.026, 0.95))
    group.add(makePoints(accent, 0xa3d93c, 0.042, 1))

    // Wireframe shell — reads as longitude/latitude lines behind the dots.
    const shellGeo = new THREE.SphereGeometry(1.95, 30, 20)
    const shellMat = new THREE.MeshBasicMaterial({
      color: 0x159b62,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    })
    disposables.push(shellGeo, shellMat)
    group.add(new THREE.Mesh(shellGeo, shellMat))

    // Opaque interior, so dots on the far side are correctly hidden.
    const coreGeo = new THREE.SphereGeometry(1.92, 48, 32)
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x05231a })
    disposables.push(coreGeo, coreMat)
    group.add(new THREE.Mesh(coreGeo, coreMat))

    // Two orbital rings on different axes.
    const ringGeo = new THREE.TorusGeometry(2.85, 0.008, 8, 220)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xa3d93c,
      transparent: true,
      opacity: 0.55,
    })
    disposables.push(ringGeo, ringMat)
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2.35
    group.add(ring)

    const ring2Geo = new THREE.TorusGeometry(3.35, 0.005, 8, 220)
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xe9c935,
      transparent: true,
      opacity: 0.3,
    })
    disposables.push(ring2Geo, ring2Mat)
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
    ring2.rotation.x = Math.PI / 1.9
    ring2.rotation.y = 0.4
    group.add(ring2)

    // ---- sizing ----
    const resize = () => {
      const width = canvas.clientWidth || 1
      const height = canvas.clientHeight || 1
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      // On a wide screen, push the globe right so it sits clear of the copy.
      group.position.x = width > 900 ? 1.05 : 0
      camera.updateProjectionMatrix()
      renderer.render(scene, camera)
    }
    resize()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    // ---- pointer parallax ----
    let mx = 0
    let my = 0
    let tx = 0
    let ty = 0
    const onPointerMove = (event: PointerEvent) => {
      tx = (event.clientX / window.innerWidth - 0.5) * 0.5
      ty = (event.clientY / window.innerHeight - 0.5) * 0.35
    }

    // ---- render loop, paused whenever the hero is off-screen ----
    let rafId = 0
    let visible = true

    const loop = () => {
      mx += (tx - mx) * 0.05
      my += (ty - my) * 0.05
      group.rotation.y += 0.0016
      group.rotation.x = my * 0.6
      group.rotation.z = -0.25 + mx * 0.25
      ring.rotation.z += 0.0009
      ring2.rotation.z -= 0.0006
      renderer.render(scene, camera)
      rafId = requestAnimationFrame(loop)
    }

    const start = () => {
      if (!animate || rafId || !visible) return
      rafId = requestAnimationFrame(loop)
    }
    const stop = () => {
      if (!rafId) return
      cancelAnimationFrame(rafId)
      rafId = 0
    }

    // Only spend frames while the hero is actually on screen.
    const hero = canvas.closest('section') ?? canvas
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) start()
        else stop()
      },
      { threshold: 0 },
    )
    heroObserver.observe(hero)

    if (animate) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      start()
    }

    return () => {
      stop()
      heroObserver.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      for (const item of disposables) item.dispose()
      renderer.dispose()
    }
  }, [canvasRef, animate])
}
