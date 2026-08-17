import { fullAddress, site } from '../../shared/config/site'
import { c, lime, t } from '../../shared/config/theme'
import { Eyebrow, Heading } from '../../shared/ui'

/** Opens the venue in whichever maps app the visitor has. */
const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  fullAddress,
)}`

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div
        style={{
          fontSize: 11,
          letterSpacing: '0.16em',
          color: t(0.5),
          fontWeight: 700,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  )
}

export function Contact() {
  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        padding: '110px 28px',
        background: `linear-gradient(120deg, ${c.green900} 0%, ${c.forest} 55%, ${c.rust} 160%)`,
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '-40% -10% auto auto',
          width: '60%',
          height: '160%',
          background:
            'radial-gradient(circle at 60% 40%, rgba(163,217,60,0.22), transparent 60%)',
        }}
      />

      <div
        className="contact-grid"
        style={{
          position: 'relative',
          maxWidth: 1240,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 56,
          alignItems: 'center',
        }}
      >
        <div>
          <Eyebrow>CONTACT</Eyebrow>

          <Heading size="sm" style={{ margin: '16px 0 0', letterSpacing: '-0.03em' }}>
            Talk to the team
          </Heading>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              marginTop: 32,
              fontSize: 17,
            }}
          >
            <Field label="EMAIL">
              <a href={`mailto:${site.contact.email}`} style={{ fontSize: 17 }}>
                {site.contact.email}
              </a>
            </Field>

            <Field label="PHONE">
              <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
                {site.contact.phones.map((phone) => (
                  <a key={phone.tel} href={`tel:${phone.tel}`}>
                    {phone.display}
                  </a>
                ))}
              </div>
            </Field>

            <Field label="VENUE">
              <div style={{ color: t(0.8), lineHeight: 1.5 }}>
                {site.venue.name}, {site.venue.street},
                <br />
                {site.venue.city}, {site.venue.state}, {site.venue.country}
              </div>
            </Field>
          </div>
        </div>

        {/* A dark-themed map still, rather than a live embed: a Google Maps iframe
            cannot be themed without the JS API, and a bright map panel in this
            section would fight everything around it. The whole panel is a link out
            to directions, which is what a visitor actually wants from it. */}
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            position: 'relative',
            borderRadius: 24,
            overflow: 'hidden',
            border: `1px solid ${lime(0.3)}`,
            boxShadow: '0 30px 70px rgba(0,0,0,0.45)',
            color: 'inherit',
          }}
        >
          <img
            src="/assets/venue-map.jpg"
            alt={`Map showing ${site.venue.name} on ${site.venue.street}, ${site.venue.city}`}
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: 340,
              objectFit: 'cover',
              objectPosition: 'center 46%',
              display: 'block',
            }}
          />

          {/* Bottom scrim so the label stays readable over the streets. */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 'auto 0 0 0',
              padding: '38px 22px 18px',
              background:
                'linear-gradient(180deg, transparent, rgba(4,23,16,0.55) 45%, rgba(4,23,16,0.94))',
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: 22,
              right: 22,
              bottom: 18,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 16,
            }}
          >
            <div>
              <div style={{ fontSize: 16.5, fontWeight: 800, letterSpacing: '-0.01em' }}>
                {site.venue.name}
              </div>
              <div style={{ marginTop: 4, fontSize: 14, color: t(0.72) }}>
                {site.venue.street}, {site.venue.city}
              </div>
            </div>
            <span
              style={{
                flex: '0 0 auto',
                padding: '9px 16px',
                borderRadius: 999,
                background: c.lime,
                color: c.inkText,
                fontSize: 13,
                fontWeight: 800,
              }}
            >
              Get directions
            </span>
          </div>
        </a>
      </div>
    </section>
  )
}
