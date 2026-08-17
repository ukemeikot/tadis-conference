import { site } from '../../shared/config/site'
import { c, lime, t } from '../../shared/config/theme'
import { Eyebrow, Heading } from '../../shared/ui'

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

        {/* Deliberately a placeholder — no map provider is wired up yet, and an
            empty embed would be worse than saying so. */}
        <div
          style={{
            height: 320,
            borderRadius: 24,
            border: `1px dashed ${lime(0.4)}`,
            background: 'rgba(4,23,16,0.5)',
            display: 'grid',
            placeItems: 'center',
            textAlign: 'center',
            padding: 28,
          }}
        >
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: c.lime }}>
              Map goes here
            </div>
            <p
              style={{
                margin: '12px 0 0',
                fontSize: 15,
                lineHeight: 1.55,
                color: t(0.6),
                maxWidth: '34ch',
              }}
            >
              Drop in an embedded map or a directions graphic for {site.venue.street}.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
