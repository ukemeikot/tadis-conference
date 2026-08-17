import { useEffect, useRef } from 'react'

/**
 * A single shared, rAF-throttled scroll/resize driver.
 *
 * The original design ran one `scroll` handler that coalesced into one
 * requestAnimationFrame and then updated every scroll-driven element in
 * sequence. That is the right shape — many independent listeners each doing
 * their own layout reads would thrash. So subscribers here share one listener
 * and one frame.
 *
 * Callbacks write directly to the DOM via refs. They deliberately do NOT set
 * React state: this runs on every frame while scrolling, and re-rendering the
 * tree at 60fps would be far too expensive.
 */
type Frame = () => void

const subscribers = new Set<Frame>()
let rafId = 0
let listening = false

function flush() {
  rafId = 0
  for (const fn of subscribers) {
    try {
      fn()
    } catch {
      /* one bad subscriber must not stop the rest of the frame */
    }
  }
}

function schedule() {
  if (rafId) return
  rafId = requestAnimationFrame(flush)
}

function startListening() {
  if (listening) return
  listening = true
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
}

function stopListening() {
  if (!listening || subscribers.size > 0) return
  listening = false
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = 0
  }
}

/**
 * Run `callback` once on mount and then on every animation frame in which the
 * page has scrolled or resized. The callback may change identity freely — the
 * subscription is stable.
 */
export function useScrollFrame(callback: Frame) {
  const latest = useRef(callback)
  latest.current = callback

  useEffect(() => {
    const run = () => latest.current()
    startListening()
    subscribers.add(run)
    // Paint the correct initial state without waiting for a scroll.
    run()
    return () => {
      subscribers.delete(run)
      stopListening()
    }
  }, [])
}

/** Force a frame — useful right after layout-affecting state changes. */
export function requestScrollFrame() {
  schedule()
}
