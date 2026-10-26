import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  formatDuration,
  formatStart,
  highlightReel,
  sessionRecordings,
  streamLabel,
  streams,
  watchUrl,
} from '../../content'
import type { SessionRecording, Stream } from '../../content/types'
import { site } from '../../shared/config/site'
import { c, gold, lime, t } from '../../shared/config/theme'
import { useRichMotion } from '../../shared/hooks/useMotion'
import { useTilt } from '../../shared/hooks/useTilt'
import { Button, Eyebrow, Input, PlayDisc } from '../../shared/ui'

/**
 * The recordings: the 73-second recap, both full livestreams, and a card for
 * every session that links into the stream at the moment it starts. Closes with
 * the TADIS 2027 sign-up.
 */
export function Sessions() {
  const tilt = useTilt(useRichMotion())

  return (
    <section
      id="sessions"
      style={{
        position: 'relative',
        padding: '110px 28px',
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
          background: `radial-gradient(circle at 60% 40%, ${lime(0.16)}, transparent 62%)`,
        }}
      />

      <div style={{ position: 'relative', maxWidth: 1240, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'space-between',
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <Eyebrow>ON YOUTUBE</Eyebrow>
            <h2
              style={{
                margin: '18px 0 0',
                fontSize: 'clamp(40px, 5.2vw, 74px)',
                lineHeight: 0.95,
                fontWeight: 800,
                letterSpacing: '-0.035em',
              }}
            >
              Watch every session
            </h2>
          </div>
          <p style={{ margin: 0, maxWidth: '44ch', fontSize: 16.5, lineHeight: 1.6, color: t(0.72) }}>
            Full recordings from {site.dateLabel}. The day went out as two livestreams;
            each card below opens the right one at the moment that session starts.
          </p>
        </div>

        <div className="sessions-feature">
          <Reel />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {streams.map((stream) => (
              <StreamCard key={stream.id} stream={stream} />
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
            gap: 22,
            marginTop: 48,
            perspective: 1400,
          }}
        >
          {sessionRecordings.map((session) => (
            <SessionCard key={session.id} session={session} tilt={tilt} />
          ))}
        </div>

        <NextYear />
      </div>
    </section>
  )
}

/** The recap cut, with sound — so it only plays when asked to. */
function Reel() {
  return (
    <figure
      style={{
        margin: 0,
        borderRadius: 26,
        overflow: 'hidden',
        background: c.green900,
        border: `1px solid ${gold(0.4)}`,
        boxShadow: '0 40px 90px rgba(0,0,0,0.5)',
      }}
    >
      <video
        src={highlightReel.src}
        poster={highlightReel.poster}
        controls
        playsInline
        preload="none"
        style={{ width: '100%', aspectRatio: '9 / 16', maxHeight: 620, objectFit: 'cover', display: 'block', background: '#000' }}
      />
      <figcaption
        style={{
          padding: '16px 20px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.02em' }}>
          {highlightReel.caption}
        </span>
        <span style={{ fontSize: 10.5, letterSpacing: '0.14em', fontWeight: 800, color: c.gold }}>
          HIGHLIGHTS
        </span>
      </figcaption>
    </figure>
  )
}

/**
 * One of the two full livestreams. Click-to-load: the YouTube player is a heavy
 * embed, so the card shows our own still of that half of the day until someone asks for it.
 */
function StreamCard({ stream }: { stream: Stream }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div
      style={{
        borderRadius: 22,
        overflow: 'hidden',
        background: c.green900,
        border: `1px solid ${lime(0.24)}`,
        boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '16 / 9', background: '#000' }}>
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${stream.youtubeId}?autoplay=1&rel=0`}
            title={`${site.edition} livestream, ${stream.label}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play the full livestream, ${stream.label}`}
            style={{
              position: 'absolute',
              inset: 0,
              padding: 0,
              border: 0,
              cursor: 'pointer',
              background: `#000 url(${stream.poster}) center / cover`,
            }}
          >
            <span
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(4,22,15,0.15), rgba(4,22,15,0.55))',
              }}
            />
            <PlayDisc size={64} />
          </button>
        )}
      </div>
      <div
        style={{
          padding: '16px 20px 18px',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div style={{ fontSize: 10.5, letterSpacing: '0.14em', fontWeight: 800, color: c.gold }}>
            FULL LIVESTREAM · {formatDuration(stream.seconds)}
          </div>
          <div style={{ marginTop: 6, fontSize: 18.5, fontWeight: 800, letterSpacing: '-0.02em' }}>
            {stream.label}
            <span style={{ fontWeight: 600, color: t(0.6) }}>
              {stream.id === 'part1' ? ' · morning into afternoon' : ' · afternoon to the close'}
            </span>
          </div>
        </div>
        <a
          href={watchUrl(stream.id)}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 14, fontWeight: 800 }}
        >
          Open on YouTube ↗
        </a>
      </div>
    </div>
  )
}

function SessionCard({
  session,
  tilt,
}: {
  session: SessionRecording
  tilt: ReturnType<typeof useTilt>
}) {
  return (
    <a
      href={watchUrl(session.stream, session.start)}
      target="_blank"
      rel="noopener noreferrer"
      className="tilt session-card"
      {...tilt}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 22,
        overflow: 'hidden',
        background: c.green900,
        color: c.text,
        boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
      }}
    >
      <div style={{ position: 'relative' }}>
        <img
          src={session.thumb}
          alt=""
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: 220,
            objectFit: 'cover',
            objectPosition: session.objectPosition ?? 'center 20%',
            display: 'block',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(4,22,15,0.05), rgba(4,22,15,0.55))',
          }}
        />
        <PlayDisc size={62} />
        <div
          style={{
            position: 'absolute',
            left: 12,
            bottom: 12,
            padding: '6px 11px',
            borderRadius: 999,
            background: 'rgba(4,22,15,0.82)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: c.gold,
          }}
        >
          {streamLabel(session.stream)} · {formatStart(session.start)}
        </div>
      </div>
      <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ fontSize: 18.5, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
          {session.title}
        </div>
        <div style={{ marginTop: 8, fontSize: 14.5, color: t(0.7) }}>{session.who}</div>
        <div style={{ marginTop: 'auto', paddingTop: 16, fontSize: 14, fontWeight: 800, color: c.lime }}>
          Watch on YouTube ↗
        </div>
      </div>
    </a>
  )
}

/**
 * The TADIS 2027 sign-up.
 *
 * There is no mailing-list service behind the site, so this does not pretend to
 * subscribe anyone: it opens a pre-written email to the team, and the confirmation
 * says exactly that. Swap the submit handler for a real list (Luma calendar,
 * Mailchimp, a form endpoint) when there is one.
 */
function NextYear() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const subject = encodeURIComponent('Notify me about TADIS 2027')
    const body = encodeURIComponent(
      `Hello,\n\nPlease add ${email} to the list for TADIS 2027 — dates, venue and the first speaker reveal.\n\nThank you.`,
    )
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div
      className="next-year"
      style={{
        marginTop: 72,
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
        gap: 40,
        alignItems: 'center',
        padding: 40,
        borderRadius: 28,
        background: 'var(--surface-card, #fff)',
        boxShadow: '0 40px 90px rgba(0,0,0,0.45)',
        borderTop: `3px solid ${c.lime}`,
      }}
    >
      <div>
        <div style={{ fontSize: 11, letterSpacing: '0.2em', color: c.green500, fontWeight: 700 }}>
          TADIS 2027
        </div>
        <h3
          style={{
            margin: '14px 0 0',
            fontSize: 32,
            lineHeight: 1.05,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--text-strong, #0F1F1A)',
          }}
        >
          Be first to hear about next year
        </h3>
        <p style={{ margin: '12px 0 0', fontSize: 16, lineHeight: 1.55, color: 'var(--text-muted, #5B6B64)' }}>
          Dates, venue and the first speaker reveal, straight to your inbox.
        </p>
      </div>

      {sent ? (
        <div role="status" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            aria-hidden
            style={{
              width: 52,
              height: 52,
              flex: 'none',
              borderRadius: 999,
              background: c.lime,
              display: 'grid',
              placeItems: 'center',
              fontSize: 26,
              color: c.inkText,
              fontWeight: 800,
            }}
          >
            ✓
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-strong, #0F1F1A)' }}>
              Almost there — send the email
            </div>
            <p style={{ margin: '6px 0 0', fontSize: 14.5, lineHeight: 1.5, color: 'var(--text-muted, #5B6B64)' }}>
              Your mail app opened with a message to the team. If it did not, write to{' '}
              <a href={`mailto:${site.contact.email}`} style={{ color: c.green500, fontWeight: 700 }}>
                {site.contact.email}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              style={{
                marginTop: 8,
                padding: 0,
                border: 0,
                background: 'none',
                font: 'inherit',
                fontSize: 14,
                color: c.green500,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Use another email
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Input
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@email.com"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button type="submit" variant="primary" size="lg" fullWidth>
            Notify me
          </Button>
        </form>
      )}
    </div>
  )
}
