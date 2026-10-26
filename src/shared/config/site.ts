/**
 * Standing facts about the summit — the things repeated in the hero, the
 * programme header, the contact block and the footer.
 * Change the date or venue here and every mention follows.
 */
export const site = {
  edition: 'TADIS 2026',
  organisation: 'The African Dream Network',
  summitName: 'The African Dream Network International Summit',
  theme: 'Re-Engineering Africa',
  tagline: 'Dream. Lead. Transform.',

  dateLabel: 'Saturday, 3 October 2026',
  shortDateLabel: '3 October 2026',
  /** The summit has happened — this is how the site dates it. */
  heldLabel: 'Held 3 October 2026',

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
