import { site } from '../../shared/config/site'
import { c, lime, t, w } from '../../shared/config/theme'

const SUMMIT_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#speakers', label: 'Speakers' },
  { href: '#programme', label: 'Programme' },
  { href: '#register', label: 'Register' },
]

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        letterSpacing: '0.18em',
        color: t(0.45),
        fontWeight: 700,
        marginBottom: 6,
      }}
    >
      {children}
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer
      style={{
        padding: '72px 28px 40px',
        background: c.inkDeeper,
        borderTop: `1px solid ${lime(0.14)}`,
      }}
    >
      <div
        className="footer-grid"
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr',
          gap: 48,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span
              style={{
                display: 'grid',
                placeItems: 'center',
                width: 46,
                height: 46,
                background: '#fff',
                borderRadius: '12px 12px 12px 3px',
                flex: '0 0 auto',
              }}
            >
              <img
                src="/assets/sm/adn-logo.png"
                alt=""
                width={34}
                height={34}
                loading="lazy"
                style={{ width: 34, height: 34, objectFit: 'contain' }}
              />
            </span>
            <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              The African Dream
              <br />
              Network
            </div>
            <img
              src="/assets/tadis-logo.png"
              alt={site.edition}
              loading="lazy"
              style={{ height: 46, width: 'auto', marginLeft: 6 }}
            />
          </div>

          <p
            style={{
              margin: '20px 0 0',
              fontSize: 15,
              lineHeight: 1.6,
              color: t(0.6),
              maxWidth: '34ch',
            }}
          >
            {site.tagline} Uniting emerging African youth for a self-sustaining continent.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ColumnHeading>SUMMIT</ColumnHeading>
          {SUMMIT_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{ color: t(0.78), fontSize: 15 }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ColumnHeading>VENUE</ColumnHeading>
          <div style={{ fontSize: 15, lineHeight: 1.55, color: t(0.7) }}>
            {site.venue.name}
            <br />
            {site.venue.street}
            <br />
            {site.venue.city}, {site.venue.state}
          </div>
          <div style={{ fontSize: 15, color: c.lime, fontWeight: 700, marginTop: 4 }}>
            {site.shortDateLabel} · {site.timeLabel}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ColumnHeading>CONTACT</ColumnHeading>
          <a
            href={`mailto:${site.contact.email}`}
            style={{ fontSize: 15, wordBreak: 'break-all' }}
          >
            {site.contact.email}
          </a>
          {site.contact.phones.map((phone) => (
            <a key={phone.tel} href={`tel:${phone.tel}`} style={{ fontSize: 15, color: t(0.78) }}>
              {phone.display}
            </a>
          ))}
        </div>
      </div>

      <div
        style={{
          maxWidth: 1240,
          margin: '48px auto 0',
          paddingTop: 24,
          borderTop: `1px solid ${w(0.08)}`,
          display: 'flex',
          justifyContent: 'space-between',
          gap: 20,
          flexWrap: 'wrap',
          fontSize: 13.5,
          color: t(0.45),
        }}
      >
        <div>© 2026 The African Dream Network. All rights reserved.</div>
        <div>
          {site.edition} · {site.theme}
        </div>
      </div>
    </footer>
  )
}
