/**
 * Shapes for the site's editorial content.
 *
 * Content lives in `src/content/*` as plain typed data, separate from the
 * components that render it. Updating a speaker's name, a session time or an FAQ
 * answer is then a one-line data edit — no JSX to pick through — and the types
 * make an incomplete entry a build error rather than a blank space on the page.
 */

export type NavItem = {
  id: string
  label: string
}

/* ---------------------------------- about --------------------------------- */

export type AboutPanel = {
  id: string
  /** "01 / THE SUMMIT" */
  index: string
  /** Panel background tint. */
  tint: 'green' | 'teal' | 'rust' | 'deep'
  centred?: boolean
  /** Large display heading, when the panel leads with one. */
  heading?: string
  /** Pull quote set at display size. */
  quote?: string
  body?: string
  /** The "why attend" panel renders these instead of prose. */
  reasons?: { number: string; title: string; body: string }[]
  cta?: { label: string; href: string }
}

/* --------------------------------- speakers -------------------------------- */

export type SpeakerAccent = 'gold' | 'lime' | 'amber'

/** "08:30" / "OPENING PLENARY" pairs under a stage speaker's name. */
export type SessionDetail = {
  value: string
  label?: string
}

export type Portrait = {
  src: string
  /** Smaller crop for cards, rails and video posters. */
  thumb: string
  /** CSS object-position, so faces stay in frame at every crop. */
  objectPosition?: string
  /** Letterbox colour behind a transparent or short image. */
  background?: string
}

/**
 * A speaker with a full scroll-driven stage row.
 *
 * `side` is which column the portrait sits in at desktop; the copy takes the
 * other. On mobile the CSS collapses both into one column, portrait first.
 */
export type StageSpeaker = {
  id: string
  name: string
  eyebrow: string
  /** Solid gold pill for the headline keynote, outlined for the rest. */
  eyebrowStyle: 'solid' | 'outline'
  accent: SpeakerAccent
  role: string
  /** Session title, rendered as a lime pull quote. */
  sessionTitle?: string
  biography?: string
  session: SessionDetail[]
  side: 'left' | 'right'
  /** Omit while we are still waiting on a photo — the card shows a placeholder. */
  portrait?: Portrait
  /** `SessionRecording.id` of their talk, when we know where it sits in the streams. */
  recording?: string
  /** Card border tint. */
  border: 'gold' | 'lime'
}

/** A panel, fireside or moderator card in a grid. */
export type SpeakerCard = {
  id: string
  eyebrow: string
  name: string
  /** Role or specialism. Omit rather than invent one when it is not confirmed. */
  detail?: string
  accent: SpeakerAccent
  portrait?: Portrait
  /** Fireside host cards carry a warm gradient. */
  emphasised?: boolean
  imageHeight: number
}

/* -------------------------------- programme -------------------------------- */

export type SlotEmphasis = 'plain' | 'gold' | 'rust' | 'green'

export type ProgrammeSlot = {
  id: string
  /** "08:30" — 24h, as printed. */
  time: string
  title: string
  description?: string
  /** Small-caps flag above the title, e.g. "OPENING KEYNOTE · CONFIRMED". */
  eyebrow?: string
  /** Who leads it, when that is settled. */
  attribution?: string
  emphasis: SlotEmphasis
  /** Parallel rooms, for the master-class block. */
  rooms?: string[]
}

/* ------------------------------ gallery / FAQ ------------------------------ */

/**
 * One photo in the gallery collage.
 *
 * Positions are percentages of the collage box and refer to the tile's **centre**,
 * which makes the cluster far easier to tune by hand than corner offsets would.
 */
export type CollageTile = {
  src: string
  /** Centre, as % from the left edge. */
  x: number
  /** Centre, as % from the top edge. */
  y: number
  /** Width as % of the box. */
  w: number
  /** Rotation in degrees — small values only; this is a pile, not a fan. */
  r: number
  /** Stacking order. Higher tiles sit nearer the middle of the pile. */
  z: number
  /** Outer-ring tiles, dropped on narrow screens so the cluster stays dense. */
  outer?: boolean
  /** Singled out: larger, ringed, and always on top of the pile. */
  feature?: boolean
  /** Only set on a feature tile — the rest of the pile is decorative. */
  alt?: string
}

/**
 * A sponsor or partner logo.
 *
 * Each logo arrives on its own brand background rather than as a transparent
 * mark, so a logo *is* its card. It is rendered at its natural aspect ratio and
 * never placed in a fixed-height box: the seven lockups range from 1.02 to 3.26
 * wide, and any single box shape crops some of them.
 */
export type Partner = {
  id: string
  name: string
  logo: string
  url?: string
  /**
   * Width as % of the scatter box. Travels with the logo when it changes slots —
   * a 3.26:1 lockup needs roughly twice the width of a square one to read at the
   * same optical size, and would overflow the box if it inherited a square slot's
   * width.
   */
  w: number
}

/**
 * A position in the partners scatter. Logos are assigned to slots and swap between
 * them, so the arrangement stays balanced however they are shuffled.
 *
 * Orientation is a property of the slot rather than the logo: cards are angled in
 * 3D to face the title in the middle, so a card's tilt depends on where it sits,
 * not on which logo it happens to be showing.
 */
export type PartnerSlot = {
  /** Centre, as % of the box. */
  x: number
  y: number
  /** Pitch, in degrees. Negative leans the top of the card away from the viewer. */
  rx: number
  /** Yaw, in degrees. Turns the card toward the centre of the box. */
  ry: number
  /** Roll, in degrees — the flat rotation that keeps the pile informal. */
  rz: number
  /** Depth in px. Cards nearer the viewer read larger and cast more shadow. */
  z: number
}

export type Testimonial = {
  id: string
  quote: string
  attribution: string
  /** A second line under the name — role, organisation. */
  role?: string
  /** The full message, one entry per paragraph, when there is more than the pull quote. */
  body?: string[]
}

/* --------------------------------- recap ---------------------------------- */

/** One of the two YouTube livestreams the day was broadcast on. */
export type Stream = {
  id: 'part1' | 'part2'
  label: string
  youtubeId: string
  /** Running time in seconds, as YouTube reports it. */
  seconds: number
  /**
   * Our own still for the card. YouTube serves the same thumbnail for both
   * streams, so its image cannot tell them apart.
   */
  poster: string
}

/**
 * A session's place inside a livestream.
 *
 * The streams have no chapters, so each `start` was found by reading the
 * on-screen name cards the broadcast shows before each speaker.
 */
export type SessionRecording = {
  id: string
  title: string
  who: string
  stream: Stream['id']
  /** Seconds into the stream. */
  start: number
  /** Seconds into the stream where it ends, when that is known. */
  end?: number
  thumb: string
  objectPosition?: string
}

/** One photo in the full gallery, as listed in photoArchive.json. */
export type ArchivePhoto = {
  id: number
  album: 'hall' | 'shoot' | 'carpet'
  /** Size of the viewer image. */
  w: number
  h: number
}

export type PhotoAlbum = {
  id: string
  /** Which photos in the archive came from this album. */
  archiveKey: ArchivePhoto['album']
  label: string
  /** Who shot it, or what is in it. */
  detail: string
  url: string
}

/**
 * One stop on the memory walk. Signs are chapter markers down the centre line;
 * everything else alternates left and right of it.
 */
export type MemoryItem =
  | { kind: 'sign'; id: string; label: string; title: string }
  | {
      kind: 'photo'
      id: string
      side: 'L' | 'R'
      src: string
      caption: string
      meta: string
      tilt: number
      objectPosition?: string
    }
  | {
      kind: 'clip'
      id: string
      side: 'L' | 'R'
      src: string
      poster: string
      caption: string
      meta: string
      tilt: number
    }
  | { kind: 'session'; id: string; side: 'L' | 'R'; session: string }
  | { kind: 'end'; id: string }

export type Letter = {
  greeting: string
  paragraphs: string[]
  closing: string
  name: string
  role: string
  organisation: string
  portrait: string
}

export type FaqItem = {
  id: string
  question: string
  answer: string
  /** Rendered as a mailto link appended to the answer. */
  contactEmail?: string
  /** Text that follows the mailto link. */
  afterEmail?: string
  /** An in-page link appended to the answer. */
  link?: { href: string; label: string }
  openByDefault?: boolean
}
