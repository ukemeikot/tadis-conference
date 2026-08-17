import { useRef, useState } from 'react'
import { useScrollFrame } from './useScrollFrame'

/**
 * Which section the reader is currently in.
 *
 * Matches the design's rule exactly: walk the sections in document order and
 * take the last one whose top has passed 140px from the viewport top. That
 * threshold sits just below the sticky header, so a section counts as "current"
 * once its heading is properly on screen rather than the instant it appears.
 *
 * This one does hold React state — it changes a handful of times per page, not
 * per frame, and the nav needs to re-render to move the underline.
 */
export function useScrollSpy(ids: ReadonlyArray<string>, offset = 140): string | null {
  const [active, setActive] = useState<string | null>(null)
  const activeRef = useRef<string | null>(null)

  useScrollFrame(() => {
    let current: string | null = null

    for (const id of ids) {
      const element = document.getElementById(id)
      if (!element) continue
      if (element.getBoundingClientRect().top <= offset) current = id
    }

    if (current !== activeRef.current) {
      activeRef.current = current
      setActive(current)
    }
  })

  return active
}
