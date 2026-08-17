import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  collage,
  featuredTestimonial,
  galleryEyebrow,
  galleryHeadline,
  galleryNote,
  partnerSlots,
  partnerSwapIntervalMs,
  partnerSwaps,
  partners,
  testimonials,
} from '../../content'
import { site } from '../../shared/config/site'
import { c, lime, t, w } from '../../shared/config/theme'
import { useRichMotion } from '../../shared/hooks/useMotion'
import { useScrollFrame } from '../../shared/hooks/useScrollFrame'
import { AFRICA_ASPECT, AFRICA_CLIP_PATH } from '../../shared/lib/africa'
import { Eyebrow, Wrap } from '../../shared/ui'

/** Must be unique in the document — clip-path references it by id. */
const CLIP_ID = 'tadis-africa-clip'

/**
 * The gallery: one dense, overlapping pile of photographs with the section title
 * set large straight across the middle of it.
 *
 * The whole cluster drifts and settles as it crosses the viewport — the same
 * scroll-driven idea as the rest of the page, but applied to the group rather than
 * to each photo, so it reads as one object being carried past.
 */
export function Gallery() {
  const clusterRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const richMotion = useRichMotion()

  useScrollFrame(() => {
    const cluster = clusterRef.current
    const headline = headlineRef.current
    if (!cluster) return

    if (!richMotion) {
      cluster.style.transform = ''
      if (headline) headline.style.transform = ''
      return
    }

    const box = cluster.getBoundingClientRect()
    // -1 above the viewport centre, +1 below it.
    const distance = Math.max(
      -1,
      Math.min(
        1,
        (box.top + box.height / 2 - window.innerHeight / 2) / window.innerHeight,
      ),
    )

    // Settle from slightly small and low into place at centre screen.
    const settle = 1 - Math.abs(distance) * 0.06
    cluster.style.transform = `scale(${settle.toFixed(3)}) translateY(${(
      distance * 26
    ).toFixed(0)}px)`

    // The type moves against the photographs, which is what separates the two
    // planes and stops the whole thing reading flat.
    if (headline) {
      headline.style.transform = `translateY(${(-distance * 42).toFixed(0)}px)`
    }
  })

  return (
    <section
      id="gallery"
      style={{
        position: 'relative',
        padding: '96px 0 110px',
        background: c.ink,
        borderTop: `1px solid ${lime(0.14)}`,
        overflow: 'hidden',
      }}
    >
      <Wrap style={{ position: 'relative', zIndex: 30 }}>
        <Eyebrow>{galleryEyebrow}</Eyebrow>
      </Wrap>

      {/* The clip path itself. Zero-sized so it never takes part in layout;
          objectBoundingBox units mean the 0..1 path scales to whatever box uses it. */}
      <svg width="0" height="0" aria-hidden focusable="false" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id={CLIP_ID} clipPathUnits="objectBoundingBox">
            <path d={AFRICA_CLIP_PATH} />
          </clipPath>
        </defs>
      </svg>

      <div
        style={{
          position: 'relative',
          maxWidth: 900,
          margin: '0 auto',
          padding: '0 20px',
        }}
      >
        {/* The pile, cut to the shape of the continent. Percentage geometry keeps
            both the tiles and the clip intact at any width. */}
        {/* Not aria-hidden: the decorative tiles carry alt="" and are ignored, but
            the convener's tile has real alt text that should still be announced. */}
        <div
          ref={clusterRef}
          className="collage"
          style={
            {
              // Match the outline's own ratio so Africa is not stretched.
              '--collage-aspect': AFRICA_ASPECT.toFixed(3),
              clipPath: `url(#${CLIP_ID})`,
              willChange: 'transform',
            } as CSSProperties
          }
        >
          {collage.map((tile, index) => (
            <img
              key={`${tile.src}-${index}`}
              src={tile.src}
              alt={tile.alt ?? ''}
              loading={index < 10 && !tile.feature ? 'eager' : 'lazy'}
              decoding="async"
              className="collage-tile"
              data-outer={tile.outer ? 'true' : undefined}
              data-feature={tile.feature ? 'true' : undefined}
              style={
                {
                  '--tw': `${tile.w}%`,
                  left: `${tile.x}%`,
                  top: `${tile.y}%`,
                  zIndex: tile.z,
                  transform: `translate(-50%, -50%) rotate(${tile.r}deg)`,
                } as CSSProperties
              }
            />
          ))}
        </div>

        {/* The coastline, traced over the photographs so the shape reads even where
            a pale image meets the edge. Same path, drawn rather than cutting. */}
        <svg
          className="collage-outline"
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
          aria-hidden
          focusable="false"
          style={{ '--collage-aspect': AFRICA_ASPECT.toFixed(3) } as CSSProperties}
        >
          <path
            d={AFRICA_CLIP_PATH}
            fill="none"
            stroke={c.lime}
            strokeOpacity={0.55}
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Set over the pile, centred on it. */}
        <div ref={headlineRef} className="collage-headline">
          <h2>
            {galleryHeadline.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
        </div>
      </div>

      <Wrap style={{ position: 'relative', zIndex: 30, marginTop: 28 }}>
        <p
          style={{
            margin: 0,
            maxWidth: '46ch',
            fontSize: 16,
            lineHeight: 1.6,
            color: t(0.6),
          }}
        >
          {galleryNote}
        </p>
      </Wrap>
    </section>
  )
}

/** Testimonial band on deep green. */
export function Voices() {
  return (
    <section style={{ padding: '100px 28px', background: c.green900 }}>
      <Wrap size="md" style={{ padding: 0, textAlign: 'center' }}>
        <Eyebrow color={c.gold}>VOICES</Eyebrow>

        <p
          style={{
            margin: '32px 0 0',
            fontSize: 'clamp(24px, 3.2vw, 40px)',
            lineHeight: 1.25,
            fontWeight: 800,
            letterSpacing: '-0.025em',
            textWrap: 'pretty',
          }}
        >
          {featuredTestimonial.quote}
        </p>

        <div style={{ marginTop: 26, fontSize: 15, color: t(0.7) }}>
          {featuredTestimonial.attribution}
        </div>

        <div
          className="voices-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 18,
            marginTop: 56,
            textAlign: 'left',
          }}
        >
          {testimonials.map((voice) => (
            <blockquote
              key={voice.id}
              style={{
                margin: 0,
                padding: 26,
                borderRadius: 20,
                background: w(0.06),
                border: `1px solid ${w(0.12)}`,
              }}
            >
              <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.55, color: t(0.85) }}>
                {voice.quote}
              </p>
              <footer style={{ marginTop: 16, fontSize: 13.5, color: t(0.6) }}>
                {voice.attribution}
              </footer>
            </blockquote>
          ))}
        </div>
      </Wrap>
    </section>
  )
}

/**
 * Sponsors and partners, scattered around the section title.
 *
 * No fixed-size tiles anywhere: each logo is rendered at its own aspect ratio and
 * given a width, with height following from the image. The seven lockups run from
 * 1.02 to 3.26 wide, so any single box shape necessarily crops some of them —
 * this way nothing is ever cut. Because each logo carries its own brand
 * background, the logo is the card.
 *
 * Below 860px the scatter unpins into a plain two-column grid, since seven
 * floating cards and centred type cannot share a phone's width.
 */
export function Sponsors() {
  const scatterRef = useRef<HTMLDivElement>(null)
  const richMotion = useRichMotion()

  /** slotOf[partnerIndex] = which slot that logo currently occupies. */
  const [slotOf, setSlotOf] = useState<number[]>(() => partners.map((_, i) => i))

  // Only shuffle while the section is actually on screen — otherwise this ticks
  // away unseen for the whole page.
  const [onScreen, setOnScreen] = useState(false)
  useEffect(() => {
    const scatter = scatterRef.current
    if (!scatter) return
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(scatter)
    return () => observer.disconnect()
  }, [])

  // One diagonal exchange every few seconds — see partnerSwapIntervalMs for why it
  // is slow. Skipped entirely under reduced motion, and on narrow screens where the
  // CSS has already flattened the scatter to a grid and positions no longer apply.
  useEffect(() => {
    if (!richMotion || !onScreen) return

    let step = 0
    const timer = window.setInterval(() => {
      const [slotA, slotB] = partnerSwaps[step % partnerSwaps.length]
      step += 1
      setSlotOf((current) => {
        const holderA = current.indexOf(slotA)
        const holderB = current.indexOf(slotB)
        if (holderA === -1 || holderB === -1) return current
        const next = [...current]
        next[holderA] = slotB
        next[holderB] = slotA
        return next
      })
    }, partnerSwapIntervalMs)

    return () => window.clearInterval(timer)
  }, [richMotion, onScreen])

  // A slow drift as the section passes, matching the gallery collage above it.
  useScrollFrame(() => {
    const scatter = scatterRef.current
    if (!scatter) return
    if (!richMotion) {
      scatter.style.transform = ''
      return
    }
    const box = scatter.getBoundingClientRect()
    const distance = Math.max(
      -1,
      Math.min(
        1,
        (box.top + box.height / 2 - window.innerHeight / 2) / window.innerHeight,
      ),
    )
    scatter.style.transform = `scale(${(1 - Math.abs(distance) * 0.04).toFixed(3)})`
  })

  return (
    <section style={{ padding: '84px 0 92px', background: c.ink }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <div ref={scatterRef} className="partners-scatter">
          {partners.map((partner, index) => {
            const slot = partnerSlots[slotOf[index]] ?? partnerSlots[index]
            return (
              <figure
                key={partner.id}
                className="partners-card"
                title={partner.name}
                style={
                  {
                    '--px': `${slot.x}%`,
                    '--py': `${slot.y}%`,
                    '--pw': `${partner.w}%`,
                    '--prx': `${slot.rx}deg`,
                    '--pry': `${slot.ry}deg`,
                    '--prz': `${slot.rz}deg`,
                    '--pz': `${slot.z}px`,
                  } as CSSProperties
                }
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            )
          })}

          <div className="partners-label">
            <div
              style={{
                fontSize: 11,
                letterSpacing: '0.2em',
                fontWeight: 700,
                color: c.lime,
              }}
            >
              SPONSORS &amp; PARTNERS
            </div>
            <h2>Partners</h2>
            <p>
              The people and firms backing {site.edition}. Entry stays free because
              they do.
            </p>
            <a href={`mailto:${site.contact.email}`} className="cta-lime">
              Become a partner
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
