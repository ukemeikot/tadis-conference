import type { CollageTile, Partner, PartnerSlot, Testimonial } from './types'

/**
 * Gallery photography from the network's two previous gatherings — Dream Circle 1.0
 * and Bold Beginnings. Selected from the full shoots for framing, and for showing
 * the room rather than only the stage.
 *
 * They are arranged as one dense overlapping cluster with the section title set
 * large across the middle of it, so the gallery reads as a single object on the
 * page rather than a grid of thumbnails.
 */
export const galleryEyebrow = 'GALLERY · DREAM CIRCLE 1.0 & BOLD BEGINNINGS'

/** Set large across the middle of the cluster, one word per line. */
export const galleryHeadline = ['THE', 'NETWORK', 'SO FAR']

export const galleryNote =
  'Two gatherings, one room at a time. TADIS 2026 is the next one — and the ' +
  'biggest yet.'

const g = (n: number) => `/assets/gallery/${String(n).padStart(2, '0')}.jpg`

/**
 * The pile, laid out to fill the continent silhouette it gets clipped to.
 *
 * The bands taper the way Africa does — full width across the north, narrowing
 * through the middle, down to two tiles at the cape — so the clip has photography
 * behind every part of the shape rather than gaps at the edges. A handful of images
 * repeat in the outer positions, which is invisible once they are cropped by the
 * outline. The last entry sits out in the channel as Madagascar.
 */
export const collage: CollageTile[] = [
  // north coast — the widest band
  { src: g(1), x: 13, y: 9, w: 26, r: -3, z: 2, outer: true },
  { src: g(2), x: 30, y: 7, w: 26, r: 2, z: 3 },
  { src: g(3), x: 47, y: 9, w: 27, r: -2, z: 4 },
  { src: g(4), x: 64, y: 7, w: 26, r: 3, z: 3 },
  { src: g(5), x: 80, y: 10, w: 26, r: -2, z: 2, outer: true },
  { src: g(6), x: 94, y: 14, w: 24, r: 4, z: 1, outer: true },

  // Sahara across to the Red Sea
  { src: g(7), x: 7, y: 26, w: 26, r: 3, z: 3, outer: true },
  { src: g(8), x: 24, y: 24, w: 26, r: -2, z: 5 },
  { src: g(9), x: 41, y: 26, w: 27, r: 1, z: 7 },
  { src: g(10), x: 58, y: 24, w: 27, r: -3, z: 6 },
  { src: g(11), x: 74, y: 26, w: 26, r: 2, z: 4 },
  { src: g(12), x: 90, y: 29, w: 24, r: -2, z: 2, outer: true },

  // the West African bulge through to the Horn — the most visible band
  { src: g(13), x: 9, y: 43, w: 26, r: -2, z: 4, outer: true },
  { src: g(14), x: 26, y: 42, w: 27, r: 2, z: 7 },
  { src: g(15), x: 43, y: 43, w: 28, r: -1, z: 9 },
  { src: g(16), x: 60, y: 42, w: 27, r: 2, z: 8 },
  { src: g(17), x: 76, y: 43, w: 26, r: -3, z: 5 },
  { src: g(18), x: 91, y: 46, w: 24, r: 3, z: 2, outer: true },

  // the basin — narrowing
  { src: g(19), x: 22, y: 60, w: 26, r: 2, z: 5, outer: true },
  { src: g(20), x: 40, y: 59, w: 27, r: -2, z: 8 },
  { src: g(21), x: 57, y: 60, w: 27, r: 1, z: 8 },
  { src: g(22), x: 74, y: 61, w: 26, r: 3, z: 5, outer: true },

  // toward the cape
  { src: g(23), x: 33, y: 76, w: 26, r: -3, z: 5 },
  { src: g(24), x: 50, y: 75, w: 27, r: 2, z: 7 },
  { src: g(25), x: 67, y: 77, w: 26, r: -1, z: 5 },

  // the cape itself
  { src: g(26), x: 45, y: 91, w: 25, r: 2, z: 4 },
  { src: g(27), x: 61, y: 92, w: 25, r: -2, z: 4 },

  // Madagascar
  { src: g(28), x: 92, y: 80, w: 21, r: 3, z: 3, outer: true },
]

/**
 * Confirmed sponsors and partners. `partnerSlotCount` tops the strip up with empty
 * tiles so the row stays balanced while more come in.
 */
export const partners: Partner[] = [
  {
    id: 'paul-udah-leadership-firm',
    name: 'Paul Udah Leadership Firm',
    logo: '/assets/partner-paul-udah-leadership-firm.jpg',
    w: 15,
  },
  {
    id: 'credian-tech',
    name: 'CredianTech',
    logo: '/assets/partner-credian-tech.jpg',
    w: 21,
  },
  {
    id: 'gog-advantage',
    name: 'The GOG Advantage — Media, Tech, General Services',
    logo: '/assets/partner-gog-advantage.jpg',
    w: 25,
  },
  {
    id: 'uforo-abia',
    name: 'Uforo Abia',
    logo: '/assets/partner-uforo-abia.jpg',
    w: 14,
  },
  {
    id: 'purpose-academy',
    name: 'The Purpose Academy',
    logo: '/assets/partner-purpose-academy.jpg',
    w: 20,
  },
  {
    // Jasper Ifeanyi's firm — he speaks as well, which is why his stage card is
    // badged SPEAKER · SPONSOR.
    id: 'success-haven',
    name: 'Success Haven Group',
    logo: '/assets/partner-success-haven.jpg',
    w: 21,
  },
  {
    // The venue.
    id: 'insight-bible-church',
    name: 'Insight Bible Church',
    logo: '/assets/partner-insight-bible-church.jpg',
    w: 14,
  },
]

/**
 * The seven positions logos occupy, clear of the middle where the title sits.
 *
 * Kept inside x 16–84 and y 16–84 so that the widest lockup still fits inside the
 * box whichever slot it lands in — the logos shuffle between these, so no slot can
 * assume it holds a narrow one.
 */
export const partnerSlots: PartnerSlot[] = [
  // Top row leans back; bottom row leans forward. Yaw always turns the card toward
  // the middle, so the whole arrangement addresses the title.
  { x: 18, y: 19, rx: -15, ry: 17, rz: -6, z: 0 }, //   0 top left
  { x: 50, y: 15, rx: -12, ry: -6, rz: 4, z: 30 }, //   1 top centre
  { x: 82, y: 19, rx: -15, ry: -18, rz: -3, z: -10 }, // 2 top right
  { x: 17, y: 57, rx: 4, ry: 21, rz: 5, z: 18 }, //     3 mid left
  { x: 83, y: 57, rx: 4, ry: -21, rz: -5, z: 18 }, //   4 mid right
  { x: 30, y: 84, rx: 16, ry: 14, rz: 3, z: -6 }, //    5 bottom left
  { x: 70, y: 84, rx: 15, ry: -15, rz: -4, z: 4 }, //   6 bottom right
]

/**
 * Which slots trade places, in order, one pair per tick. Every pair crosses the
 * middle of the box so each move reads as a diagonal exchange rather than a nudge.
 */
export const partnerSwaps: ReadonlyArray<readonly [number, number]> = [
  [0, 6],
  [2, 5],
  [3, 4],
  [1, 6],
  [0, 4],
  [2, 3],
  [1, 5],
]

/** Headline quote on the deep-green voices band. */
export const featuredTestimonial: Testimonial = {
  id: 'featured',
  quote:
    '“I came to listen and left with a plan, a co-founder and a reason to stay ' +
    'on the continent.”',
  attribution:
    'Delegate, TADIS 2025 — placeholder quote, to be replaced with a real testimonial',
}

export const testimonials: Testimonial[] = [
  {
    id: 'voice-1',
    quote:
      '“The master class on enterprise changed how I price my work. Placeholder copy.”',
    attribution: 'Name, organisation — to be confirmed',
  },
  {
    id: 'voice-2',
    quote:
      '“Every young person in Akwa Ibom should sit in this hall once. Placeholder copy.”',
    attribution: 'Name, organisation — to be confirmed',
  },
]

