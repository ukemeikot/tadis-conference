import { c, font, lime, t, w } from '../../shared/config/theme'
import { useCountdown } from '../../shared/hooks/useCountdown'
import { site } from '../../shared/config/site'

function Cell({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        minWidth: 92,
        padding: '16px 18px',
        borderRadius: 16,
        background: w(0.055),
        border: `1px solid ${lime(0.22)}`,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: font.mono,
          fontSize: 34,
          fontWeight: 700,
          color: c.gold,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 10,
          letterSpacing: '0.18em',
          color: t(0.55),
          marginTop: 8,
        }}
      >
        {label}
      </div>
    </div>
  )
}

/** Live countdown to the opening keynote, beside the date and venue. */
export function Countdown() {
  const { days, hours, minutes, seconds, elapsed } = useCountdown(site.startsAt)

  return (
    <div
      className="countdown-block"
      style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 52 }}
    >
      <div
        className="countdown-cells"
        style={{ display: 'flex', gap: 10 }}
        role="timer"
        aria-live="off"
        aria-label={
          elapsed
            ? 'The summit has begun'
            : `${days} days, ${hours} hours, ${minutes} minutes until the summit`
        }
      >
        <Cell value={days} label="DAYS" />
        <Cell value={hours} label="HOURS" />
        <Cell value={minutes} label="MINUTES" />
        <Cell value={seconds} label="SECONDS" />
      </div>

      <div
        className="countdown-when"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 6,
          padding: '14px 22px',
          borderLeft: `3px solid ${c.rust}`,
          marginLeft: 8,
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.01em' }}>
          {site.dateLabel} · {site.timeLabel}
        </div>
        <div style={{ fontSize: 14.5, color: t(0.7) }}>
          {site.venue.name}, {site.venue.street}, {site.venue.city},{' '}
          {site.venue.state}
        </div>
        <div
          style={{
            fontSize: 12.5,
            color: c.lime,
            fontWeight: 700,
            letterSpacing: '0.04em',
          }}
        >
          {site.entry.note}
        </div>
      </div>
    </div>
  )
}
