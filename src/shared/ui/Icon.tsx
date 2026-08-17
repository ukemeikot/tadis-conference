import type { CSSProperties } from 'react'

/**
 * Lucide glyph rendered through a CSS mask, so it inherits any colour token.
 *
 * The design system loads every glyph from unpkg at runtime. The three icons
 * this site actually uses are inlined below as data URIs instead — it removes a
 * third-party request from the critical path and means the form controls still
 * render correctly offline. Any other name falls back to the CDN.
 *
 * Icons are Lucide (https://lucide.dev), ISC licensed.
 */
const LUCIDE_CDN = 'https://unpkg.com/lucide-static@0.484.0/icons/'

const svg = (paths: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ` +
      `fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" ` +
      `stroke-linejoin="round">${paths}</svg>`,
  )}`

const INLINE: Record<string, string> = {
  check: svg('<path d="M20 6 9 17l-5-5"/>'),
  'chevron-down': svg('<path d="m6 9 6 6 6-6"/>'),
  'loader-circle': svg('<path d="M21 12a9 9 0 1 1-6.219-8.56"/>'),
}

export type IconProps = {
  name: string
  size?: number
  color?: string
  /** Supply when the icon carries meaning on its own; omit to hide it from AT. */
  label?: string
  style?: CSSProperties
}

export function Icon({
  name,
  size = 20,
  color = 'currentColor',
  label,
  style,
}: IconProps) {
  const url = INLINE[name] ?? `${LUCIDE_CDN}${name}.svg`

  return (
    <span
      role="img"
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        flex: '0 0 auto',
        backgroundColor: color,
        WebkitMaskImage: `url("${url}")`,
        maskImage: `url("${url}")`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        ...style,
      }}
    />
  )
}
