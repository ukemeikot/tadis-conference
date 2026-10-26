import { useEffect, useRef } from 'react'
import type { CSSProperties, MouseEvent } from 'react'
import { memoryWalk, sessionById, watchUrl } from '../../content'
import type { MemoryItem } from '../../content/types'
import { site } from '../../shared/config/site'
import { c, font, gold, lime, t } from '../../shared/config/theme'
import { useReducedMotion } from '../../shared/hooks/useMotion'
import { useScrollFrame } from '../../shared/hooks/useScrollFrame'
import { PlayDisc } from '../../shared/ui'

/** Distance between stops along the walk, in px of camera travel. */
const GAP = 520
/** How far ahead of the camera the first stop starts. */
const LEAD = 1100
/**
 * Camera px travelled per px scrolled. The design walked about 1.8; with twice
 * the stops this is nudged up so the section does not run on for too long. The
 * section height is derived from the stop count at this rate.
 */
const PACE = 2.1

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  x: (Math.sin(i * 12.9898) * 43758.5453) % 1,
  y: (Math.sin(i * 78.233) * 12543.7) % 1,
  z: -Math.round(((i * 0.61803398875) % 1) * 6000),
  gold: i % 3 === 0,
}))

/**
 * The memory walk: the day laid out along a glowing path that you walk down by
 * scrolling. Chapter signs stand on the centre line; photos, clips and session
 * cards stand either side of it and drift past as the camera moves forward.
 *
 * On a phone the path narrows to a single corridor — cards come straight at you,
 * sized to the screen. With reduced motion the same stops render as a plain
 * vertical timeline instead.
 */
export function MemoryWalk() {
  const reduced = useReducedMotion()
  return reduced ? <WalkList /> : <Walk3d />
}

/* -------------------------------------------------------------------------- */
/*                                  3D walk                                   */
/* -------------------------------------------------------------------------- */

/** Below this width the walk becomes a single corridor. */
const NARROW = 720
/** Depth a stop stands at when it is "in focus": close, but whole on screen. */
const FOCUS_Z = -560
/** Spacing of the cross-rules on the floor; the floor scrolls modulo this. */
const RULE = 160

/** `far` is how deep into the walk you can see; `fit` the widest a stop may appear. */
type Geometry = {
  vw: number
  vh: number
  sideX: number
  yaw: number
  fit: number
  far: number
  /** Easing time constant, ms. Shorter on touch so the walk keeps up with the finger. */
  ease: number
}

function geometry(): Geometry {
  const vw = window.innerWidth
  const vh = window.innerHeight
  if (vw < NARROW) {
    // One corridor: a slight left/right stagger, cards scaled to fit the screen.
    // A shorter view ahead too, so the corridor shows the next stop or two
    // rather than a pile of them stacked behind one another.
    return { vw, vh, sideX: vw * 0.1, yaw: 10, fit: vw - 36, far: 2300, ease: 55 }
  }
  return { vw, vh, sideX: Math.min(vw * 0.27, 400), yaw: 30, fit: Infinity, far: 5200, ease: 110 }
}

function Walk3d() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const chapterRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)

  const cache = useRef<{
    items: HTMLElement[]
    signs: boolean[]
    widths: number[]
    videos: (HTMLVideoElement | null)[]
    shown: boolean[]
    dust: HTMLElement[]
    rules: HTMLElement | null
  } | null>(null)

  // The camera eases toward the scroll position rather than jumping to it, so a
  // mouse wheel's coarse steps become one continuous glide.
  const motion = useRef({ target: 0, current: 0, raf: 0, last: 0, geo: null as Geometry | null })

  const travel = (memoryWalk.length - 1) * GAP + LEAD - 700
  const scrollLength = Math.round(travel / PACE)

  const ensureCache = () => {
    const section = sectionRef.current
    if (!section) return null
    if (!cache.current) {
      const items = Array.from(section.querySelectorAll<HTMLElement>('[data-m]'))
      cache.current = {
        items,
        signs: items.map((el) => el.dataset.kind === 'sign'),
        widths: items.map((el) => Number(el.dataset.w)),
        videos: items.map((el) => el.querySelector('video')),
        shown: items.map(() => false),
        dust: Array.from(section.querySelectorAll<HTMLElement>('[data-dust]')),
        rules: section.querySelector<HTMLElement>('[data-rules]'),
      }
    }
    return cache.current
  }

  /** Draws the walk at progress `p` (0 → 1). Writes transforms and opacity only. */
  const render = (p: number, geo: Geometry) => {
    const els = ensureCache()
    if (!els) return
    const cam = p * travel
    let chapter = 'Start of the day'

    els.items.forEach((el, i) => {
      const side = el.dataset.side
      const isSign = els.signs[i]
      const z = -(i * GAP + LEAD) + cam
      const x = side === 'L' ? -geo.sideX : side === 'R' ? geo.sideX : 0
      const yaw = side === 'L' ? geo.yaw : side === 'R' ? -geo.yaw : 0
      // Signs fade sooner so they never fill the screen as you walk through them.
      const near = isSign ? -420 : -160

      let o = Math.min(1, (z + geo.far) / (geo.far * 0.31))
      if (z > near) o *= Math.max(0, 1 - (z - near) / 300)
      // Nothing shows until the intro title has cleared.
      o *= Math.max(0, Math.min(1, (p - 0.025) / 0.03))
      o = Math.max(0, o)

      const visible = o > 0.002
      if (visible) {
        const scale = Math.min(1, geo.fit / els.widths[i])
        el.style.transform =
          `translate3d(${x.toFixed(1)}px, 0px, ${z.toFixed(1)}px) rotateY(${yaw}deg)` +
          (scale < 1 ? ` scale(${scale.toFixed(3)})` : '')
        el.style.opacity = o.toFixed(3)
      }
      // Stops out of view are taken out of rendering entirely: merely hiding them
      // would keep a GPU layer per stop alive, which is what starves a phone.
      if (visible !== els.shown[i]) {
        els.shown[i] = visible
        el.style.display = visible ? '' : 'none'
      }
      // Faint stops further down the path still take clicks — that is how you
      // bring one to you.
      const interactive = o > 0.08 ? 'auto' : 'none'
      if (el.style.pointerEvents !== interactive) el.style.pointerEvents = interactive
      if (isSign && z > -1300) chapter = el.dataset.title ?? chapter

      // Clips only load and play while they are near enough to see.
      const video = els.videos[i]
      if (video) {
        if (visible && z > -2600 && z < 60) {
          if (!video.getAttribute('src') && video.dataset.src) video.src = video.dataset.src
          if (video.paused) video.play().catch(() => {})
        } else if (!video.paused) {
          video.pause()
        }
      }
    })

    for (const d of els.dust) {
      const z = ((((Number(d.dataset.dz) + cam) % 6000) + 6000) % 6000) - 6000
      const x = Number(d.dataset.dx) * geo.vw * 0.7
      const y = Number(d.dataset.dy) * geo.vh * 0.55
      const o = Math.min(1, (z + 6000) / 2000) * Math.min(1, -z / 300)
      d.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px)`
      d.style.opacity = (o * 0.85).toFixed(3)
    }

    // The floor's cross-rules repeat every RULE px, so moving them by the
    // remainder looks like endless travel — and it is a transform, not a repaint.
    if (els.rules) els.rules.style.transform = `translate3d(0, ${(-(cam % RULE)).toFixed(1)}px, 0)`
    if (barRef.current) barRef.current.style.transform = `scaleX(${p.toFixed(4)})`
    if (chapterRef.current && chapterRef.current.textContent !== chapter) {
      chapterRef.current.textContent = chapter
    }
    if (introRef.current) {
      const io = Math.max(0, 1 - p * 22)
      introRef.current.style.opacity = io.toFixed(3)
      introRef.current.style.transform = `translateY(-60%) scale(${(1 + p * 4).toFixed(3)})`
      introRef.current.style.visibility = io < 0.01 ? 'hidden' : 'visible'
    }
  }

  const tick = (now: number) => {
    const m = motion.current
    const dt = Math.min(64, m.last ? now - m.last : 16)
    m.last = now
    // Frame-rate independent ease: about 90% of the way in a quarter second.
    m.current += (m.target - m.current) * (1 - Math.exp(-dt / (m.geo?.ease ?? 110)))
    if (Math.abs(m.target - m.current) < 0.00002) m.current = m.target
    if (m.geo) render(m.current, m.geo)
    m.raf = m.current !== m.target ? requestAnimationFrame(tick) : 0
    if (!m.raf) m.last = 0
  }

  useScrollFrame(() => {
    const section = sectionRef.current
    if (!section) return
    const m = motion.current
    const geo = geometry()
    m.geo = geo
    const box = section.getBoundingClientRect()
    const p = Math.max(0, Math.min(1, -box.top / Math.max(1, box.height - geo.vh)))
    m.target = p

    // Off screen: snap rather than ease (a nav jump should not replay the whole
    // walk), and make sure no clip keeps playing.
    if (box.bottom < -50 || box.top > geo.vh + 50) {
      if (m.raf) cancelAnimationFrame(m.raf)
      m.raf = 0
      m.last = 0
      m.current = p
      for (const video of ensureCache()?.videos ?? []) if (video && !video.paused) video.pause()
      return
    }
    if (!m.raf) m.raf = requestAnimationFrame(tick)
  })

  useEffect(() => () => cancelAnimationFrame(motion.current.raf), [])

  /** The page scroll position at which stop `i` stands in focus. */
  const scrollYFor = (i: number) => {
    const section = sectionRef.current!
    const top = section.getBoundingClientRect().top + window.scrollY
    // Never earlier than the point where the intro has cleared and stops show.
    const p = Math.max(0.06, Math.min(1, (i * GAP + LEAD + FOCUS_Z) / travel))
    return top + p * (section.offsetHeight - window.innerHeight)
  }

  const focusStop = (i: number) => {
    const index = Math.max(0, Math.min(memoryWalk.length - 1, i))
    window.scrollTo({ top: scrollYFor(index), behavior: 'smooth' })
  }

  /** The stop nearest the focus point right now. */
  const currentStop = () =>
    Math.round((motion.current.current * travel - LEAD - FOCUS_Z) / GAP)

  // Clicking a stop brings it to you. A session card that is already in focus
  // behaves as the link it is; one further down the path focuses first.
  const onStageClick = (event: MouseEvent<HTMLDivElement>) => {
    const stop = (event.target as HTMLElement).closest<HTMLElement>('[data-m]')
    if (!stop) return
    const i = Number(stop.dataset.index)
    const z = -(i * GAP + LEAD) + motion.current.current * travel
    if (Math.abs(z - FOCUS_Z) > 260) {
      event.preventDefault()
      focusStop(i)
    }
  }

  // Looking around: the vanishing point follows the pointer a little.
  const look = (event: MouseEvent<HTMLDivElement>) => {
    const stage = stageRef.current
    if (!stage) return
    const px = event.clientX / window.innerWidth - 0.5
    const py = event.clientY / window.innerHeight - 0.5
    stage.style.perspectiveOrigin = `${(50 + px * 14).toFixed(1)}% ${(46 + py * 10).toFixed(1)}%`
  }

  return (
    <section
      id="memories"
      ref={sectionRef}
      aria-label="Memory walk"
      style={{
        position: 'relative',
        height: `calc(${scrollLength}px + 100vh)`,
        background: c.ink,
      }}
    >
      <div
        onMouseMove={look}
        className="walk-viewport"
        style={{
          position: 'sticky',
          top: 0,
          overflow: 'hidden',
          background: `radial-gradient(80% 70% at 50% 45%, ${c.green900} 0%, ${c.forest} 45%, ${c.inkDeeper} 100%)`,
        }}
      >
        <div
          ref={stageRef}
          onClick={onStageClick}
          style={{ position: 'absolute', inset: 0, perspective: 900, perspectiveOrigin: '50% 46%' }}
        >
          {/* The path: a lit centre line with cross-rules, laid flat. No mask on
              it — a masked plane this size rotated into 3D was most of the
              section's frame cost. The fade into the distance is the flat haze
              painted over it just below. */}
          <div
            aria-hidden
            className="walk-floor"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 2200,
              height: 4200,
              marginLeft: -1100,
              marginTop: 230,
              transformOrigin: '50% 0',
              transform: 'rotateX(90deg)',
              overflow: 'hidden',
              backgroundImage: `linear-gradient(90deg, transparent 0%, ${lime(0.05)} 30%, ${gold(0)} 46%, ${gold(0.55)} 49.85%, ${gold(0.55)} 50.15%, ${gold(0)} 54%, ${lime(0.05)} 70%, transparent 100%)`,
            }}
          >
            {/* The cross-rules move; the centre line on the plane itself does not. */}
            <div
              data-rules
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: `calc(100% + ${RULE}px)`,
                backgroundImage: `repeating-linear-gradient(180deg, ${lime(0.16)} 0 2px, transparent 2px ${RULE}px)`,
                willChange: 'transform',
              }}
            />
          </div>

          {/* Haze at the horizon, where the path recedes. The stage is not a
              preserve-3d context, so this flat layer paints over the floor but
              under the stops that follow it. */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(ellipse 34% 20% at 50% 46%, ${c.green900} 0%, ${c.green900} 45%, rgba(10,61,41,0) 100%)`,
              pointerEvents: 'none',
            }}
          />

          {PARTICLES.map((d, i) => {
            const colour = d.gold ? c.gold : c.lime
            return (
              <span
                key={i}
                data-dust
                className="walk-dust"
                data-dx={d.x.toFixed(3)}
                data-dy={d.y.toFixed(3)}
                data-dz={d.z}
                aria-hidden
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: 14,
                  height: 14,
                  margin: '-7px 0 0 -7px',
                  borderRadius: 999,
                  opacity: 0,
                  background: `radial-gradient(circle, ${colour} 0 22%, ${colour}55 40%, transparent 70%)`,
                }}
              />
            )
          })}

          {memoryWalk.map((item, index) => (
            <WalkStop key={item.id} item={item} index={index} />
          ))}
        </div>

        <div
          ref={introRef}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            transform: 'translateY(-60%)',
            textAlign: 'center',
            padding: '0 28px',
            pointerEvents: 'none',
          }}
        >
          <WalkIntro />
          <div
            aria-hidden
            style={{
              margin: '30px auto 0',
              width: 28,
              height: 44,
              borderRadius: 999,
              border: `2px solid ${t(0.4)}`,
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: '50%',
                top: 8,
                width: 4,
                height: 9,
                marginLeft: -2,
                borderRadius: 4,
                background: c.lime,
              }}
            />
          </div>
        </div>

        {/* Where you are in the day. No backdrop blur: re-blurring 3D content that
            moves every frame is the most expensive thing this section could do. */}
        <div
          className="walk-chapter"
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 30,
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            padding: '12px 20px',
            borderRadius: 999,
            background: 'rgba(4,23,16,0.94)',
            border: `1px solid ${lime(0.28)}`,
            whiteSpace: 'nowrap',
            maxWidth: 'calc(100% - 32px)',
          }}
        >
          <span
            aria-hidden
            style={{
              width: 9,
              height: 9,
              borderRadius: 999,
              background: c.gold,
              boxShadow: `0 0 14px ${c.gold}`,
            }}
          />
          <button
            type="button"
            className="walk-step"
            aria-label="Previous stop"
            onClick={() => focusStop(currentStop() - 1)}
          >
            ‹
          </button>
          <span
            ref={chapterRef}
            aria-live="polite"
            className="walk-chapter-label"
            style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-0.01em' }}
          >
            Start of the day
          </span>
          <button
            type="button"
            className="walk-step"
            aria-label="Next stop"
            onClick={() => focusStop(currentStop() + 1)}
          >
            ›
          </button>
          <span
            aria-hidden
            className="walk-chapter-bar"
            style={{
              width: 200,
              height: 4,
              borderRadius: 999,
              background: t(0.12),
              overflow: 'hidden',
            }}
          >
            <span
              ref={barRef}
              style={{
                display: 'block',
                height: '100%',
                width: '100%',
                transformOrigin: 'left center',
                transform: 'scaleX(0)',
                borderRadius: 999,
                background: `linear-gradient(90deg, ${c.lime}, ${c.gold})`,
                boxShadow: `0 0 12px ${lime(0.6)}`,
              }}
            />
          </span>
          <a href="#appreciation" style={{ fontSize: 13, fontWeight: 700, color: c.lime }}>
            Skip the walk ↓
          </a>
        </div>
      </div>
    </section>
  )
}

/**
 * One stop, absolutely centred; the scroll handler moves it into place.
 *
 * The stage is not a preserve-3d context, so stops paint in stacking order, not by
 * depth — the z-index puts nearer stops over farther ones, which otherwise drew on
 * top of whatever was in front of them.
 */
function WalkStop({ item, index }: { item: MemoryItem; index: number }) {
  const width = item.kind === 'end' ? 640 : item.kind === 'sign' ? 340 : item.kind === 'photo' ? 360 : 380
  const marginTop = item.kind === 'sign' ? -300 : item.kind === 'end' ? -230 : -190
  const side = item.kind === 'sign' || item.kind === 'end' ? 'C' : item.side

  return (
    <div
      data-m
      data-kind={item.kind}
      data-side={side}
      data-title={item.kind === 'sign' ? `${item.label} · ${item.title}` : undefined}
      data-w={width}
      data-index={index}
      className="walk-stop"
      style={{
        zIndex: memoryWalk.length - index,
        position: 'absolute',
        left: '50%',
        top: '50%',
        width,
        marginLeft: -width / 2,
        marginTop,
        display: 'none',
        textAlign: item.kind === 'sign' ? 'center' : undefined,
      }}
    >
      <StopContent item={item} deferVideo />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                         flat fallback (phone / reduced)                    */
/* -------------------------------------------------------------------------- */

function WalkList() {
  const listRef = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()

  // Clips play while on screen, unless the visitor asked for less motion — then
  // they keep their controls and wait to be started.
  useEffect(() => {
    const list = listRef.current
    if (!list || reduced) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement
          if (entry.intersectionRatio > 0.5) {
            if (!video.getAttribute('src') && video.dataset.src) video.src = video.dataset.src
            video.play().catch(() => {})
          } else if (!video.paused) {
            video.pause()
          }
        }
      },
      { threshold: [0, 0.5] },
    )
    list.querySelectorAll('video').forEach((v) => observer.observe(v))
    return () => observer.disconnect()
  }, [reduced])

  return (
    <section
      id="memories"
      aria-label="Memory walk"
      style={{
        position: 'relative',
        padding: '80px 20px 90px',
        background: `radial-gradient(90% 60% at 50% 0%, ${c.green900} 0%, ${c.forest} 45%, ${c.ink} 100%)`,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <WalkIntro />
      </div>

      <ol
        ref={listRef}
        style={{
          listStyle: 'none',
          margin: '48px auto 0',
          padding: '0 0 0 28px',
          maxWidth: 440,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
        }}
      >
        {/* The path, run down the left as a single lit line. */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            left: 8,
            top: 0,
            bottom: 0,
            width: 2,
            background: `linear-gradient(180deg, ${c.lime}, ${c.gold} 70%, ${gold(0)})`,
            boxShadow: `0 0 16px ${lime(0.35)}`,
          }}
        />
        {memoryWalk.map((item) => (
          <li key={item.id} style={{ position: 'relative' }}>
            <span
              aria-hidden
              style={{
                position: 'absolute',
                left: -26,
                top: item.kind === 'sign' ? 18 : 24,
                width: item.kind === 'sign' ? 14 : 10,
                height: item.kind === 'sign' ? 14 : 10,
                marginLeft: item.kind === 'sign' ? -1 : 1,
                borderRadius: 999,
                background: item.kind === 'sign' ? c.gold : c.forest,
                border: `2px solid ${item.kind === 'sign' ? c.gold : lime(0.6)}`,
                boxShadow: item.kind === 'sign' ? `0 0 16px ${gold(0.6)}` : undefined,
              }}
            />
            <StopContent item={item} deferVideo={!reduced} controls={reduced} flat />
          </li>
        ))}
      </ol>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*                                shared pieces                               */
/* -------------------------------------------------------------------------- */

function WalkIntro() {
  return (
    <>
      <div style={{ fontSize: 11, letterSpacing: '0.2em', color: c.lime, fontWeight: 700 }}>
        MEMORY WALK · {site.edition}
      </div>
      <h2
        style={{
          margin: '20px 0 0',
          fontSize: 'clamp(44px, 6.4vw, 100px)',
          lineHeight: 0.92,
          fontWeight: 800,
          letterSpacing: '-0.04em',
          textShadow: '0 20px 60px rgba(0,0,0,0.6)',
        }}
      >
        Walk back through
        <br />3 October
      </h2>
      <p
        style={{
          margin: '22px auto 0',
          maxWidth: '46ch',
          fontSize: 18,
          lineHeight: 1.6,
          color: t(0.78),
        }}
      >
        Photos, short clips and full sessions, laid out along the day in the order it
        ran. Scroll to walk.
      </p>
    </>
  )
}

function StopContent({
  item,
  deferVideo,
  controls = false,
  flat = false,
}: {
  item: MemoryItem
  /** Leave `src` empty until the clip is near; the scroll handler fills it in. */
  deferVideo: boolean
  controls?: boolean
  /** The phone timeline: no rotation on the polaroids, full width. */
  flat?: boolean
}) {
  switch (item.kind) {
    case 'sign':
      return <Sign label={item.label} title={item.title} flat={flat} />
    case 'photo':
      return (
        <Polaroid caption={item.caption} meta={item.meta} tilt={flat ? 0 : item.tilt} taped>
          <img
            src={item.src}
            alt={item.caption}
            loading={flat ? 'lazy' : 'eager'}
            decoding="async"
            style={{
              width: '100%',
              height: flat ? 'auto' : 250,
              aspectRatio: flat ? '36 / 25' : undefined,
              objectFit: 'cover',
              objectPosition: item.objectPosition ?? 'center 30%',
              borderRadius: 10,
              display: 'block',
            }}
          />
        </Polaroid>
      )
    case 'clip':
      return (
        <Polaroid caption={item.caption} meta={item.meta} tilt={flat ? 0 : item.tilt}>
          <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', background: c.green900 }}>
            <video
              data-src={deferVideo ? item.src : undefined}
              src={deferVideo ? undefined : item.src}
              poster={item.poster}
              muted
              loop
              playsInline
              controls={controls}
              preload="none"
              aria-label={item.caption}
              style={{
                width: '100%',
                height: flat ? 'auto' : 250,
                aspectRatio: flat ? '36 / 25' : undefined,
                objectFit: 'cover',
                objectPosition: 'center 35%',
                display: 'block',
              }}
            />
            <div
              aria-hidden
              style={{
                position: 'absolute',
                left: 10,
                top: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '6px 11px',
                borderRadius: 999,
                background: 'rgba(4,22,15,0.78)',
                fontSize: 10.5,
                letterSpacing: '0.14em',
                fontWeight: 800,
                color: '#F6F1E4',
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: 999, background: c.coral }} />
              CLIP
            </div>
          </div>
        </Polaroid>
      )
    case 'session':
      return <SessionStop id={item.session} />
    case 'end':
      return <EndCard flat={flat} />
  }
}

function Sign({ label, title, flat }: { label: string; title: string; flat: boolean }) {
  return (
    <div style={{ textAlign: flat ? 'left' : 'center' }}>
      <div
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          gap: 6,
          padding: '16px 28px',
          borderRadius: 20,
          background: 'rgba(4,23,16,0.88)',
          border: `1px solid ${lime(0.55)}`,
          boxShadow: `0 0 44px ${lime(0.28)}`,
        }}
      >
        <span style={{ fontFamily: font.mono, fontSize: 13, fontWeight: 700, color: c.gold, letterSpacing: '0.12em' }}>
          {label}
        </span>
        <h3 style={{ margin: 0, fontSize: 24, fontWeight: 800, letterSpacing: '-0.025em', color: '#fff' }}>
          {title}
        </h3>
      </div>
      {!flat && (
        <div
          aria-hidden
          style={{
            width: 3,
            height: 240,
            margin: '0 auto',
            borderRadius: 3,
            background: `linear-gradient(180deg, ${c.lime}, ${lime(0)})`,
          }}
        />
      )}
    </div>
  )
}

/** Cream print with a caption strip — the walk's photo and clip frame. */
function Polaroid({
  children,
  caption,
  meta,
  tilt,
  taped = false,
}: {
  children: React.ReactNode
  caption: string
  meta: string
  tilt: number
  taped?: boolean
}) {
  return (
    <figure
      style={{
        position: 'relative',
        margin: 0,
        background: '#F6F1E4',
        padding: '14px 14px 20px',
        borderRadius: 16,
        boxShadow: `0 22px 44px rgba(0,0,0,0.5), 0 0 0 1px ${gold(0.25)}`,
        transform: tilt ? `rotate(${tilt}deg)` : undefined,
      }}
    >
      {taped && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: -12,
            left: '50%',
            width: 92,
            height: 24,
            marginLeft: -46,
            background: gold(0.78),
            borderRadius: 3,
            transform: 'rotate(-3deg)',
          }}
        />
      )}
      {children}
      <figcaption>
        <div style={{ marginTop: 14, fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', color: c.green900 }}>
          {caption}
        </div>
        <div style={{ marginTop: 6, fontFamily: font.mono, fontSize: 12, color: '#5B6B64' }}>{meta}</div>
      </figcaption>
    </figure>
  )
}

/** A full session, linking into the livestream where it starts. */
function SessionStop({ id }: { id: string }) {
  const session = sessionById[id]
  if (!session) return null

  return (
    <a
      href={watchUrl(session.stream, session.start)}
      target="_blank"
      rel="noopener noreferrer"
      className="walk-session"
      style={{
        display: 'block',
        borderRadius: 22,
        overflow: 'hidden',
        background: c.green900,
        border: `1px solid ${gold(0.45)}`,
        boxShadow: `0 22px 44px rgba(0,0,0,0.55)`,
        color: c.text,
      }}
    >
      <div style={{ position: 'relative' }}>
        <img
          src={session.thumb}
          alt=""
          loading="eager"
          decoding="async"
          style={{
            width: '100%',
            height: 214,
            objectFit: 'cover',
            objectPosition: session.objectPosition ?? 'center 20%',
            display: 'block',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(4,22,15,0.1), rgba(4,22,15,0.6))',
          }}
        />
        <PlayDisc size={72} />
        <div
          style={{
            position: 'absolute',
            left: 12,
            top: 12,
            padding: '6px 11px',
            borderRadius: 999,
            background: 'rgba(4,22,15,0.8)',
            fontSize: 10.5,
            letterSpacing: '0.14em',
            fontWeight: 800,
            color: c.gold,
          }}
        >
          FULL SESSION · YOUTUBE
        </div>
      </div>
      <div style={{ padding: '18px 20px 20px' }}>
        <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
          {session.title}
        </div>
        <div style={{ marginTop: 7, fontSize: 14, color: t(0.7) }}>{session.who}</div>
        <div style={{ marginTop: 14, fontSize: 14, fontWeight: 800, color: c.lime }}>
          Watch on YouTube ↗
        </div>
      </div>
    </a>
  )
}

function EndCard({ flat }: { flat: boolean }) {
  const button: CSSProperties = {
    padding: '15px 26px',
    borderRadius: 999,
    fontWeight: 800,
    fontSize: 15,
  }
  return (
    <div
      style={{
        padding: flat ? '40px 24px' : '52px 48px',
        borderRadius: 32,
        textAlign: 'center',
        background: 'linear-gradient(150deg, rgba(21,155,98,0.4), rgba(4,23,16,0.95))',
        border: `1px solid ${gold(0.45)}`,
        boxShadow: `0 60px 120px rgba(0,0,0,0.6), 0 0 80px ${lime(0.18)}`,
      }}
    >
      <div style={{ fontSize: 11, letterSpacing: '0.2em', color: c.gold, fontWeight: 700 }}>
        END OF THE WALK
      </div>
      <h3
        style={{
          margin: '18px 0 0',
          fontSize: flat ? 40 : 54,
          lineHeight: 0.95,
          fontWeight: 800,
          letterSpacing: '-0.04em',
          color: '#fff',
        }}
      >
        Thank you, {site.venue.city}.
      </h3>
      <p style={{ margin: '18px auto 0', maxWidth: '40ch', fontSize: 17, lineHeight: 1.6, color: t(0.78) }}>
        Every session is on YouTube. TADIS 2027 is already being planned.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 28 }}>
        <a href="#sessions" className="cta-lime" style={button}>
          Watch the sessions
        </a>
        <a href="#memories" className="cta-ghost" style={{ ...button, fontWeight: 700 }}>
          Walk it again
        </a>
      </div>
    </div>
  )
}
