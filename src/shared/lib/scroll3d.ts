/**
 * The page's shared scroll-driven 3D card motion.
 *
 * Cards rotate and recede as they travel away from the middle of the viewport, so
 * the one you are looking at is square-on and the others are turned away. Kept in
 * one place so the speaker stage and the registration card move identically —
 * matching motion is what makes the sections read as one design rather than
 * several.
 */

/** How far past the viewport centre an element is, as roughly -1 → 1. */
export function distanceFromCentre(element: Element): number {
  const box = element.getBoundingClientRect()
  const mid = window.innerHeight / 2
  return clamp((box.top + box.height / 2 - mid) / (window.innerHeight * 0.8), -1.3, 1.3)
}

/**
 * The card transform for a given distance.
 *
 * `side` mirrors the yaw so cards on either half of the page both turn *into* the
 * page rather than both leaning the same way: 1 for a card sitting on the left,
 * -1 for one on the right.
 */
export function card3dTransform(distance: number, side: 1 | -1 = 1): string {
  return (
    `rotateY(${(distance * 16 * side).toFixed(2)}deg) ` +
    `rotateX(${(-distance * 7).toFixed(2)}deg) ` +
    `translateZ(${(-Math.abs(distance) * 180).toFixed(0)}px) ` +
    `translateY(${(distance * 34).toFixed(0)}px)`
  )
}

/** Cards dim as they turn away, but never all the way to invisible. */
export function card3dOpacity(distance: number, floor = 0.15): number {
  return Math.max(floor, 1 - Math.abs(distance) * 1.05)
}

/** Copy blocks get a gentler treatment — a lift and a fade, no rotation. */
export function copyTransform(distance: number): string {
  return `translateY(${(distance * 52).toFixed(0)}px)`
}

export function copyOpacity(distance: number, floor = 0.1): number {
  return Math.max(floor, 1 - Math.abs(distance) * 1.25)
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}
