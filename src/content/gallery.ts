import type { GalleryTile, Testimonial } from './types'

/**
 * The gallery uses the event's own fliers rather than anonymous portraits — the
 * earlier crops turned out to be named speakers, and a real person's face under
 * "Delegate portrait" is worse than an honest empty tile. Fill the remaining slots
 * with event photography from TADIS 2025 when it is ready.
 */
export const galleryNote =
  'Event photography from TADIS 2025 goes in the empty tiles — send it over and we ' +
  'will drop it in.'

export const gallery: GalleryTile[] = [
  {
    id: 'flier-helen',
    src: '/assets/sm/flier-helen.jpg',
    alt: 'Special guest of honour flier — Lady Helen Eno Obareki',
    columnSpan: 2,
    rowSpan: 2,
    objectPosition: 'center 30%',
    emphasised: true,
  },
  {
    id: 'flier-fela',
    src: '/assets/sm/flier-fela.jpg',
    alt: 'Keynote speaker flier — Fela Durotoye',
    rowSpan: 2,
    objectPosition: 'center top',
    emphasised: true,
  },
  {
    id: 'photo-slot-1',
    alt: 'Event photography to come',
    placeholderLabel: 'PHOTO TO COME',
  },
  {
    id: 'photo-slot-2',
    alt: 'Event photography to come',
    placeholderLabel: 'PHOTO TO COME',
  },
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

/** Empty partner-logo slots shown until real logos arrive. */
export const sponsorSlotCount = 5
