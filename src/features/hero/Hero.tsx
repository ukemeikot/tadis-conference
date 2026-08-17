import { useRef } from 'react'
import { site } from '../../shared/config/site'
import { c, lime, t } from '../../shared/config/theme'
import { useAfricaGlobe } from '../../shared/hooks/useAfricaGlobe'
import { useReducedMotion } from '../../shared/hooks/useMotion'
import { useScrollFrame } from '../../shared/hooks/useScrollFrame'
import { LumaCheckoutLink } from '../registration/LumaCheckoutLink'
import { Countdown } from './Countdown'

/**
 * The hero: a Three.js point-cloud Africa turning behind the theme lockup, with
 * the copy drifting upward as you scroll away from it.
 */
export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useAfricaGlobe(canvasRef, { animate: !reducedMotion })

  // Slow parallax on the copy — capped at 160px so it never drifts out of frame.
  useScrollFrame(() => {
    const copy = copyRef.current
    if (!copy) return
    if (reducedMotion) {
      copy.style.transform = ''
      return
    }
    copy.style.transform = `translateY(${Math.min(window.scrollY * 0.18, 160)}px)`
  })

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: 720,
        display: 'grid',
        alignItems: 'center',
        overflow: 'hidden',
        borderBottom: `1px solid ${lime(0.14)}`,
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />

      {/* Two radial washes plus a vertical fade, so the globe reads behind the
          copy and dissolves cleanly into the next section. */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: [
            'radial-gradient(60% 55% at 78% 42%, rgba(21,155,98,0.28), transparent 70%)',
            'radial-gradient(70% 60% at 12% 20%, rgba(123,30,18,0.35), transparent 65%)',
            `linear-gradient(180deg, rgba(4,23,16,0.55) 0%, rgba(4,23,16,0.2) 45%, ${c.ink} 100%)`,
          ].join(', '),
          pointerEvents: 'none',
        }}
      />

      <div
        ref={copyRef}
        className="hero-inner"
        style={{
          position: 'relative',
          maxWidth: 1240,
          margin: '0 auto',
          padding: '96px 28px 110px',
          width: '100%',
          willChange: 'transform',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 16px',
            border: `1px solid ${lime(0.4)}`,
            borderRadius: 999,
            background: 'rgba(4,23,16,0.5)',
            fontSize: 11,
            letterSpacing: '0.16em',
            fontWeight: 700,
            color: c.lime,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: 999,
              background: c.gold,
              boxShadow: `0 0 12px ${c.gold}`,
            }}
          />
          {site.summitName.toUpperCase()}
        </div>

        {/* The theme is set artwork, not type — so the h1 carries the lockup
            image and the alt text supplies the heading for AT and search. */}
        <h1 style={{ margin: '30px 0 0', maxWidth: 760 }}>
          <img
            src="/assets/theme-lockup.png"
            alt={`${site.theme} — ${site.edition} theme`}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 24px 50px rgba(0,0,0,0.55))',
            }}
          />
        </h1>

        <p
          style={{
            margin: '26px 0 0',
            maxWidth: '54ch',
            fontSize: 19,
            lineHeight: 1.55,
            color: t(0.78),
          }}
        >
          One day, one continent-sized conversation. {site.edition} gathers Africa's
          emerging leaders in {site.venue.city} to rebuild the mindset, the systems
          and the will behind a self-sustaining continent.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 36 }}>
          <LumaCheckoutLink
            className="cta-lime"
            style={{
              padding: '16px 30px',
              borderRadius: 999,
              fontWeight: 800,
              fontSize: 16,
              boxShadow: '0 14px 40px rgba(163,217,60,0.3)',
            }}
          >
            Register free
          </LumaCheckoutLink>
          <a
            href="#programme"
            className="cta-ghost"
            style={{
              padding: '16px 30px',
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            See the programme
          </a>
        </div>

        <Countdown />
      </div>
    </section>
  )
}
