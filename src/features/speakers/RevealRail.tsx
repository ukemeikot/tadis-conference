import { useEffect, useRef } from 'react'
import { reveals } from '../../content'
import { c, lime, t } from '../../shared/config/theme'
import { useRichMotion } from '../../shared/hooks/useMotion'
import { Eyebrow, Heading, Wrap } from '../../shared/ui'

/** So the heading reads "Eight more still to come" rather than a bare numeral. */
const NUMBER_WORDS: Record<number, string> = {
  1: 'One',
  2: 'Two',
  3: 'Three',
  4: 'Four',
  5: 'Five',
  6: 'Six',
  7: 'Seven',
  8: 'Eight',
  9: 'Nine',
  10: 'Ten',
  11: 'Eleven',
  12: 'Twelve',
}

/**
 * A horizontally scrolling coverflow of the slots still awaiting names.
 *
 * Each card's rotation and depth is a function of how far its centre sits from
 * the rail's centre, so the deck fans away on both sides. Driven by the rail's own
 * `scroll` event rather than the page scroll driver, since it is the horizontal
 * offset that matters here.
 */
export function RevealRail() {
  const railRef = useRef<HTMLDivElement>(null)
  const richMotion = useRichMotion()

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    const update = () => {
      const centre = rail.scrollLeft + rail.clientWidth / 2

      for (const child of Array.from(rail.children) as HTMLElement[]) {
        if (!richMotion) {
          child.style.transform = ''
          child.style.opacity = ''
          continue
        }

        const cardCentre = child.offsetLeft + child.offsetWidth / 2
        const d = Math.max(
          -1.4,
          Math.min(1.4, (cardCentre - centre) / (rail.clientWidth / 2)),
        )
        child.style.transform =
          `rotateY(${(-d * 26).toFixed(2)}deg) ` +
          `translateZ(${(-Math.abs(d) * 110).toFixed(0)}px) ` +
          `scale(${(1 - Math.abs(d) * 0.07).toFixed(3)})`
        child.style.opacity = String(1 - Math.abs(d) * 0.35)
      }
    }

    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        update()
      })
    }

    rail.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    const initial = requestAnimationFrame(update)

    return () => {
      rail.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(initial)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [richMotion])

  return (
    <section style={{ padding: '30px 0 100px', background: c.ink }}>
      <Wrap>
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
            <Eyebrow color={c.gold}>REVEALS IN PROGRESS</Eyebrow>
            <Heading size="sm" style={{ margin: '16px 0 0', lineHeight: 1.05 }}>
              {NUMBER_WORDS[reveals.length] ?? reveals.length} more still to come
            </Heading>
          </div>
          <p
            style={{
              maxWidth: '42ch',
              fontSize: 15.5,
              lineHeight: 1.6,
              color: t(0.6),
              margin: 0,
            }}
          >
            There is more of the line-up to announce. Register and you will hear each
            name as it lands — drag the rail sideways to see how many are coming.
          </p>
        </div>
      </Wrap>

      <div
        ref={railRef}
        className="tadis-rail"
        style={{
          marginTop: 44,
          padding: '40px 28px 34px',
          display: 'flex',
          gap: 26,
          overflowX: 'auto',
          perspective: 1600,
          scrollSnapType: 'x mandatory',
        }}
      >
        {reveals.map((reveal) => (
          <div
            key={reveal.id}
            style={{
              flex: '0 0 300px',
              scrollSnapAlign: 'center',
              transformStyle: 'preserve-3d',
              transition: 'transform 120ms linear',
            }}
          >
            {reveal.portrait ? (
              <img
                src={reveal.portrait.thumb}
                alt="Speaker to be announced"
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: 380,
                  objectFit: 'cover',
                  objectPosition: reveal.portrait.objectPosition,
                  borderRadius: 22,
                  display: 'block',
                  background: reveal.portrait.background,
                  boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: 380,
                  borderRadius: 22,
                  display: 'grid',
                  placeItems: 'center',
                  border: `1px dashed ${lime(0.4)}`,
                  background: 'rgba(163,217,60,0.06)',
                  textAlign: 'center',
                  padding: 24,
                }}
              >
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: c.lime }}>
                    {reveal.invitation?.title ?? 'Not yet announced'}
                  </div>
                  <p
                    style={{
                      margin: '12px 0 0',
                      fontSize: 14,
                      lineHeight: 1.5,
                      color: t(0.6),
                    }}
                  >
                    {reveal.invitation?.body ??
                      'This name is still under wraps. Register and we will tell you first.'}
                  </p>
                </div>
              </div>
            )}

            <div
              style={{
                marginTop: 18,
                fontSize: 19,
                fontWeight: 800,
                letterSpacing: '-0.02em',
              }}
            >
              {reveal.label}
            </div>
            <div style={{ marginTop: 6, fontSize: 14, color: t(0.55) }}>
              {reveal.caption}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
