import { useRef } from 'react'
import { site } from '../../shared/config/site'
import { c, font, gold, lime, t, w } from '../../shared/config/theme'
import { useRichMotion } from '../../shared/hooks/useMotion'
import { useScrollFrame } from '../../shared/hooks/useScrollFrame'
import { Eyebrow, Heading } from '../../shared/ui'
import { card3dTransform, distanceFromCentre } from '../../shared/lib/scroll3d'
import { LumaCheckoutLink } from './LumaCheckoutLink'

const STEPS = [
  {
    number: '01',
    title: 'Register on Luma',
    body: 'Takes under a minute. One entry per delegate.',
    emphasised: false,
  },
  {
    number: '02',
    title: 'Get your ticket by email',
    body: 'Luma sends your confirmation and the QR code you show at the desk.',
    emphasised: false,
  },
  {
    number: '03',
    title: `Arrive by ${site.doorsOpen} on 3 October`,
    body: `${site.venue.name}, ${site.venue.street}, ${site.venue.city}.`,
    emphasised: true,
  },
]

/**
 * Registration.
 *
 * Delegate details are collected by Luma, not by this site — the button opens
 * Luma's own registration overlay and Luma issues the ticket and QR code that
 * accreditation scans on the day. That is deliberate: a second, locally generated
 * reference would be meaningless at the desk and would only compete with the real
 * one. The card sets expectations for what Luma will ask, so the jump to a
 * different-looking form is not a surprise.
 */
export function RegistrationSection() {
  const cardRef = useRef<HTMLDivElement>(null)
  const richMotion = useRichMotion()

  // The same scroll-driven 3D the speaker cards use, so the card belongs to the
  // page rather than sitting on it. It lives on the right, hence side -1.
  useScrollFrame(() => {
    const card = cardRef.current
    if (!card) return
    if (!richMotion) {
      card.style.transform = ''
      return
    }
    card.style.transform = card3dTransform(distanceFromCentre(card) * 0.6, -1)
  })

  return (
    <section
      id="register"
      style={{
        position: 'relative',
        padding: '100px 28px',
        background: `linear-gradient(150deg, ${c.forest} 0%, ${c.ink} 55%, ${c.rust} 200%)`,
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '-30% -20% auto auto',
          width: '60%',
          height: '140%',
          background:
            'radial-gradient(circle at 60% 40%, rgba(163,217,60,0.16), transparent 62%)',
        }}
      />

      <div
        className="register-grid"
        style={{
          position: 'relative',
          maxWidth: 1240,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 560px',
          gap: 64,
          alignItems: 'start',
          perspective: 1600,
        }}
      >
        <div>
          <Eyebrow>REGISTRATION</Eyebrow>

          <Heading size="lg" style={{ margin: '20px 0 0', maxWidth: '16ch', lineHeight: 0.95 }}>
            Entry is free. Registration is compulsory.
          </Heading>

          <p
            style={{
              margin: '24px 0 0',
              maxWidth: '50ch',
              fontSize: 18,
              lineHeight: 1.6,
              color: t(0.78),
            }}
          >
            Seating is limited, so every delegate needs a ticket. Register and you will
            get a confirmation with your QR code, the final programme and directions to
            the venue.
          </p>

          <ol
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              marginTop: 44,
              maxWidth: 460,
              padding: 0,
              listStyle: 'none',
            }}
          >
            {STEPS.map((step) => (
              <li
                key={step.number}
                style={{
                  display: 'flex',
                  gap: 16,
                  padding: '20px 22px',
                  borderRadius: 18,
                  background: step.emphasised
                    ? 'linear-gradient(120deg, rgba(163,217,60,0.16), rgba(255,255,255,0.04))'
                    : w(0.05),
                  border: `1px solid ${lime(step.emphasised ? 0.34 : 0.22)}`,
                }}
              >
                <div
                  style={{
                    fontFamily: font.mono,
                    fontSize: 15,
                    color: c.gold,
                    fontWeight: 700,
                  }}
                >
                  {step.number}
                </div>
                <div>
                  <div style={{ fontSize: 16.5, fontWeight: 800 }}>{step.title}</div>
                  <div style={{ marginTop: 5, fontSize: 14.5, color: t(0.66) }}>
                    {step.body}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Same treatment as the About panels and speaker cards: deep gradient
            surface, lime hairline, gold-to-lime accent edge, heavy soft shadow. */}
        <div
          ref={cardRef}
          style={{
            position: 'relative',
            borderRadius: 28,
            padding: '40px 36px 36px',
            background:
              'linear-gradient(150deg, rgba(21,155,98,0.30), rgba(4,23,16,0.94))',
            border: `1px solid ${lime(0.34)}`,
            boxShadow: '0 60px 110px rgba(0,0,0,0.6)',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 3,
              background: `linear-gradient(90deg, ${c.lime}, ${c.gold})`,
            }}
          />

          <div
            style={{
              fontFamily: font.mono,
              fontSize: 13,
              letterSpacing: '0.12em',
              color: c.lime,
            }}
          >
            RESERVE YOUR SEAT
          </div>

          <h3
            style={{
              margin: '20px 0 0',
              fontSize: 'clamp(28px, 3vw, 38px)',
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: '-0.03em',
            }}
          >
            Free, and it takes a minute
          </h3>

          <p style={{ margin: '16px 0 0', fontSize: 16, lineHeight: 1.55, color: t(0.72) }}>
            Registration is handled by Luma. You will be asked for:
          </p>

          <ul
            style={{
              margin: '22px 0 0',
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            {site.luma.questions.map((question) => (
              <li
                key={question}
                style={{
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                  fontSize: 16,
                  lineHeight: 1.45,
                  color: t(0.88),
                }}
              >
                <span
                  aria-hidden
                  style={{
                    marginTop: 7,
                    width: 7,
                    height: 7,
                    borderRadius: 999,
                    background: c.gold,
                    boxShadow: `0 0 10px ${gold(0.6)}`,
                    flex: '0 0 auto',
                  }}
                />
                {question}
              </li>
            ))}
          </ul>

          <LumaCheckoutLink
            className="cta-lime"
            style={{
              display: 'block',
              marginTop: 32,
              padding: '17px 28px',
              borderRadius: 999,
              fontWeight: 800,
              fontSize: 17,
              textAlign: 'center',
              boxShadow: '0 14px 40px rgba(163,217,60,0.3)',
            }}
          >
            Register free on Luma
          </LumaCheckoutLink>

          <p
            style={{
              margin: '16px 0 0',
              fontSize: 13,
              lineHeight: 1.5,
              color: t(0.5),
              textAlign: 'center',
            }}
          >
            Opens in a secure Luma window. Or{' '}
            <a href={site.luma.eventUrl} target="_blank" rel="noopener noreferrer">
              go to the event page
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
