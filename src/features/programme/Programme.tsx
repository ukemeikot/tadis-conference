import { programme, programmeDraftNote, programmeIsDraft } from '../../content'
import type { ProgrammeSlot, SlotEmphasis } from '../../content/types'
import { site } from '../../shared/config/site'
import { c, font, gold, lime, t, w } from '../../shared/config/theme'
import { DraftNote, Eyebrow, Heading, Wrap } from '../../shared/ui'

const SLOT_STYLES: Record<SlotEmphasis, { background: string; border: string; time: string }> =
  {
    plain: {
      background: w(0.045),
      border: `1px solid ${w(0.1)}`,
      time: c.lime,
    },
    gold: {
      background: 'linear-gradient(120deg, rgba(233,201,53,0.14), rgba(255,255,255,0.04))',
      border: `1px solid ${gold(0.34)}`,
      time: c.gold,
    },
    rust: {
      background: 'linear-gradient(120deg, rgba(123,30,18,0.34), rgba(255,255,255,0.04))',
      border: `1px solid ${gold(0.24)}`,
      time: c.gold,
    },
    green: {
      background: 'linear-gradient(120deg, rgba(21,155,98,0.2), rgba(255,255,255,0.04))',
      border: `1px solid ${lime(0.3)}`,
      time: c.lime,
    },
  }

/** Programme heading and draft caveat. */
export function ProgrammeIntro() {
  return (
    <section
      id="programme"
      style={{
        padding: '96px 28px 40px',
        background: `linear-gradient(180deg, ${c.ink}, ${c.forest})`,
      }}
    >
      <Wrap size="md" style={{ padding: 0 }}>
        <Eyebrow>PROGRAMME · {site.dateLabel.replace(', ', ' ').toUpperCase()}</Eyebrow>

        <Heading size="lg" style={{ margin: '20px 0 0', maxWidth: '18ch' }}>
          One day, start to finish
        </Heading>

        {programmeIsDraft && (
          <DraftNote flag="DRAFT" style={{ marginTop: 26 }}>
            {programmeDraftNote}
          </DraftNote>
        )}
      </Wrap>
    </section>
  )
}

/** The running order itself. */
export function ProgrammeTimeline() {
  return (
    <section style={{ padding: '40px 28px 100px', background: c.forest }}>
      <Wrap
        size="md"
        style={{ padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}
      >
        {programme.map((slot) => (
          <Slot key={slot.id} slot={slot} />
        ))}
      </Wrap>
    </section>
  )
}

function Slot({ slot }: { slot: ProgrammeSlot }) {
  const style = SLOT_STYLES[slot.emphasis]
  const isHighlight = slot.emphasis === 'gold' || slot.emphasis === 'rust'

  return (
    <div
      className="prog-row"
      style={{
        display: 'grid',
        gridTemplateColumns: '132px 1fr',
        gap: 28,
        padding: 26,
        borderRadius: 20,
        background: style.background,
        border: style.border,
      }}
    >
      <div
        style={{
          fontFamily: font.mono,
          fontSize: 17,
          color: style.time,
          fontWeight: 700,
        }}
      >
        {slot.time}
      </div>

      <div>
        {slot.eyebrow && (
          <div
            style={{
              fontSize: 10.5,
              letterSpacing: '0.16em',
              fontWeight: 800,
              color: c.gold,
            }}
          >
            {slot.eyebrow}
          </div>
        )}

        <h3
          style={{
            margin: slot.eyebrow ? '12px 0 0' : 0,
            fontSize: isHighlight ? 25 : 21,
            fontWeight: 800,
            letterSpacing: isHighlight ? '-0.025em' : '-0.02em',
          }}
        >
          {slot.title}
        </h3>

        {slot.attribution && (
          <p style={{ margin: '10px 0 0', fontSize: 16, color: t(0.82) }}>
            {slot.attribution}
          </p>
        )}

        {slot.description && (
          <p style={{ margin: '8px 0 0', fontSize: 15.5, lineHeight: 1.55, color: t(0.68) }}>
            {slot.description}
          </p>
        )}

        {slot.rooms && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
            {slot.rooms.map((room) => (
              <span
                key={room}
                style={{
                  padding: '7px 13px',
                  borderRadius: 999,
                  background: 'rgba(163,217,60,0.14)',
                  border: `1px solid ${lime(0.3)}`,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {room}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
