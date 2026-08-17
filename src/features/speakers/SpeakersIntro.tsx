import { facultyCounts } from '../../content'
import { site } from '../../shared/config/site'
import { c, gold, lime, t } from '../../shared/config/theme'
import { Eyebrow, Heading, Lead, Wrap } from '../../shared/ui'

const CHIPS = [
  {
    href: '#speakers',
    label: `Main stage · ${facultyCounts.mainStage}`,
    color: c.gold,
    background: 'rgba(233,201,53,0.16)',
    border: gold(0.5),
  },
  {
    href: '#panelists',
    label: `Panelists · ${facultyCounts.panel}`,
    color: c.lime,
    background: 'rgba(163,217,60,0.14)',
    border: lime(0.42),
  },
  {
    href: '#fireside',
    label: `Fireside chat · ${facultyCounts.fireside}`,
    color: c.amber,
    background: 'rgba(225,81,42,0.16)',
    border: 'rgba(225,81,42,0.5)',
  },
]

/** Heading block that introduces the three speaker formats. */
export function SpeakersIntro() {
  return (
    <section
      id="speakers"
      style={{ position: 'relative', padding: '96px 28px 24px', background: c.ink }}
    >
      <Wrap style={{ padding: 0 }}>
        <Eyebrow>FACULTY · {site.edition}</Eyebrow>

        <Heading size="xl" style={{ margin: '20px 0 0', maxWidth: '20ch' }}>
          The people re-engineering Africa
        </Heading>

        <Lead style={{ marginTop: 22 }}>
          You will hear from them in three ways: keynotes from the main stage, an open
          panel where the questions come from the floor, and fireside chats with two
          chairs and no slides. Keep scrolling — you will meet each of them in turn.
        </Lead>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 32 }}>
          {CHIPS.map((chip) => (
            <a
              key={chip.href}
              href={chip.href}
              style={{
                padding: '10px 18px',
                borderRadius: 999,
                background: chip.background,
                border: `1px solid ${chip.border}`,
                color: chip.color,
                fontSize: 13.5,
                fontWeight: 700,
              }}
            >
              {chip.label}
            </a>
          ))}
        </div>
      </Wrap>
    </section>
  )
}

/** Shared section header for the panel and fireside grids. */
export function GridHeader({
  eyebrow,
  eyebrowColor,
  title,
  note,
  titleStyle,
}: {
  eyebrow: string
  eyebrowColor: string
  title: string
  note: string
  /** For a long title — the panel topic runs to a couple of sentences. */
  titleStyle?: React.CSSProperties
}) {
  return (
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
        <Eyebrow color={eyebrowColor}>{eyebrow}</Eyebrow>
        <Heading
          size="sm"
          style={{
            margin: '16px 0 0',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            ...titleStyle,
          }}
        >
          {title}
        </Heading>
      </div>
      <p
        style={{
          maxWidth: '40ch',
          fontSize: 15.5,
          lineHeight: 1.6,
          color: t(0.62),
          margin: 0,
        }}
      >
        {note}
      </p>
    </div>
  )
}
