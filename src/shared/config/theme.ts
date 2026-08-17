/**
 * TADIS 2026 event palette.
 *
 * The summit sits on top of the ProHealth Pathway design system, but it runs
 * a darker, hotter palette of its own: near-black forest green ground, lime
 * for action, gold for achievement, rust and coral for energy.
 *
 * These are the literal values used throughout the original design file.
 */
export const c = {
  /** page ground — near-black forest green */
  ink: '#041710',
  /** footer ground, one step darker still */
  inkDeeper: '#030F0A',
  /** the darkest usable text-on-lime */
  inkText: '#04160F',
  /** mid-tone band background (about gradient, programme, FAQ) */
  forest: '#06281A',
  /** deep brand anchor, shared with the DS (--green-900) */
  green900: '#0A3D29',
  /** DS primary green (--green-500) */
  green500: '#159B62',
  /** primary action colour */
  lime: '#A3D93C',
  /** achievement / confirmed / data colour */
  gold: '#E9C935',
  /** DS gold (--gold-500), the darker end of gold gradients */
  gold500: '#B8963A',
  /** deep rust — the "heat" accent behind mission + CTA gradients */
  rust: '#7B1E12',
  /** DS coral accent (--coral-500) */
  coral: '#E1512A',
  /** fireside amber */
  amber: '#F0A02B',
  /** DS teal (--teal-500) */
  teal: '#0E9597',
  /** body text on dark */
  text: '#E8F1EA',
} as const

/** Body text on the dark ground at a given opacity. */
export const t = (alpha: number) => `rgba(232, 241, 234, ${alpha})`

/** Lime at a given opacity — borders, soft fills, glows. */
export const lime = (alpha: number) => `rgba(163, 217, 60, ${alpha})`

/** Gold at a given opacity. */
export const gold = (alpha: number) => `rgba(233, 201, 53, ${alpha})`

/** White at a given opacity — the neutral card fills. */
export const w = (alpha: number) => `rgba(255, 255, 255, ${alpha})`

export const font = {
  sans: "'Hanken Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
} as const

/** Shared eyebrow label style — 11px, wide tracking, extrabold. */
export const eyebrow = {
  fontSize: 11,
  letterSpacing: '0.2em',
  fontWeight: 700,
} as const
