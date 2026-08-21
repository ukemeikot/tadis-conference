import { useRef } from 'react'
import { aboutPanels } from '../../content'
import type { AboutPanel } from '../../content/types'
import { c, font, gold, lime, t } from '../../shared/config/theme'
import { useScrollFrame } from '../../shared/hooks/useScrollFrame'

/**
 * Panel surfaces — fully opaque.
 *
 * These were translucent gradients (the lightest started at 30% alpha), which is
 * what let one panel's text read through the next. The values below are those same
 * tints composited over the page ground, so the look is unchanged but nothing
 * shows through.
 */
const TINTS: Record<AboutPanel['tint'], { background: string; border: string }> = {
  green: {
    background: 'linear-gradient(150deg, #093F29, #041710)',
    border: `1px solid ${lime(0.3)}`,
  },
  teal: {
    background: 'linear-gradient(150deg, #073A36, #041710)',
    border: `1px solid ${lime(0.3)}`,
  },
  rust: {
    background: 'linear-gradient(150deg, #401A11, #041710)',
    border: `1px solid ${gold(0.32)}`,
  },
  deep: {
    background: 'linear-gradient(150deg, #0A3B28, #041710)',
    border: `1px solid ${lime(0.3)}`,
  },
}

/**
 * The About section: four solid cards that scroll past one after another, each
 * rising into place as it enters.
 *
 * This replaces a sticky stack in which all four panels pinned to the top of the
 * viewport at once and relied on opacity to hide the ones underneath. That was the
 * source of the overlapping-text bug — the panels were semi-transparent, so any
 * imprecision in the fade showed two sets of copy at once. Cards that never occupy
 * the same space cannot overlap at all.
 *
 * Motion follows the reference recording: plain scroll, no pinning, each card
 * fading and lifting in once.
 */
export function AboutStack() {
  const stackRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<HTMLElement[] | null>(null)

  useScrollFrame(() => {
    const wrap = stackRef.current
    if (!wrap) return

    if (!panelsRef.current) {
      panelsRef.current = Array.from(wrap.querySelectorAll<HTMLElement>('[data-panel]'))
    }
    const panels = panelsRef.current
    if (panels.length === 0) return

    const viewportHeight = window.innerHeight
    const mid = viewportHeight / 2
    let active = 0
    let nearest = Infinity

    panels.forEach((panel, index) => {
      const box = panel.getBoundingClientRect()

      // Reveal once the card is meaningfully on screen, and leave it revealed —
      // re-hiding it on the way back up reads as a glitch, not an effect.
      if (panel.dataset.revealed !== 'true' && box.top < viewportHeight * 0.85) {
        panel.dataset.revealed = 'true'
      }

      // Whichever card sits closest to the middle of the screen owns the counter.
      const distance = Math.abs(box.top + box.height / 2 - mid)
      if (distance < nearest) {
        nearest = distance
        active = index
      }
    })

    if (counterRef.current) {
      const label = `0${active + 1}/0${panels.length}`
      if (counterRef.current.textContent !== label) {
        counterRef.current.textContent = label
      }
    }

    if (barRef.current) {
      const box = wrap.getBoundingClientRect()
      // 0 when the section's top reaches the viewport centre, 1 when its bottom does.
      const progress = Math.max(0, Math.min(1, (mid - box.top) / Math.max(1, box.height)))
      barRef.current.style.width = `${(progress * 100).toFixed(1)}%`
    }
  })

  return (
    <section
      id="about"
      style={{
        position: 'relative',
        background: `linear-gradient(180deg, ${c.ink} 0%, ${c.forest} 50%, ${c.ink} 100%)`,
        paddingBottom: 40,
      }}
    >
      {/* Sticky progress strip that tracks position through the section. */}
      <div
        className="about-progress"
        style={{
          position: 'sticky',
          top: 76,
          zIndex: 20,
          padding: '26px 28px 0',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: 18,
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.2em',
              color: c.lime,
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            ABOUT THE SUMMIT
          </div>
          <div
            style={{
              flex: 1,
              height: 3,
              borderRadius: 999,
              background: t(0.1),
              overflow: 'hidden',
            }}
          >
            <div
              ref={barRef}
              style={{
                height: '100%',
                width: 0,
                borderRadius: 999,
                background: `linear-gradient(90deg, ${c.lime}, ${c.gold})`,
                boxShadow: `0 0 16px ${lime(0.6)}`,
              }}
            />
          </div>
          <div
            ref={counterRef}
            style={{
              fontFamily: font.mono,
              fontSize: 13,
              color: c.gold,
              minWidth: 52,
              textAlign: 'right',
            }}
          >
            01/0{aboutPanels.length}
          </div>
        </div>
      </div>

      <div ref={stackRef} className="about-stack">
        {aboutPanels.map((panel) => (
          <article
            key={panel.id}
            data-panel
            className="about-panel"
            style={{
              ...TINTS[panel.tint],
              textAlign: panel.centred ? 'center' : undefined,
            }}
          >
            <div
              style={{
                fontFamily: font.mono,
                fontSize: 13,
                letterSpacing: '0.12em',
                color: panel.tint === 'rust' ? c.gold : c.lime,
              }}
            >
              {panel.index}
            </div>

            {panel.heading && (
              <h2
                style={{
                  margin: '26px 0 0',
                  fontSize: 'clamp(40px, 6vw, 92px)',
                  lineHeight: 0.92,
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  whiteSpace: 'pre-line',
                }}
              >
                {panel.heading}
              </h2>
            )}

            {panel.quote && (
              <p
                style={{
                  margin: '30px 0 0',
                  fontSize: 'clamp(28px, 3.6vw, 52px)',
                  lineHeight: 1.16,
                  fontWeight: 800,
                  letterSpacing: '-0.035em',
                  maxWidth: '27ch',
                  textWrap: 'pretty',
                }}
              >
                {panel.quote}
              </p>
            )}

            {panel.body && (
              <p
                style={{
                  margin: panel.centred ? '28px auto 0' : '26px 0 0',
                  maxWidth: panel.heading ? '56ch' : '52ch',
                  fontSize: panel.heading ? 19 : 17.5,
                  lineHeight: 1.6,
                  color: panel.heading ? t(0.78) : t(0.7),
                }}
              >
                {panel.body}
              </p>
            )}

            {panel.reasons && (
              <div
                className="grid-4"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 20,
                  marginTop: 32,
                }}
              >
                {panel.reasons.map((reason) => (
                  <div key={reason.number}>
                    <div style={{ fontFamily: font.mono, fontSize: 13, color: c.gold }}>
                      {reason.number}
                    </div>
                    <h3
                      style={{
                        margin: '14px 0 0',
                        fontSize: 20,
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {reason.title}
                    </h3>
                    <p
                      style={{
                        margin: '10px 0 0',
                        fontSize: 15,
                        lineHeight: 1.55,
                        color: t(0.7),
                      }}
                    >
                      {reason.body}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {panel.cta && (
              <a
                href={panel.cta.href}
                className="cta-lime"
                style={{
                  display: 'inline-block',
                  marginTop: 38,
                  padding: '15px 28px',
                  borderRadius: 999,
                  fontWeight: 800,
                  fontSize: 16,
                }}
              >
                {panel.cta.label}
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
