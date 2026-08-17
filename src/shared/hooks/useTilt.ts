import { useCallback } from 'react'
import type { MouseEvent } from 'react'

/**
 * Pointer-following card tilt, ported from the design's `tilt` / `untilt`.
 *
 * Writes the transform directly on the element rather than through state — the
 * handler fires on every mousemove and a re-render per frame would be wasteful.
 * The easing lives on the `.tilt` class in global.css.
 */
export function useTilt(enabled = true) {
  const onMouseMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (!enabled) return
      const el = event.currentTarget
      const rect = el.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width - 0.5
      const py = (event.clientY - rect.top) / rect.height - 0.5
      el.style.transform =
        `perspective(900px) rotateY(${(px * 8).toFixed(2)}deg) ` +
        `rotateX(${(-py * 8).toFixed(2)}deg) translateY(-4px)`
    },
    [enabled],
  )

  const onMouseLeave = useCallback((event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.transform = ''
  }, [])

  return enabled ? { onMouseMove, onMouseLeave } : {}
}
