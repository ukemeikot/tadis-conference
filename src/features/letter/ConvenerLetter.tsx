import { useState } from 'react'
import {
  convenerLetter,
  formatStart,
  parentsMoment,
  sessionById,
  streamLabel,
  streams,
  watchUrl,
} from '../../content'
import { c, font, gold, lime, t } from '../../shared/config/theme'
import { Eyebrow, PlayDisc } from '../../shared/ui'

/** Ink on the cream paper — the same pair as the memory-walk prints. */
const PAPER = '#F6F1E4'
const INK = '#1C2A24'
const INK_MUTED = '#55655E'

/**
 * The convener's letter of appreciation, set as a letter beside his portrait, and
 * under it the moment his parents spoke — both given room near the top of the
 * page rather than tucked away at the bottom.
 */
export function ConvenerLetter() {
  const letter = convenerLetter

  return (
    <section
      id="appreciation"
      style={{
        padding: '100px 28px 110px',
        background: `linear-gradient(180deg, ${c.ink} 0%, ${c.green900} 30%, ${c.forest} 75%, ${c.ink} 100%)`,
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <Eyebrow color={c.gold} style={{ textAlign: 'center' }}>
          APPRECIATION · FROM THE CONVENER
        </Eyebrow>
        <h2
          style={{
            margin: '18px 0 0',
            textAlign: 'center',
            fontSize: 'clamp(34px, 4.6vw, 62px)',
            lineHeight: 1,
            fontWeight: 800,
            letterSpacing: '-0.035em',
          }}
        >
          A letter of thanks
        </h2>

        <div className="letter-layout">
          {/* The convener, beside his letter. Sticky on wide screens so he stays
              in view while the letter scrolls past. */}
          <figure className="letter-portrait">
            <div
              style={{
                position: 'relative',
                borderRadius: 26,
                overflow: 'hidden',
                border: `1px solid ${gold(0.45)}`,
                boxShadow: `0 50px 100px rgba(0,0,0,0.55), 0 0 60px ${lime(0.12)}`,
              }}
            >
              <img
                src="/assets/speaker-emanamfon-akpan.jpg"
                alt={`${letter.name}, ${letter.role}`}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  aspectRatio: '4 / 5',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                }}
              />
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 'auto 0 0 0',
                  height: '45%',
                  background: 'linear-gradient(180deg, transparent, rgba(4,22,15,0.92))',
                }}
              />
              <figcaption style={{ position: 'absolute', left: 22, right: 22, bottom: 20 }}>
                <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.025em', color: '#fff' }}>
                  {letter.name}
                </div>
                <div style={{ marginTop: 4, fontFamily: font.mono, fontSize: 12.5, color: c.gold }}>
                  {letter.role.toUpperCase()}
                </div>
                <div style={{ marginTop: 2, fontSize: 14, color: t(0.72) }}>{letter.organisation}</div>
              </figcaption>
            </div>
          </figure>

          <article
            className="letter-paper"
            style={{
              position: 'relative',
              padding: '56px 56px 48px',
              borderRadius: 18,
              background: PAPER,
              color: INK,
              boxShadow: `0 50px 100px rgba(0,0,0,0.55), 0 0 0 1px ${gold(0.3)}`,
            }}
          >
            {/* A strip of tape, as on the memory-walk prints. */}
            <span
              aria-hidden
              style={{
                position: 'absolute',
                top: -13,
                left: '50%',
                width: 110,
                height: 26,
                marginLeft: -55,
                background: gold(0.78),
                borderRadius: 3,
                transform: 'rotate(-2deg)',
              }}
            />

            <p style={{ margin: 0, fontSize: 19, fontWeight: 800, letterSpacing: '-0.01em' }}>
              {letter.greeting}
            </p>

            {letter.paragraphs.map((paragraph, index) => (
              <p key={index} style={{ margin: '18px 0 0', fontSize: 17, lineHeight: 1.7, color: INK }}>
                {paragraph}
              </p>
            ))}

            <footer
              style={{
                marginTop: 36,
                paddingTop: 26,
                borderTop: '1px solid rgba(28,42,36,0.14)',
              }}
            >
              <div style={{ fontSize: 15, color: INK_MUTED, fontStyle: 'italic' }}>{letter.closing}</div>
              <div style={{ marginTop: 6, fontSize: 21, fontWeight: 800, letterSpacing: '-0.015em' }}>
                {letter.name}
              </div>
              <div style={{ marginTop: 2, fontFamily: font.mono, fontSize: 12.5, color: INK_MUTED }}>
                {letter.role} · {letter.organisation}
              </div>
            </footer>
          </article>
        </div>

        <ParentsMoment />
      </div>
    </section>
  )
}

/**
 * The convener's parents speaking, played straight from the livestream between
 * the moment they come up and the moment they hand back.
 */
function ParentsMoment() {
  const [playing, setPlaying] = useState(false)
  const session = sessionById[parentsMoment.session]
  if (!session) return null
  const stream = streams.find((s) => s.id === session.stream)!
  const embed =
    `https://www.youtube-nocookie.com/embed/${stream.youtubeId}` +
    `?start=${session.start}${session.end ? `&end=${session.end}` : ''}&autoplay=1&rel=0`

  return (
    <div id="parents" className="parents-moment">
      <div className="parents-copy">
        <Eyebrow color={c.gold}>{parentsMoment.eyebrow}</Eyebrow>
        <h3
          style={{
            margin: '16px 0 0',
            fontSize: 'clamp(30px, 3.4vw, 46px)',
            lineHeight: 1.02,
            fontWeight: 800,
            letterSpacing: '-0.03em',
          }}
        >
          {parentsMoment.title}
        </h3>
        <p style={{ margin: '18px 0 0', fontSize: 17, lineHeight: 1.65, color: t(0.78), maxWidth: '44ch' }}>
          {parentsMoment.body}
        </p>
        <div style={{ marginTop: 22, fontFamily: font.mono, fontSize: 13, color: t(0.6) }}>
          {streamLabel(session.stream)} · {formatStart(session.start)}
          {session.end ? ` – ${formatStart(session.end)}` : ''}
        </div>
        <a
          href={watchUrl(session.stream, session.start)}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-block', marginTop: 10, fontSize: 14.5, fontWeight: 800 }}
        >
          Open on YouTube ↗
        </a>
      </div>

      <div
        style={{
          position: 'relative',
          aspectRatio: '16 / 9',
          borderRadius: 24,
          overflow: 'hidden',
          background: '#000',
          border: `1px solid ${gold(0.5)}`,
          boxShadow: `0 50px 100px rgba(0,0,0,0.55), 0 0 70px ${gold(0.16)}`,
        }}
      >
        {playing ? (
          <iframe
            src={embed}
            title={session.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play: ${session.title}`}
            style={{
              position: 'absolute',
              inset: 0,
              padding: 0,
              border: 0,
              cursor: 'pointer',
              background: `#000 url(${session.thumb}) center 25% / cover`,
            }}
          >
            <span
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(4,22,15,0.05), rgba(4,22,15,0.55))',
              }}
            />
            <PlayDisc size={84} />
            <span
              style={{
                position: 'absolute',
                left: 18,
                bottom: 16,
                padding: '7px 13px',
                borderRadius: 999,
                background: 'rgba(4,22,15,0.82)',
                fontSize: 11,
                letterSpacing: '0.14em',
                fontWeight: 800,
                color: c.gold,
              }}
            >
              WATCH · ABOUT 3 MINUTES
            </span>
          </button>
        )}
      </div>
    </div>
  )
}
