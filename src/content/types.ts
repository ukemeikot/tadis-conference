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

export type RevealCard = {
  id: string
  label: string
  caption: string
  portrait?: Pick<Portrait, 'thumb' | 'objectPosition' | 'background'>
  /** The final card is an open invitation rather than a person. */
  invitation?: { title: string; body: string }
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

/* ---------------------------------- venue ---------------------------------- */

export type VenueZone = {
  number: string
  name: string
  detail: string
  geometry: {
    left?: string
    right?: string
    top?: string
    bottom?: string
    width: string
    height: string
  }
  gradient: string
  border: string
  numberColor: string
  numberSize: number
  /** Resting depth in px. */
  depth: number
  /** Depth on hover in px. */
  liftedDepth: number
}

/* ------------------------------ gallery / FAQ ------------------------------ */

export type GalleryTile = {
  id: string
  /** Omit for an empty tile awaiting event photography. */
  src?: string
  alt: string
  /** Shown instead of an image when `src` is omitted. */
  placeholderLabel?: string
  columnSpan?: number
  rowSpan?: number
  objectPosition?: string
  emphasised?: boolean
}

export type Testimonial = {
  id: string
  quote: string
  attribution: string
}

export type FaqItem = {
  id: string
  question: string
  answer: string
  /** Rendered as a mailto link appended to the answer. */
  contactEmail?: string
  openByDefault?: boolean
}
