import { useRef } from 'react'
import { aboutPanels } from '../../content'
import type { AboutPanel } from '../../content/types'
import { c, font, gold, lime, t } from '../../shared/config/theme'
import { useRichMotion } from '../../shared/hooks/useMotion'
import { useScrollFrame } from '../../shared/hooks/useScrollFrame'

const TINTS: Record<AboutPanel['tint'], { background: string; border: string }> = {
  green: {
    background: 'linear-gradient(150deg, rgba(21,155,98,0.3), rgba(4,23,16,0.94))',
    border: `1px solid ${lime(0.3)}`,
  },
  teal: {
    background: 'linear-gradient(150deg, rgba(14,149,151,0.28), rgba(4,23,16,0.96))',
    border: `1px solid ${lime(0.3)}`,
  },
  rust: {
    background: 'linear-gradient(150deg, rgba(123,30,18,0.5), rgba(4,23,16,0.96))',
    border: `1px solid ${gold(0.32)}`,
  },
  deep: {
    background: 'linear-gradient(150deg, rgba(10,61,41,0.96), rgba(4,23,16,0.98))',
    border: `1px solid ${lime(0.3)}`,
  },
}

/**
 * When an outgoing panel starts and finishes dissolving, as a fraction of its own
 * scroll length (0 = the moment it pins, 1 = the moment the next one pins).
 *
 * The fade completes early, well before the incoming panel covers the screen. It
 * has to: the card gradients start at 30% alpha, so an incoming card does not
 * fully occlude what is beneath it, and any overlap in the fade window shows as
 * two sets of text reading through each other in the top-left corner.
 */
const FADE_START = 0.12
const FADE_END = 0.45

/** Where the 01/04 counter advances to the next panel. */
const COUNTER_FLIP = 0.5

/**
 * The About section: four cards that each pin to the viewport for a screen's
 * worth of scroll, then scale down, blur and fade as the next rises over them.
 *
 * Every panel is `position: sticky; top: 0; height: 100vh` inside one tall
 * wrapper, with an increasing z-index so later panels stack on top. The scroll
 * handler computes, per panel, how far past its own start we are (0 → 1) and
 * drives scale, lift, blur and opacity from that. Below 900px the CSS unpins the
 * whole thing into a plain vertical list and the handler bails out.
 */
export function AboutStack() {
  const stackRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<HTMLElement[] | null>(null)
  const richMotion = useRichMotion()

  useScrollFrame(() => {
    const wrap = stackRef.current
    if (!wrap) return

    // Cache the panel list — querySelectorAll on every frame would be wasteful.
    if (!panelsRef.current) {
      panelsRef.current = Array.from(wrap.querySelectorAll<HTMLElement>('[data-panel]'))
    }
    const panels = panelsRef.current
    if (panels.length === 0) return

    const viewportHeight = window.innerHeight
    let activeIndex = 0

    // The wrapper is not sticky, so its rect is a stable page anchor. Each panel's
    // own offset comes from `offsetTop` — a pinned sticky element reports
    // `getBoundingClientRect().top === 0`, which would make every panel look as
    // though it had never started scrolling.
    const wrapTop = wrap.getBoundingClientRect().top + window.scrollY

    panels.forEach((panel, index) => {
      const inner = panel.querySelector<HTMLElement>('[data-panel-inner]')
      if (!inner) return

      const isLast = index === panels.length - 1
      const panelTop = wrapTop + panel.offsetTop
      const progress = Math.max(
        0,
        Math.min(1.6, (window.scrollY - panelTop) / viewportHeight),
      )

      if (progress > COUNTER_FLIP && !isLast) activeIndex = index + 1

      panel.style.zIndex = String(10 + index)

      if (!richMotion) {
        inner.style.transform = ''
        inner.style.opacity = ''
        inner.style.filter = ''
        inner.style.visibility = ''
        return
      }

      // The final panel has nothing arriving over it, so it never recedes.
      if (isLast) {
        inner.style.transform = ''
        inner.style.opacity = ''
        inner.style.filter = ''
        inner.style.visibility = ''
        return
      }

      const clamped = Math.min(progress, 1)
      inner.style.transform = `translateY(${(-clamped * 46).toFixed(0)}px) scale(${(
        1 - clamped * 0.12
      ).toFixed(3)})`
      inner.style.filter = `blur(${(clamped * 3).toFixed(1)}px)`

      // The outgoing panel must be fully clear before the incoming one covers the
      // screen, which happens at exactly progress 1.0. The panel cards are
      // semi-transparent gradients, so any residual opacity shows through as two
      // sets of overlapping text.
      const fade = (progress - FADE_START) / (FADE_END - FADE_START)
      const opacity = 1 - Math.max(0, Math.min(1, fade))
      inner.style.opacity = String(opacity)
      // Stop compositing it entirely once invisible — also keeps a ghost card from
      // catching pointer events.
      inner.style.visibility = opacity <= 0.01 ? 'hidden' : 'visible'
    })

    if (barRef.current) {
      const span = panels.length * viewportHeight
      const progress = Math.max(
        0,
        Math.min(1, (window.scrollY - wrapTop + viewportHeight * 0.5) / span),
      )
      barRef.current.style.width = `${(progress * 100).toFixed(1)}%`
    }

    if (counterRef.current) {
      counterRef.current.textContent = `0${activeIndex + 1}/0${panels.length}`
    }
  })

  return (
    <section
      id="about"
      style={{
        position: 'relative',
        background: `linear-gradient(180deg, ${c.ink} 0%, ${c.forest} 50%, ${c.ink} 100%)`,
      }}
    >
      {/* Sticky progress strip that tracks position through the stack. */}
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

      <div ref={stackRef} style={{ position: 'relative', padding: '0 28px 40px' }}>
        {aboutPanels.map((panel) => (
          <div
            key={panel.id}
            data-panel
            className="about-panel"
            style={{
              position: 'sticky',
              top: 0,
              height: '100vh',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <div
              data-panel-inner
              className="about-panel-inner"
              style={{
                width: '100%',
                maxWidth: 1080,
                padding: panel.reasons ? '56px 64px' : '72px 64px',
                borderRadius: 32,
                textAlign: panel.centred ? 'center' : undefined,
                ...TINTS[panel.tint],
                boxShadow: '0 60px 110px rgba(0,0,0,0.65)',
                willChange: 'transform, opacity',
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
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
