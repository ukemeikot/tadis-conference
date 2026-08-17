import {
  featuredTestimonial,
  gallery,
  galleryNote,
  sponsorSlotCount,
  testimonials,
} from '../../content'
import { site } from '../../shared/config/site'
import { c, gold, lime, t, w } from '../../shared/config/theme'
import { useRichMotion } from '../../shared/hooks/useMotion'
import { useTilt } from '../../shared/hooks/useTilt'
import { Eyebrow, Heading, Wrap } from '../../shared/ui'

/** Photo mosaic from the network. */
export function Gallery() {
  const richMotion = useRichMotion()
  const tilt = useTilt(richMotion)

  return (
    <section
      id="gallery"
      style={{
        padding: '100px 28px',
        background: c.ink,
        borderTop: `1px solid ${lime(0.14)}`,
      }}
    >
      <Wrap style={{ padding: 0 }}>
        <Eyebrow>GALLERY</Eyebrow>

        <Heading size="md" style={{ margin: '16px 0 46px' }}>
          From the network
        </Heading>

        <div
          className="gallery-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridAutoRows: 210,
            gap: 16,
            perspective: 1200,
          }}
        >
          {gallery.map((tile) => (
            <div
              key={tile.id}
              className={tile.src ? 'tilt' : undefined}
              {...(tile.src ? tilt : {})}
              style={{
                gridColumn: tile.columnSpan ? `span ${tile.columnSpan}` : undefined,
                gridRow: tile.rowSpan ? `span ${tile.rowSpan}` : undefined,
                borderRadius: 22,
                overflow: 'hidden',
                border: tile.src
                  ? `1px solid ${tile.emphasised ? gold(0.3) : w(0.1)}`
                  : `1px dashed ${lime(0.28)}`,
              }}
            >
              {tile.src ? (
                <img
                  src={tile.src}
                  alt={tile.alt}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: tile.objectPosition,
                    display: 'block',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'grid',
                    placeItems: 'center',
                    background: 'rgba(163,217,60,0.05)',
                    color: t(0.4),
                    fontSize: 11.5,
                    fontWeight: 700,
                    letterSpacing: '0.16em',
                  }}
                >
                  {tile.placeholderLabel}
                </div>
              )}
            </div>
          ))}
        </div>

        <p style={{ margin: '20px 0 0', fontSize: 14, color: t(0.5) }}>{galleryNote}</p>
      </Wrap>
    </section>
  )
}

/** Testimonial band on deep green. */
export function Voices() {
  return (
    <section style={{ padding: '100px 28px', background: c.green900 }}>
      <Wrap size="md" style={{ padding: 0, textAlign: 'center' }}>
        <Eyebrow color={c.gold}>VOICES</Eyebrow>

        <p
          style={{
            margin: '32px 0 0',
            fontSize: 'clamp(24px, 3.2vw, 40px)',
            lineHeight: 1.25,
            fontWeight: 800,
            letterSpacing: '-0.025em',
            textWrap: 'pretty',
          }}
        >
          {featuredTestimonial.quote}
        </p>

        <div style={{ marginTop: 26, fontSize: 15, color: t(0.7) }}>
          {featuredTestimonial.attribution}
        </div>

        <div
          className="voices-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 18,
            marginTop: 56,
            textAlign: 'left',
          }}
        >
          {testimonials.map((voice) => (
            <blockquote
              key={voice.id}
              style={{
                margin: 0,
                padding: 26,
                borderRadius: 20,
                background: w(0.06),
                border: `1px solid ${w(0.12)}`,
              }}
            >
              <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.55, color: t(0.85) }}>
                {voice.quote}
              </p>
              <footer style={{ marginTop: 16, fontSize: 13.5, color: t(0.6) }}>
                {voice.attribution}
              </footer>
            </blockquote>
          ))}
        </div>
      </Wrap>
    </section>
  )
}

/** Empty partner slots, with an invitation to fill them. */
export function Sponsors() {
  return (
    <section style={{ padding: '84px 28px', background: c.ink }}>
      <Wrap style={{ padding: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <span style={{ height: 1, flex: 1, background: w(0.12) }} />
          <span
            style={{
              fontSize: 11,
              letterSpacing: '0.2em',
              color: t(0.6),
              fontWeight: 700,
            }}
          >
            SPONSORS &amp; PARTNERS
          </span>
          <span style={{ height: 1, flex: 1, background: w(0.12) }} />
        </div>

        <div
          className="grid-5"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 16,
          }}
        >
          {Array.from({ length: sponsorSlotCount }, (_, index) => (
            <div
              key={index}
              style={{
                height: 96,
                display: 'grid',
                placeItems: 'center',
                borderRadius: 16,
                border: `1px dashed ${w(0.18)}`,
                fontSize: 12.5,
                color: t(0.4),
              }}
            >
              Partner logo
            </div>
          ))}
        </div>

        <p style={{ margin: '18px 0 0', textAlign: 'center', fontSize: 14, color: t(0.5) }}>
          Send partner logos and we will drop them in.{' '}
          <a href={`mailto:${site.contact.email}`}>Become a partner</a>
        </p>
      </Wrap>
    </section>
  )
}
