import type { RevealCard, SpeakerCard, StageSpeaker } from './types'

/**
 * Speakers with a full scroll-driven stage row.
 *
 * Order is by standing, not by time of day: Special Guest of Honour, then the
 * opening keynote, then the speakers, and the convener closes. The chronological
 * view lives in the programme section instead.
 *
 * Roles and topics are transcribed from the official "SPEAKER REVEAL" fliers,
 * which are the published source of truth. Note the fliers all print 8:30 AM —
 * that is the summit's start time, not each speaker's slot, so `session` is left
 * empty rather than filled with a time that is not really theirs.
 *
 * `side` alternates down the stage, so it has to be re-checked whenever the order
 * changes: the timeline runs down the centre and the portraits sit either side of
 * it, with the copy opposite.
 *
 * Photo policy: a real portrait only ever appears next to a real name. Anyone still
 * "To be announced" gets a dashed placeholder instead of a stand-in face — two of
 * the uploaded photos turned out to be named speakers who had been placed under
 * anonymous cards, and the site is public.
 */
export const stageSpeakers: StageSpeaker[] = [
  {
    id: 'helen-obareki',
    name: 'Lady Helen Eno Obareki',
    eyebrow: 'SPECIAL GUEST OF HONOUR',
    eyebrowStyle: 'outline',
    accent: 'gold',
    role: 'Coordinator, Office of the First Lady, Akwa Ibom State',
    sessionTitle: '“Re-engineering The Hearts Of The African Girl Child.”',
    session: [
      { value: '10:45', label: 'GUEST SESSION' },
      { value: '45 MIN', label: 'MAIN AUDITORIUM' },
    ],
    side: 'left',
    portrait: {
      src: '/assets/speaker-helen-obareki.jpg',
      thumb: '/assets/sm/speaker-helen-obareki.jpg',
      // Source is exactly 4:5, so the frame fits it with no cropping.
      objectPosition: 'center top',
    },
    border: 'gold',
  },
  {
    id: 'fela-durotoye',
    name: 'Fela Durotoye',
    eyebrow: 'KEYNOTE SPEAKER',
    eyebrowStyle: 'solid',
    accent: 'gold',
    role: 'Founder / CEO, Gemstone Group · 🇳🇬 Nigeria',
    sessionTitle: '“Re-engineering the African Mindset, You are not enough”',
    session: [
      { value: '08:30', label: 'OPENING PLENARY' },
      { value: '60 MIN', label: 'MAIN AUDITORIUM' },
    ],
    side: 'right',
    portrait: {
      src: '/assets/speaker-fela-durotoye.jpg',
      thumb: '/assets/sm/speaker-fela-durotoye.jpg',
      objectPosition: 'center top',
    },
    border: 'gold',
  },
  {
    id: 'onofiok-luke',
    name: 'Rt. Hon. Onofiok Luke Ph.D',
    eyebrow: 'SPEAKER',
    eyebrowStyle: 'outline',
    accent: 'lime',
    role: 'Legislative & policy advisor · 🇳🇬 Nigeria',
    sessionTitle:
      '“From Dependency to Destiny: Building an Africa That Can Build Itself.”',
    session: [],
    side: 'left',
    // Portrait to come.
    border: 'lime',
  },
  {
    id: 'williams-uchemba',
    name: 'Williams Uchemba',
    eyebrow: 'SPEAKER',
    eyebrowStyle: 'outline',
    accent: 'lime',
    role: 'Founder, Williams Uchemba Foundation · 🇳🇬 Nigeria',
    sessionTitle: '“Influence, Media and Africa”',
    session: [],
    side: 'right',
    // Portrait to come.
    border: 'lime',
  },
  {
    id: 'paul-udah',
    name: 'Paul Udah',
    eyebrow: 'SPEAKER',
    eyebrowStyle: 'outline',
    accent: 'lime',
    role: 'Pan-Africa leadership educator, Paul Udah Leadership Firm',
    sessionTitle: '“African Youth Alignment for Personal and Global Impact”',
    session: [],
    side: 'left',
    portrait: {
      src: '/assets/speaker-paul-udah.jpg',
      thumb: '/assets/sm/speaker-paul-udah.jpg',
      // Square source in a 4:5 frame — crops at the sides, so stay centred.
      objectPosition: 'center center',
    },
    border: 'lime',
  },
  {
    id: 'aniekan-usoroh',
    name: 'Aniekan Usoroh',
    eyebrow: 'SPEAKER',
    eyebrowStyle: 'outline',
    accent: 'lime',
    role: 'Leadership strategist · Executive consultant · 🇳🇬 Nigeria',
    sessionTitle: '“Amplifying Africa’s Value”',
    biography:
      '23 years across banking, public-sector reform, healthcare financing and ' +
      'telecoms. Creator and host of The CONNECT, now in its 6th year and past ' +
      '230 episodes.',
    session: [],
    side: 'right',
    portrait: {
      src: '/assets/speaker-aniekan-usoroh.jpg',
      thumb: '/assets/sm/speaker-aniekan-usoroh.jpg',
      objectPosition: 'center top',
    },
    border: 'lime',
  },
  {
    id: 'jasper-ifeanyi',
    name: 'Jasper Ifeanyi',
    eyebrow: 'SPEAKER · SPONSOR',
    eyebrowStyle: 'outline',
    accent: 'lime',
    role: 'CEO & co-founder, Success Haven · 🇳🇬 Nigeria',
    sessionTitle:
      '“Monetization Structures For Purpose Sustenance: Structures For Wealth ' +
      'Creation in Purposes.”',
    session: [],
    side: 'left',
    // Portrait to come.
    border: 'lime',
  },
  {
    id: 'emanamfron-akpan',
    name: 'Emanamfron Akpan',
    eyebrow: 'CONVENER',
    eyebrowStyle: 'outline',
    accent: 'lime',
    role: 'The African Dream Network',
    biography: 'Welcome address and the state of the network.',
    session: [{ value: '10:00', label: 'WELCOME ADDRESS' }],
    side: 'right',
    portrait: {
      src: '/assets/speaker-emanamfron-akpan.jpg',
      thumb: '/assets/sm/speaker-emanamfron-akpan.jpg',
      objectPosition: 'center top',
    },
    border: 'lime',
  },
]

/** Faculty panel, 15:30, main auditorium. Names still to be announced. */
export const panelists: SpeakerCard[] = [
  {
    id: 'panelist-1',
    eyebrow: 'PANELIST',
    name: 'To be announced',
    detail: 'Enterprise and capital',
    accent: 'lime',
    imageHeight: 300,
  },
  {
    id: 'panelist-2',
    eyebrow: 'PANELIST',
    name: 'To be announced',
    detail: 'Civic reform and governance',
    accent: 'lime',
    imageHeight: 300,
  },
  {
    id: 'panelist-3',
    eyebrow: 'PANELIST',
    name: 'To be announced',
    detail: 'The creative economy',
    accent: 'lime',
    imageHeight: 300,
  },
  {
    id: 'moderator',
    eyebrow: 'MODERATOR',
    name: 'To be announced',
    detail: 'Chairs the panel',
    accent: 'lime',
    imageHeight: 300,
  },
]

/** Two chairs, no slides, 30 minutes — in the media and interview lounge. */
export const firesideGuests: SpeakerCard[] = [
  {
    id: 'fireside-host',
    eyebrow: 'HOST',
    name: 'To be announced',
    detail: 'Leads both fireside sessions',
    accent: 'amber',
    emphasised: true,
    imageHeight: 320,
  },
  {
    id: 'fireside-guest-1',
    eyebrow: 'GUEST',
    name: 'To be announced',
    detail: 'Session 1 · 13:00',
    accent: 'amber',
    imageHeight: 320,
  },
  {
    id: 'fireside-guest-2',
    eyebrow: 'GUEST',
    name: 'To be announced',
    detail: 'Session 2 · 16:15',
    accent: 'amber',
    imageHeight: 320,
  },
]

/**
 * The horizontal rail of speakers still to be revealed. Each card is a slot
 * waiting on a name, a title and a portrait.
 */
export const reveals: RevealCard[] = [
  { id: 'reveal-05', label: 'Reveal 05', caption: 'Name and title to be confirmed' },
  { id: 'reveal-06', label: 'Reveal 06', caption: 'Name and title to be confirmed' },
  { id: 'reveal-07', label: 'Reveal 07', caption: 'Name and title to be confirmed' },
  { id: 'reveal-08', label: 'Reveal 08', caption: 'Name and title to be confirmed' },
  { id: 'reveal-09', label: 'Reveal 09', caption: 'Name and title to be confirmed' },
  { id: 'reveal-10', label: 'Reveal 10', caption: 'Name and title to be confirmed' },
  { id: 'reveal-11', label: 'Reveal 11', caption: 'Name and title to be confirmed' },
  {
    id: 'reveal-12',
    label: 'Reveal 12',
    caption: 'Awaiting assets',
    invitation: {
      title: 'Your speaker here',
      body: 'Send us the portrait, name, title and topic.',
    },
  },
]

/** Counts shown as filter chips under the speakers heading. */
export const facultyCounts = {
  mainStage: stageSpeakers.length,
  panel: panelists.length,
  fireside: firesideGuests.length,
} as const
