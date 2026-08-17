import { useEffect, useRef, useState } from 'react'
import { navigation } from '../../content'
import { c, lime, t } from '../../shared/config/theme'
import { useMediaQuery } from '../../shared/hooks/useMotion'
import { useScrollFrame } from '../../shared/hooks/useScrollFrame'
import { useScrollSpy } from '../../shared/hooks/useScrollSpy'
import { LumaCheckoutLink } from '../registration/LumaCheckoutLink'

const NAV_IDS = navigation.map((item) => item.id)

/** Below this the eight links no longer fit on one row, so they collapse. */
const MOBILE_QUERY = '(max-width: 860px)'

/**
 * Sticky header: blurred bar, section links that underline as you pass each
 * section, and a hairline read-progress bar across the bottom edge.
 *
 * Under 860px the links collapse behind a hamburger. Eight links plus a CTA
 * cannot sit on one row on a phone, and letting them wrap produced three ragged
 * rows that pushed the bar to a third of the screen.
 */
export function SiteHeader() {
  const progressRef = useRef<HTMLDivElement>(null)
  const active = useScrollSpy(NAV_IDS)
  const isMobile = useMediaQuery(MOBILE_QUERY)
  const [menuOpen, setMenuOpen] = useState(false)

  // Never leave the panel open behind a desktop layout.
  useEffect(() => {
    if (!isMobile) setMenuOpen(false)
  }, [isMobile])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  // Progress is written straight to the element — it changes every frame.
  useScrollFrame(() => {
    const bar = progressRef.current
    if (!bar) return
    const max = document.documentElement.scrollHeight - window.innerHeight
    const percent = max > 0 ? (window.scrollY / max) * 100 : 0
    bar.style.width = `${percent.toFixed(2)}%`
  })

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 60,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        background: 'rgba(4,23,16,0.82)',
        borderBottom: `1px solid ${lime(0.16)}`,
      }}
    >
      <nav
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: isMobile ? '10px 20px' : '14px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: 28,
        }}
      >
        <a
          href="#home"
          onClick={() => setMenuOpen(false)}
          style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#fff', minWidth: 0 }}
        >
          {/* The ADN mark is gold-on-white, so on the dark bar it sits in a white
              chip — the asymmetric corner is the design system's "pathway" nod. */}
          <span
            style={{
              display: 'grid',
              placeItems: 'center',
              width: isMobile ? 38 : 46,
              height: isMobile ? 38 : 46,
              background: '#fff',
              borderRadius: '12px 12px 12px 3px',
              boxShadow: '0 6px 18px rgba(10,61,41,0.5)',
              flex: '0 0 auto',
            }}
          >
            <img
              src="/assets/sm/adn-logo.png"
              alt="The African Dream Network"
              width={34}
              height={34}
              style={{
                width: isMobile ? 28 : 34,
                height: isMobile ? 28 : 34,
                objectFit: 'contain',
              }}
            />
          </span>

          <img
            src="/assets/tadis-logo.png"
            alt="TADIS 2026"
            style={{ height: isMobile ? 32 : 42, width: 'auto', display: 'block' }}
          />

          {/* Drops out on a phone — the logo already says TADIS 2026. */}
          {!isMobile && (
            <span
              style={{
                fontSize: 9.5,
                letterSpacing: '0.16em',
                color: t(0.6),
                alignSelf: 'center',
              }}
            >
              INTERNATIONAL
              <br />
              SUMMIT
            </span>
          )}
        </a>

        <div style={{ flex: 1 }} />

        {isMobile ? (
          <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
              columnGap: 20,
              rowGap: 10,
              fontSize: 14,
              fontWeight: 600,
              minWidth: 0,
            }}
          >
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="nav-link"
                data-active={active === item.id}
                aria-current={active === item.id ? 'true' : undefined}
              >
                {item.label}
              </a>
            ))}

            <LumaCheckoutLink
              className="cta-lime"
              style={{
                padding: '11px 20px',
                borderRadius: 999,
                fontWeight: 800,
                fontSize: 14,
                boxShadow: '0 8px 24px rgba(163,217,60,0.28)',
              }}
            >
              Register free
            </LumaCheckoutLink>
          </div>
        )}
      </nav>

      {isMobile && menuOpen && (
        <div
          id="site-menu"
          style={{
            borderTop: `1px solid ${lime(0.16)}`,
            padding: '8px 20px 20px',
            maxHeight: 'calc(100vh - 120px)',
            overflowY: 'auto',
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active === item.id ? 'true' : undefined}
                  style={{
                    display: 'block',
                    padding: '14px 4px',
                    fontSize: 16,
                    fontWeight: 700,
                    color: active === item.id ? c.lime : t(0.85),
                    borderBottom: `1px solid rgba(255,255,255,0.07)`,
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <LumaCheckoutLink
            className="cta-lime"
            style={{
              display: 'block',
              marginTop: 18,
              padding: '15px 20px',
              borderRadius: 999,
              fontWeight: 800,
              fontSize: 16,
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(163,217,60,0.28)',
            }}
          >
            Register free
          </LumaCheckoutLink>
        </div>
      )}

      <div
        ref={progressRef}
        aria-hidden
        style={{
          height: 2,
          width: 0,
          background: `linear-gradient(90deg, ${c.lime}, ${c.gold})`,
        }}
      />
    </header>
  )
}

/** Hamburger that morphs into a close cross. */
function MenuToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  // `top: 0` is load-bearing: without it the bars fall back to their static
  // position near the button's text baseline and bunch up at the bottom, so the
  // offsets below are measured from a known origin instead.
  const bar = (transform: string): React.CSSProperties => ({
    position: 'absolute',
    top: 0,
    left: 10,
    width: 22,
    height: 2,
    borderRadius: 2,
    background: c.text,
    transition: 'transform 220ms var(--ease-out), opacity 160ms linear',
    transform,
  })

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="site-menu"
      aria-label={open ? 'Close menu' : 'Open menu'}
      style={{
        position: 'relative',
        width: 42,
        height: 42,
        flex: '0 0 auto',
        borderRadius: 12,
        border: `1px solid ${lime(0.3)}`,
        background: 'rgba(163,217,60,0.08)',
        cursor: 'pointer',
        padding: 0,
      }}
    >
      <span aria-hidden style={bar(open ? 'translateY(20px) rotate(45deg)' : 'translateY(14px)')} />
      <span
        aria-hidden
        style={{
          ...bar('translateY(20px)'),
          opacity: open ? 0 : 1,
        }}
      />
      <span aria-hidden style={bar(open ? 'translateY(20px) rotate(-45deg)' : 'translateY(26px)')} />
    </button>
  )
}
