/**
 * Standing facts about the summit — the things repeated in the hero, the
 * programme header, the registration steps, the contact block and the footer.
 * Change the date or venue here and every mention follows.
 */
export const site = {
  edition: 'TADIS 2026',
  organisation: 'The African Dream Network',
  summitName: 'The African Dream Network International Summit',
  theme: 'Re-Engineering Africa',
  tagline: 'Dream. Lead. Transform.',

  /** ISO 8601 with the West Africa offset — the opening keynote. */
  startsAt: '2026-10-03T08:30:00+01:00',
  /** Doors and accreditation. */
  doorsOpen: '08:00',
  dateLabel: 'Saturday, 3 October 2026',
  timeLabel: '8:30 AM',
  shortDateLabel: '3 October 2026',

  venue: {
    name: 'Insight Bible Church',
    street: '227 Nsikak Eduok Avenue',
    city: 'Uyo',
    state: 'Akwa Ibom State',
    country: 'Nigeria',
  },

  contact: {
    email: 'theafricandreamnetwork2025@gmail.com',
    phones: [
      { display: '+234 906 748 3285', tel: '+2349067483285' },
      { display: '+234 907 536 6436', tel: '+2349075366436' },
    ],
  },

  entry: {
    isFree: true,
    registrationRequired: true,
    note: 'ENTRY FREE · REGISTRATION COMPULSORY',
  },

  /**
   * Registration runs on Luma, so the site never collects delegate details
   * itself — every "Register free" trigger opens Luma's own flow in an overlay
   * and Luma issues the ticket and QR code that check-in scans.
   *
   * `eventId` is the Luma api_id, found on the event's manage page under
   * More → Embed Registration Button. `eventUrl` is the plain link, used as the
   * fallback if the embed script is blocked or fails to load.
   */
  luma: {
    eventId: 'evt-6WLDjZNj4VL6gnh',
    eventUrl: 'https://luma.com/xpbcg8ks',
    /** Questions Luma asks, listed on the page so delegates know what to expect. */
    questions: [
      'Your name, email and phone number',
      'Why you want to attend',
      'Which area of Africa you would re-engineer',
      'How you heard about Re-Engineering Africa',
    ],
  },

  vision:
    'To lead Africa’s awakening by uniting emerging youth for a self-sustaining continent.',
  mission:
    'To forge a generation of visionary African youths who will shape the continent through innovation, purpose, and unity.',
} as const

/** "Insight Bible Church, 227 Nsikak Eduok Avenue, Uyo, Akwa Ibom State" */
export const fullAddress = [
  site.venue.name,
  site.venue.street,
  site.venue.city,
  site.venue.state,
].join(', ')

/** Two-line address for the footer and confirmation panel. */
export const addressLines = [
  site.venue.name,
  site.venue.street,
  `${site.venue.city}, ${site.venue.state}`,
] as const
