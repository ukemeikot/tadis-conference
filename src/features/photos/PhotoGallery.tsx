import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { photoAlbums, photoArchive, photoLarge, photoThumb } from '../../content'
import type { ArchivePhoto } from '../../content/types'
import { site } from '../../shared/config/site'
import { c, t } from '../../shared/config/theme'
import { useRichMotion } from '../../shared/hooks/useMotion'
import { requestScrollFrame, useScrollFrame } from '../../shared/hooks/useScrollFrame'
import { Eyebrow, Heading, Wrap } from '../../shared/ui'

/** How many thumbnails each "Show more" adds. Keeps the DOM, and the per-frame
 *  3D pass, to what someone is plausibly scrolling through. */
const PAGE = 48

type Filter = 'all' | ArchivePhoto['album']

const albumFor = (key: ArchivePhoto['album']) => photoAlbums.find((a) => a.archiveKey === key)

/**
 * Every photo from the day. The thumbnails sit on a drum: rows tilt back and
 * recede as they move away from the middle of the screen, the same scroll-driven
 * depth as the speaker stage. Clicking one opens it full screen.
 */
export function PhotoGallery() {
  const richMotion = useRichMotion()
  const gridRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<Filter>('all')
  const [shown, setShown] = useState(PAGE)
  const [open, setOpen] = useState<number | null>(null)

  const photos = useMemo(
    () => (filter === 'all' ? photoArchive : photoArchive.filter((p) => p.album === filter)),
    [filter],
  )
  const visible = photos.slice(0, shown)

  // Only work while the grid is near the screen. Without this the handler ran on
  // every scroll frame of the page, and its layout reads — straight after other
  // sections had written their styles — forced a full relayout each frame.
  const near = useRef(false)
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        near.current = entry.isIntersecting
        if (entry.isIntersecting) requestScrollFrame()
      },
      { rootMargin: '50% 0px' },
    )
    observer.observe(grid)
    return () => observer.disconnect()
  }, [])

  // Each tile's centre within the grid, measured once per layout rather than per
  // frame. Cleared whenever the tile set or the viewport changes.
  const centres = useRef<number[] | null>(null)
  useEffect(() => {
    centres.current = null
    requestScrollFrame()
  }, [visible.length, filter])
  useEffect(() => {
    const reset = () => (centres.current = null)
    window.addEventListener('resize', reset)
    return () => window.removeEventListener('resize', reset)
  }, [])

  useScrollFrame(() => {
    const grid = gridRef.current
    if (!grid || !near.current) return
    const tiles = grid.children as HTMLCollectionOf<HTMLElement>
    if (!richMotion) {
      for (const tile of tiles) if (tile.style.transform) tile.style.transform = ''
      return
    }
    if (!centres.current) {
      centres.current = Array.from(tiles, (tile) => tile.offsetTop + tile.offsetHeight / 2)
    }
    const vh = window.innerHeight
    const gridTop = grid.getBoundingClientRect().top
    // The vanishing point tracks the middle of the screen, not the middle of a
    // grid that may be several screens tall.
    grid.style.perspectiveOrigin = `50% ${(vh / 2 - gridTop).toFixed(0)}px`
    for (let i = 0; i < tiles.length; i++) {
      const tile = tiles[i]
      const centre = gridTop + centres.current[i]
      if (centre < -vh * 0.5 || centre > vh * 1.5) continue
      const d = Math.max(-1.2, Math.min(1.2, (centre - vh / 2) / (vh * 0.75)))
      tile.style.transform =
        `rotateX(${(-d * 22).toFixed(2)}deg) ` +
        `translateZ(${(-Math.abs(d) * 140).toFixed(0)}px) ` +
        `translateY(${(d * 18).toFixed(0)}px)`
    }
  })

  const counts = useMemo(() => {
    const tally: Record<string, number> = { all: photoArchive.length }
    for (const p of photoArchive) tally[p.album] = (tally[p.album] ?? 0) + 1
    return tally
  }, [])

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All' },
    ...photoAlbums.map((a) => ({ key: a.archiveKey, label: a.label })),
  ]

  return (
    <section
      id="photos"
      style={{
        position: 'relative',
        padding: '100px 0 110px',
        background: `linear-gradient(180deg, ${c.ink}, ${c.forest} 60%, ${c.ink})`,
        overflow: 'hidden',
      }}
    >
      <Wrap>
        <div
          style={{
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'space-between',
            gap: 28,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <Eyebrow>EVERY PHOTO · {site.edition}</Eyebrow>
            <Heading size="md" style={{ margin: '16px 0 0', letterSpacing: '-0.03em' }}>
              The full gallery
            </Heading>
          </div>
          <p style={{ margin: 0, maxWidth: '42ch', fontSize: 16, lineHeight: 1.6, color: t(0.66) }}>
            All {photoArchive.length} photos from the day&apos;s three albums. Tap any of
            them to see it full size.
          </p>
        </div>

        <div role="tablist" aria-label="Filter by album" className="photo-filters">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={filter === f.key}
              onClick={() => {
                setFilter(f.key)
                setShown(PAGE)
              }}
              className="photo-filter"
            >
              {f.label}
              <span>{counts[f.key]}</span>
            </button>
          ))}
        </div>
      </Wrap>

      <div className="photo-stage">
        <div ref={gridRef} className="photo-grid">
          {visible.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              className="photo-tile"
              onClick={() => setOpen(index)}
              aria-label={`Open photo ${index + 1} of ${photos.length}`}
            >
              <img
                src={photoThumb(photo)}
                alt=""
                loading="lazy"
                decoding="async"
                width={photo.w}
                height={photo.h}
              />
            </button>
          ))}
        </div>
      </div>

      <Wrap style={{ textAlign: 'center', marginTop: 40 }}>
        {shown < photos.length ? (
          <button type="button" className="cta-lime photo-more" onClick={() => setShown((n) => n + PAGE)}>
            Show more · {photos.length - shown} to go
          </button>
        ) : (
          <p style={{ margin: 0, fontSize: 14.5, color: t(0.55) }}>
            That is every photo{filter === 'all' ? '' : ' in this album'}.
          </p>
        )}
      </Wrap>

      {open !== null && (
        <Lightbox
          photos={photos}
          index={open}
          onIndex={(i) => {
            setOpen(i)
            // Keep the grid ahead of the viewer, so closing lands on a real tile.
            if (i >= shown) setShown(Math.ceil((i + 1) / PAGE) * PAGE)
          }}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  )
}

/** Full-screen viewer: arrows, swipe, Escape; the photo swings in on a turn. */
function Lightbox({
  photos,
  index,
  onIndex,
  onClose,
}: {
  photos: ArchivePhoto[]
  index: number
  onIndex: (index: number) => void
  onClose: () => void
}) {
  const photo = photos[index]
  const album = albumFor(photo.album)
  const closeRef = useRef<HTMLButtonElement>(null)
  const swipe = useRef<number | null>(null)
  const [direction, setDirection] = useState(1)

  const go = useCallback(
    (step: number) => {
      setDirection(step)
      onIndex((index + step + photos.length) % photos.length)
    },
    [index, onIndex, photos.length],
  )

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
      opener?.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      else if (event.key === 'ArrowRight') go(1)
      else if (event.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  // Warm the neighbours so stepping through feels instant.
  useEffect(() => {
    for (const step of [1, -1]) {
      const next = photos[(index + step + photos.length) % photos.length]
      new Image().src = photoLarge(next)
    }
  }, [index, photos])

  const onPointerDown = (event: ReactPointerEvent) => {
    swipe.current = event.clientX
  }
  const onPointerUp = (event: ReactPointerEvent) => {
    if (swipe.current === null) return
    const dx = event.clientX - swipe.current
    swipe.current = null
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="lightbox"
      onClick={(event) => event.target === event.currentTarget && onClose()}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <figure className="lightbox-figure" style={{ margin: 0 }}>
        <img
          key={photo.id}
          src={photoLarge(photo)}
          alt={`Photo ${index + 1} of ${photos.length}${album ? `, from ${album.label}` : ''}`}
          className="lightbox-image"
          data-direction={direction > 0 ? 'next' : 'prev'}
          style={{ aspectRatio: `${photo.w} / ${photo.h}` }}
        />
        <figcaption
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            marginTop: 14,
            fontSize: 14,
            color: t(0.7),
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: c.gold }}>
            {index + 1} / {photos.length}
          </span>
          {album && (
            <a href={album.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700 }}>
              {album.label} · full album ↗
            </a>
          )}
        </figcaption>
      </figure>

      <button ref={closeRef} type="button" className="lightbox-btn lightbox-close" onClick={onClose} aria-label="Close">
        ✕
      </button>
      <button type="button" className="lightbox-btn lightbox-prev" onClick={() => go(-1)} aria-label="Previous photo">
        ‹
      </button>
      <button type="button" className="lightbox-btn lightbox-next" onClick={() => go(1)} aria-label="Next photo">
        ›
      </button>
    </div>
  )
}
