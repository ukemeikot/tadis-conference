import { firesideGuests, panelists } from '../../content'
import {
  firesideNote,
  firesideTopic,
  panelNote,
  panelTopic,
} from '../../content/speakers'
import type { SpeakerCard } from '../../content/types'
import { c, lime, t, w } from '../../shared/config/theme'
import { useRichMotion } from '../../shared/hooks/useMotion'
import { useTilt } from '../../shared/hooks/useTilt'
import { Wrap } from '../../shared/ui'
import { GridHeader } from './SpeakersIntro'

const ACCENTS: Record<SpeakerCard['accent'], string> = {
  gold: c.gold,
  lime: c.lime,
  amber: c.amber,
}

function Card({ card, tilt }: { card: SpeakerCard; tilt: ReturnType<typeof useTilt> }) {
  const accent = ACCENTS[card.accent]

  return (
    <div
      className="tilt"
      {...tilt}
      style={{
        borderRadius: 22,
        overflow: 'hidden',
        background: card.emphasised
          ? 'linear-gradient(160deg, rgba(225,81,42,0.16), rgba(255,255,255,0.04))'
          : w(0.045),
        border: `1px solid ${
          card.accent === 'amber'
            ? card.emphasised
              ? 'rgba(240,160,43,0.32)'
              : 'rgba(240,160,43,0.24)'
            : lime(0.24)
        }`,
      }}
    >
      {card.portrait ? (
        <img
          src={card.portrait.thumb}
          alt={card.name}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: card.imageHeight,
            objectFit: 'cover',
            objectPosition: card.portrait.objectPosition,
            display: 'block',
            background: card.portrait.background,
          }}
        />
      ) : (
        // No stand-in faces: an unnamed slot shows a dashed placeholder rather than
        // a real person's photo under "To be announced".
        <div
          aria-hidden
          style={{
            width: '100%',
            height: card.imageHeight,
            display: 'grid',
            placeItems: 'center',
            borderBottom: `1px dashed ${accent}44`,
            background: `linear-gradient(150deg, ${accent}14, rgba(255,255,255,0.02))`,
            color: `${accent}99`,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.14em',
          }}
        >
          PORTRAIT TO COME
        </div>
      )}

      <div style={{ padding: card.accent === 'amber' ? 24 : 22 }}>
        <div
          style={{
            fontSize: 10.5,
            letterSpacing: '0.16em',
            color: accent,
            fontWeight: 800,
          }}
        >
          {card.eyebrow}
        </div>
        <div
          style={{
            marginTop: 10,
            fontSize: card.accent === 'amber' ? 21 : 19,
            fontWeight: 800,
            letterSpacing: '-0.02em',
          }}
        >
          {card.name}
        </div>
        {card.detail && (
          <div
            style={{
              marginTop: card.accent === 'amber' ? 8 : 6,
              fontSize: card.accent === 'amber' ? 14.5 : 14,
              color: t(card.accent === 'amber' ? 0.65 : 0.6),
            }}
          >
            {card.detail}
          </div>
        )}
      </div>
    </div>
  )
}

/** The faculty panel — four cards, mouse-tilting in 3D. */
export function PanelistsGrid() {
  const richMotion = useRichMotion()
  const tilt = useTilt(richMotion)

  return (
    <section id="panelists" style={{ padding: '40px 28px 90px', background: c.ink }}>
      <Wrap style={{ padding: 0 }}>
        <GridHeader
          eyebrow="PANELISTS"
          eyebrowColor={c.lime}
          title={panelTopic}
          note={panelNote}
          // The panel topic is a full sentence, so it needs to sit smaller than a
          // short section title would.
          titleStyle={{
            fontSize: 'clamp(22px, 2.2vw, 32px)',
            lineHeight: 1.2,
            maxWidth: '30ch',
          }}
        />

        <div
          className="grid-3"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(panelists.length, 3)}, 1fr)`,
            gap: 20,
            marginTop: 44,
            perspective: 1300,
          }}
        >
          {panelists.map((card) => (
            <Card key={card.id} card={card} tilt={tilt} />
          ))}
        </div>
      </Wrap>
    </section>
  )
}

/** The fireside chat — host plus two guests. */
export function FiresideGrid() {
  const richMotion = useRichMotion()
  const tilt = useTilt(richMotion)

  return (
    <section id="fireside" style={{ padding: '20px 28px 90px', background: c.ink }}>
      <Wrap style={{ padding: 0 }}>
        <GridHeader
          eyebrow="FIRESIDE CHAT"
          eyebrowColor={c.amber}
          title={firesideTopic}
          note={firesideNote}
          titleStyle={{
            fontSize: 'clamp(22px, 2.4vw, 34px)',
            lineHeight: 1.2,
            maxWidth: '26ch',
          }}
        />

        <div
          className="grid-4"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(firesideGuests.length, 4)}, 1fr)`,
            gap: 20,
            marginTop: 44,
            perspective: 1300,
          }}
        >
          {firesideGuests.map((card) => (
            <Card key={card.id} card={card} tilt={tilt} />
          ))}
        </div>
      </Wrap>
    </section>
  )
}
