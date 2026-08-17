import { useRef } from 'react'
import { floorPlanNote, venueZones } from '../../content'
import { c, font, lime, t } from '../../shared/config/theme'
import { useRichMotion } from '../../shared/hooks/useMotion'
import { useScrollFrame } from '../../shared/hooks/useScrollFrame'
import { Eyebrow, Heading, Wrap } from '../../shared/ui'

/** The plan's resting orientation. Scroll nudges it either side of this. */
const BASE_ROTATE_X = 56
const BASE_ROTATE_Z = -40

/**
 * The venue as an isometric floor plan: a gridded slab tilted back on two axes,
 * with each zone floating at its own height above it and lifting further on hover.
 *
 * The whole slab counter-rotates slightly as it moves through the viewport, which
 * is what sells it as a solid object rather than a flat picture. Below 900px the
 * CSS flattens it to a plain top-down diagram, and this handler stops writing to it.
 */
export function VenuePlan() {
  const planRef = useRef<HTMLDivElement>(null)
  const richMotion = useRichMotion()

  useScrollFrame(() => {
    const plan = planRef.current
    if (!plan) return

    if (!richMotion) {
      plan.style.transform = ''
      return
    }

    const box = plan.getBoundingClientRect()
    // -1 → 1 as the plan crosses the viewport centre.
    const progress = Math.max(
      -1,
      Math.min(1, (window.innerHeight / 2 - box.top - box.height / 2) / window.innerHeight),
    )
    plan.style.transform =
      `rotateX(${(BASE_ROTATE_X - progress * 12).toFixed(2)}deg) ` +
      `rotateZ(${(BASE_ROTATE_Z + progress * 8).toFixed(2)}deg)`
  })

  return (
    <section
      id="venue"
      style={{
        padding: '100px 28px 120px',
        background: `linear-gradient(180deg, ${c.forest}, ${c.ink})`,
      }}
    >
      <Wrap style={{ padding: 0 }}>
        <Eyebrow>VENUE PLAN</Eyebrow>

        <Heading size="md" style={{ margin: '16px 0 0' }}>
          Six zones on the day
        </Heading>

        <p
          style={{
            margin: '18px 0 0',
            maxWidth: '56ch',
            fontSize: 16.5,
            lineHeight: 1.6,
            color: t(0.7),
          }}
        >
          {floorPlanNote}
        </p>

        <div
          className="venue-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.25fr 0.75fr',
            gap: 56,
            marginTop: 56,
            alignItems: 'center',
          }}
        >
          <div style={{ perspective: 1500, padding: '20px 0' }}>
            <div
              ref={planRef}
              className="venue-plan"
              aria-hidden
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1.35',
                transformStyle: 'preserve-3d',
                transform: `rotateX(${BASE_ROTATE_X}deg) rotateZ(${BASE_ROTATE_Z}deg)`,
                transition: 'transform 400ms cubic-bezier(.2,.8,.2,1)',
              }}
            >
              {/* Slab */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 18,
                  background:
                    'linear-gradient(140deg, rgba(10,61,41,0.9), rgba(4,23,16,0.9))',
                  border: `1px solid ${lime(0.3)}`,
                  boxShadow: '0 60px 90px rgba(0,0,0,0.55)',
                }}
              />
              {/* Survey grid */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 18,
                  backgroundImage: [
                    'linear-gradient(rgba(163,217,60,0.09) 1px, transparent 1px)',
                    'linear-gradient(90deg, rgba(163,217,60,0.09) 1px, transparent 1px)',
                  ].join(', '),
                  backgroundSize: '9% 12%',
                }}
              />

              {venueZones.map((zone) => (
                <div
                  key={zone.number}
                  className="zone"
                  style={
                    {
                      position: 'absolute',
                      ...zone.geometry,
                      borderRadius: 12,
                      background: zone.gradient,
                      border: zone.border,
                      '--z': `${zone.depth}px`,
                      '--zh': `${zone.liftedDepth}px`,
                    } as React.CSSProperties
                  }
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: zone.numberSize > 20 ? 14 : 12,
                      top: zone.numberSize > 20 ? 12 : 10,
                      fontFamily: font.mono,
                      fontSize: zone.numberSize,
                      fontWeight: 700,
                      color: zone.numberColor,
                    }}
                  >
                    {zone.number}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The legend is the accessible version of the plan above. */}
          <ol
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              margin: 0,
              padding: 0,
              listStyle: 'none',
            }}
          >
            {venueZones.map((zone) => (
              <li
                key={zone.number}
                style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}
              >
                <span
                  style={{
                    fontFamily: font.mono,
                    fontSize: 15,
                    color: c.gold,
                    fontWeight: 700,
                  }}
                >
                  {zone.number}
                </span>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>
                    {zone.name}
                  </div>
                  <div style={{ fontSize: 14.5, color: t(0.65), marginTop: 4 }}>
                    {zone.detail}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Wrap>
    </section>
  )
}
