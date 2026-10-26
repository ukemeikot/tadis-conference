import { useEffect, useRef } from 'react'
import { dayInNumbers } from '../../content'
import { site } from '../../shared/config/site'
import { c, font, gold, lime, t, w } from '../../shared/config/theme'
import { useRichMotion } from '../../shared/hooks/useMotion'
import { requestScrollFrame, useScrollFrame } from '../../shared/hooks/useScrollFrame'
import { useTilt } from '../../shared/hooks/useTilt'
import { Eyebrow, Heading, Wrap } from '../../shared/ui'

/**
 * The day in numbers — the post-summit replacement for the venue floor plan.
 * The figures are counted from the site's own data (see `dayInNumbers`).
 *
 * The cards rise into place in a stagger as the grid reaches the middle of the
 * screen, the same scroll-driven lift the rest of the page uses.
 */
export function DayInNumbers() {
  const gridRef = useRef<HTMLDivElement>(null)
  const richMotion = useRichMotion()
  const tilt = useTilt(richMotion)

  // Idle unless the grid is near the screen, so its measuring never lands on
  // frames where other sections are animating.
  const near = useRef(false)
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        near.current = entry.isIntersecting
        if (entry.isIntersecting) requestScrollFrame()
      },
      { rootMargin: '30% 0px' },
    )
    observer.observe(grid)
    return () => observer.disconnect()
  }, [])

  useScrollFrame(() => {
    const grid = gridRef.current
    if (!grid || !near.current) return
    const cards = Array.from(grid.children) as HTMLElement[]
    if (!richMotion) {
      for (const card of cards) card.style.translate = ''
      return
    }
    const box = grid.getBoundingClientRect()
    // 0 when the grid's top is at the bottom of the screen, 1 once it is two-thirds up.
    const p = Math.max(0, Math.min(1, (window.innerHeight - box.top) / (window.innerHeight * 0.66)))
    cards.forEach((card, i) => {
      const local = Math.max(0, Math.min(1, p * 1.6 - i * 0.12))
      card.style.translate = `0 ${((1 - local) * 60).toFixed(1)}px`
      card.style.opacity = (0.25 + local * 0.75).toFixed(3)
    })
  })

  return (
    <section
      id="numbers"
      style={{
        position: 'relative',
        padding: '100px 28px 110px',
        background: `linear-gradient(180deg, ${c.forest}, ${c.ink})`,
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 'auto -10% -40% auto',
          width: '55%',
          height: '120%',
          background: `radial-gradient(circle at 60% 50%, ${gold(0.12)}, transparent 62%)`,
        }}
      />
      <Wrap style={{ position: 'relative', padding: 0 }}>
        <Eyebrow>BY THE NUMBERS · {site.edition}</Eyebrow>
        <Heading size="md" style={{ margin: '16px 0 0', letterSpacing: '-0.03em' }}>
          The day in numbers
        </Heading>

        <div
          ref={gridRef}
          className="numbers-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 20,
            marginTop: 48,
            perspective: 1300,
          }}
        >
          {dayInNumbers.map((stat, i) => (
            <div
              key={stat.label}
              className="tilt"
              {...tilt}
              style={{
                padding: '30px 28px 28px',
                borderRadius: 24,
                background:
                  i === 0
                    ? 'linear-gradient(150deg, rgba(233,201,53,0.16), rgba(255,255,255,0.04))'
                    : w(0.045),
                border: `1px solid ${i === 0 ? gold(0.4) : lime(0.22)}`,
                boxShadow: '0 30px 70px rgba(0,0,0,0.35)',
              }}
            >
              <div
                style={{
                  fontFamily: font.mono,
                  fontSize: 'clamp(40px, 4.6vw, 64px)',
                  lineHeight: 1,
                  fontWeight: 600,
                  letterSpacing: '-0.04em',
                  color: i === 0 ? c.gold : c.lime,
                  textShadow: `0 0 34px ${i === 0 ? gold(0.35) : lime(0.3)}`,
                }}
              >
                {stat.value}
              </div>
              <div style={{ marginTop: 16, fontSize: 19, fontWeight: 800, letterSpacing: '-0.02em' }}>
                {stat.label}
              </div>
              <div style={{ marginTop: 6, fontSize: 14.5, lineHeight: 1.5, color: t(0.62) }}>
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  )
}
