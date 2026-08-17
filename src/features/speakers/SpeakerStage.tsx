import { useRef } from 'react'
import { stageSpeakers } from '../../content'
import type { StageSpeaker } from '../../content/types'
import { c, font, gold, lime, t } from '../../shared/config/theme'
import { useMediaQuery, useRichMotion } from '../../shared/hooks/useMotion'
import { useScrollFrame } from '../../shared/hooks/useScrollFrame'
import {
  card3dOpacity,
  card3dTransform,
  copyOpacity,
  copyTransform,
  distanceFromCentre,
} from '../../shared/lib/scroll3d'

/**
 * Portrait frame aspect ratio.
 *
 * The supplied photos are 4:5 (and one square), so the frame matches them. The
 * design used a 4:3 video frame, which with `object-fit: cover` sliced the top off
 * a tall portrait — heads were being cut in half.
 */
const PORTRAIT_RATIO = '4 / 5'

/**
 * The keynote stage: a vertical timeline down the centre with speakers alternating
 * either side, each portrait rotating in 3D as it passes the middle of the screen.
 *
 * The timeline "fills" to wherever the viewport centre has reached, with a glowing
 * node at the tip, and each speaker's dot lights up gold as their row comes level.
 */
export function SpeakerStage() {
  const stageRef = useRef<HTMLElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const richMotion = useRichMotion()
  // The rail moves from the centre to the left edge below this width, which is a
  // different behaviour rather than just different styling — hence a separate
  // query from useRichMotion (that one also trips on prefers-reduced-motion).
  const isNarrow = useMediaQuery('(max-width: 900px)')

  // Cached element lists — querySelectorAll on every frame would be wasteful.
  const cache = useRef<{
    rows: HTMLElement[]
    cards: HTMLElement[]
    copy: HTMLElement[]
    nodes: HTMLElement[]
  } | null>(null)

  useScrollFrame(() => {
    const stage = stageRef.current
    if (!stage) return

    if (!cache.current) {
      cache.current = {
        rows: Array.from(stage.querySelectorAll<HTMLElement>('[data-row]')),
        cards: Array.from(stage.querySelectorAll<HTMLElement>('[data-card]')),
        copy: Array.from(stage.querySelectorAll<HTMLElement>('[data-copy]')),
        nodes: Array.from(stage.querySelectorAll<HTMLElement>('[data-node]')),
      }
    }
    const { rows, cards, copy, nodes } = cache.current
    const viewportHeight = window.innerHeight
    const mid = viewportHeight / 2

    // Grow the lit section of the rail down to the viewport centre. Same mechanic
    // whether the rail is centred or on the left edge.
    if (fillRef.current) {
      const box = stage.getBoundingClientRect()
      const height = Math.max(0, Math.min(box.height, mid - box.top))
      fillRef.current.style.height = `${height.toFixed(1)}px`
    }

    if (isNarrow) {
      // Narrow layout: no 3D. Instead each row flips a `data-revealed` flag as it
      // comes into view, and CSS draws the horizontal link from the rail to the
      // card and lights that speaker's node.
      for (const element of [...cards, ...copy]) {
        if (element.style.transform || element.style.opacity) {
          element.style.transform = ''
          element.style.opacity = ''
        }
      }
      for (const node of nodes) {
        if (node.style.background) {
          node.style.background = ''
          node.style.borderColor = ''
          node.style.boxShadow = ''
        }
      }
      for (const row of rows) {
        const box = row.getBoundingClientRect()
        const revealed =
          box.top < viewportHeight * 0.65 && box.bottom > viewportHeight * 0.15
        const next = revealed ? 'true' : 'false'
        // Only touch the DOM on an actual change — this runs every frame.
        if (row.dataset.revealed !== next) row.dataset.revealed = next
      }
      return
    }

    // Wide layout: drop any reveal flags left over from the narrow one.
    for (const row of rows) {
      if (row.dataset.revealed) delete row.dataset.revealed
    }

    if (!richMotion) {
      for (const element of [...cards, ...copy]) {
        element.style.transform = ''
        element.style.opacity = ''
      }
      return
    }

    for (const card of cards) {
      const d = distanceFromCentre(card)
      const side = card.dataset.side === 'end' ? 1 : -1
      card.style.transform = card3dTransform(d, side)
      card.style.opacity = String(card3dOpacity(d))
    }

    for (const block of copy) {
      const d = distanceFromCentre(block)
      block.style.transform = copyTransform(d)
      block.style.opacity = String(copyOpacity(d))
    }

    for (const node of nodes) {
      const box = node.getBoundingClientRect()
      const lit = Math.abs(box.top + box.height / 2 - mid) < window.innerHeight * 0.22
      node.style.background = lit ? c.gold : c.forest
      node.style.borderColor = lit ? c.gold : lime(0.45)
      node.style.boxShadow = lit ? `0 0 30px 10px ${gold(0.4)}` : 'none'
    }
  })

  return (
    <section
      ref={stageRef}
      style={{ position: 'relative', padding: '20px 0 60px', background: c.ink }}
    >
      {/* Unlit rail */}
      <div
        aria-hidden
        className="stage-rail"
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: 2,
          transform: 'translateX(-1px)',
          background: t(0.09),
        }}
      />
      {/* Lit rail, grown by the scroll handler, with the travelling node at its tip */}
      <div
        ref={fillRef}
        aria-hidden
        className="stage-rail"
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          width: 2,
          height: 0,
          transform: 'translateX(-1px)',
          background: `linear-gradient(180deg, ${lime(0.1)}, ${c.lime} 55%, ${c.gold})`,
          boxShadow: `0 0 26px 3px ${lime(0.45)}`,
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 0,
            width: 14,
            height: 14,
            borderRadius: 999,
            background: c.gold,
            boxShadow: `0 0 26px 8px ${gold(0.5)}`,
            transform: 'translate(-50%, 50%)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 0,
            width: 30,
            height: 30,
            borderRadius: 999,
            border: `1px solid ${gold(0.6)}`,
            transform: 'translate(-50%, -50%)',
            animation: 'tadisPulse 2.6s ease-in-out infinite',
          }}
        />
      </div>

      {stageSpeakers.map((speaker) => (
        <StageRow key={speaker.id} speaker={speaker} />
      ))}
    </section>
  )
}

function StageRow({ speaker }: { speaker: StageSpeaker }) {
  const cardOnLeft = speaker.side === 'left'
  const accentColor = speaker.accent === 'gold' ? c.gold : c.lime

  const card = (
    <div
      data-card
      data-side={cardOnLeft ? 'end' : undefined}
      className="stage-card"
      style={{
        justifySelf: cardOnLeft ? 'end' : undefined,
        width: '100%',
        maxWidth: 560,
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
      }}
    >
      <SpeakerPortrait speaker={speaker} />
    </div>
  )

  const copy = (
    <div
      data-copy
      className="stage-copy"
      style={{
        justifySelf: cardOnLeft ? undefined : 'end',
        maxWidth: 520,
        textAlign: cardOnLeft ? undefined : 'right',
        willChange: 'transform, opacity',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          padding: '7px 14px',
          borderRadius: 999,
          fontSize: 10.5,
          letterSpacing: '0.16em',
          fontWeight: 800,
          ...(speaker.eyebrowStyle === 'solid'
            ? { background: c.gold, color: c.inkText }
            : {
                background:
                  speaker.accent === 'gold' ? 'rgba(233,201,53,0.16)' : 'rgba(163,217,60,0.16)',
                border: `1px solid ${speaker.accent === 'gold' ? gold(0.5) : lime(0.45)}`,
                color: accentColor,
              }),
        }}
      >
        {speaker.eyebrow}
      </div>

      <h3
        style={{
          margin: '22px 0 0',
          fontSize: 'clamp(34px, 4.2vw, 62px)',
          lineHeight: 0.98,
          fontWeight: 800,
          letterSpacing: '-0.035em',
        }}
      >
        {speaker.name}
      </h3>

      <div style={{ marginTop: 14, fontSize: 17.5, color: t(0.8) }}>{speaker.role}</div>

      {speaker.sessionTitle && (
        <p
          style={{
            margin: '26px 0 0',
            fontSize: 21,
            lineHeight: 1.35,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: c.lime,
          }}
        >
          {speaker.sessionTitle}
        </p>
      )}

      {speaker.biography && (
        <p style={{ margin: '24px 0 0', fontSize: 17, lineHeight: 1.6, color: t(0.72) }}>
          {speaker.biography}
        </p>
      )}

      <div
        className="stage-meta"
        style={{
          display: 'flex',
          gap: 26,
          marginTop: 30,
          justifyContent: cardOnLeft ? undefined : 'flex-end',
          fontFamily: font.mono,
          fontSize: 14,
          color: t(0.6),
        }}
      >
        {speaker.session.map((detail) => (
          <div key={detail.value}>
            {detail.value}
            {detail.label && (
              <div
                style={{
                  fontFamily: font.sans,
                  fontSize: 12.5,
                  letterSpacing: '0.14em',
                  marginTop: 6,
                }}
              >
                {detail.label}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <article
      data-row
      className="stage-row"
      style={{
        position: 'relative',
        minHeight: '96vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 90,
        alignItems: 'center',
        padding: '70px 28px',
        maxWidth: 1400,
        margin: '0 auto',
        perspective: 1600,
      }}
    >
      {/* Horizontal link from the rail to this speaker. Hidden at desktop width,
          where the node sits on the centre line between the two columns. */}
      <div className="stage-connector" aria-hidden />

      <div
        data-node
        aria-hidden
        className="stage-node"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 16,
          height: 16,
          borderRadius: 999,
          background: c.forest,
          border: `2px solid ${lime(0.45)}`,
          transform: 'translate(-50%,-50%)',
          transition: 'background 300ms, border-color 300ms, box-shadow 300ms',
        }}
      />
      {cardOnLeft ? card : copy}
      {cardOnLeft ? copy : card}
    </article>
  )
}

/**
 * The speaker's photo, or a placeholder while we are still waiting on one.
 *
 * The frame matches the portraits' own 4:5 ratio so nothing is cropped away, and
 * `objectPosition` is per-speaker for the sources that are not 4:5.
 */
function SpeakerPortrait({ speaker }: { speaker: StageSpeaker }) {
  const borderColor = speaker.border === 'gold' ? gold(0.35) : lime(0.3)

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 26,
        overflow: 'hidden',
        border: `1px solid ${borderColor}`,
        boxShadow: '0 50px 90px rgba(0,0,0,0.6)',
        background: c.forest,
      }}
    >
      {speaker.portrait ? (
        <img
          src={speaker.portrait.src}
          alt={speaker.name}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            aspectRatio: PORTRAIT_RATIO,
            objectFit: 'cover',
            objectPosition: speaker.portrait.objectPosition ?? 'center 20%',
            display: 'block',
            background: speaker.portrait.background ?? c.forest,
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            aspectRatio: PORTRAIT_RATIO,
            display: 'grid',
            placeItems: 'center',
            padding: 32,
            textAlign: 'center',
            background: `linear-gradient(150deg, rgba(21,155,98,0.18), ${c.ink})`,
          }}
        >
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: c.lime }}>
              Portrait to come
            </div>
            <p
              style={{
                margin: '12px 0 0',
                fontSize: 14,
                lineHeight: 1.5,
                color: t(0.6),
                maxWidth: '28ch',
              }}
            >
              Send us a photo of {speaker.name} and we will drop it in.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
