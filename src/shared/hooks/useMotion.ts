import { useEffect, useState } from 'react'

function subscribe(query: string, onChange: () => void) {
  const mql = window.matchMedia(query)
  mql.addEventListener('change', onChange)
  return () => mql.removeEventListener('change', onChange)
}

/** Live `matchMedia` result for `query`. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const read = () => setMatches(window.matchMedia(query).matches)
    read()
    return subscribe(query, read)
  }, [query])

  return matches
}

/**
 * Whether to run the scroll-driven 3D work.
 *
 * Two reasons to skip it: the visitor asked for reduced motion, or the viewport
 * is narrow — the design's rotate/translateZ choreography assumes a two-column
 * desktop stage, and on a phone it costs battery to animate something the CSS
 * has already collapsed into a single column.
 */
export function useRichMotion(): boolean {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const wide = useMediaQuery('(min-width: 900px)')
  return wide && !reduced
}

/** Whether the visitor has asked for reduced motion. */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
