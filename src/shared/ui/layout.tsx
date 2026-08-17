import type { CSSProperties, ReactNode } from 'react'
import { c, t } from '../config/theme'

/** Centred content column. `.wrap` supplies the max-width and gutters. */
export function Wrap({
  children,
  size = 'lg',
  style,
}: {
  children: ReactNode
  size?: 'lg' | 'md' | 'sm'
  style?: CSSProperties
}) {
  const className = size === 'lg' ? 'wrap' : `wrap wrap-${size}`
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

/**
 * The small all-caps label above almost every heading on the page — 11px with
 * wide tracking, tinted per section.
 */
export function Eyebrow({
  children,
  color = c.lime,
  style,
}: {
  children: ReactNode
  color?: string
  style?: CSSProperties
}) {
  return (
    <div
      style={{
        fontSize: 11,
        letterSpacing: '0.2em',
        fontWeight: 700,
        color,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/** Display heading. `size` maps to the design's three clamp() ramps. */
export function Heading({
  children,
  level = 2,
  size = 'lg',
  style,
}: {
  children: ReactNode
  level?: 1 | 2 | 3
  size?: 'xl' | 'lg' | 'md' | 'sm'
  style?: CSSProperties
}) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3'
  const fontSize = {
    xl: 'clamp(40px, 5.6vw, 84px)',
    lg: 'clamp(38px, 5vw, 74px)',
    md: 'clamp(30px, 3.6vw, 50px)',
    sm: 'clamp(30px, 3.4vw, 46px)',
  }[size]

  return (
    <Tag
      style={{
        margin: 0,
        fontSize,
        lineHeight: size === 'xl' ? 0.94 : size === 'lg' ? 0.96 : 1.04,
        fontWeight: 800,
        letterSpacing: '-0.035em',
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}

/** Standard lead paragraph under a heading. */
export function Lead({
  children,
  style,
}: {
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    <p
      style={{
        margin: 0,
        maxWidth: '56ch',
        fontSize: 18,
        lineHeight: 1.6,
        color: t(0.76),
        ...style,
      }}
    >
      {children}
    </p>
  )
}

/**
 * A dashed callout marking content that is still provisional — draft running
 * order, placeholder video, indicative floor plan. Used verbatim from the design,
 * where being honest about what is not settled is part of the tone.
 */
export function DraftNote({
  flag,
  children,
  color = c.gold,
  style,
}: {
  flag: string
  children: ReactNode
  color?: string
  style?: CSSProperties
}) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        padding: '14px 20px',
        borderRadius: 14,
        background: 'rgba(233,201,53,0.09)',
        border: `1px dashed ${color}66`,
        fontSize: 15,
        color: t(0.82),
        width: 'fit-content',
        ...style,
      }}
    >
      <span style={{ fontSize: 11, letterSpacing: '0.16em', fontWeight: 800, color }}>
        {flag}
      </span>
      {children}
    </div>
  )
}

/** Pill link/label — the CTA and filter-chip shape used throughout. */
export function Pill({
  children,
  href,
  variant = 'lime',
  style,
}: {
  children: ReactNode
  href?: string
  variant?: 'lime' | 'ghost'
  style?: CSSProperties
}) {
  const className = variant === 'lime' ? 'cta-lime' : 'cta-ghost'
  const base: CSSProperties = {
    display: 'inline-block',
    padding: '16px 30px',
    borderRadius: 999,
    fontWeight: variant === 'lime' ? 800 : 700,
    fontSize: 16,
    boxShadow: variant === 'lime' ? '0 14px 40px rgba(163,217,60,0.3)' : undefined,
    ...style,
  }

  return (
    <a href={href} className={className} style={base}>
      {children}
    </a>
  )
}
