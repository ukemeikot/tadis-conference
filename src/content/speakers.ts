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
    portrait: {
      src: '/assets/speaker-williams-uchemba.jpg',
      thumb: '/assets/sm/speaker-williams-uchemba.jpg',
      objectPosition: 'center top',
    },
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
    portrait: {
      src: '/assets/speaker-jasper-ifeanyi.jpg',
      thumb: '/assets/sm/speaker-jasper-ifeanyi.jpg',
      // Square source in a 4:5 frame — crops at the sides, so stay centred.
      objectPosition: 'center center',
    },
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

/**
 * The panel's shared topic, taken from the "PANELIST REVEAL" fliers, which print
 * it as "Panel Topic" on every panelist's card.
 */
export const panelTopic =
  '“Building the New Africa(n): The Intersection of Human Capital, Content and ' +
  'Enterprise in Re-Engineering the Continent”'

/** Faculty panel, 15:30, main auditorium. Questions taken from the floor. */
export const panelNote =
  'Faculty panel, 15:30, main auditorium. Questions taken from the floor.'

const PANEL_IMAGE_HEIGHT = 360

/**
 * The three announced panelists, each with the role from their reveal flier.
 *
 * The moderator has not been named, so all three are billed as PANELIST rather
 * than one being guessed into the chair.
 */
export const panelists: SpeakerCard[] = [
  {
    id: 'abasiekeme-umana',
    eyebrow: 'PANELIST',
    name: 'Abasiekeme Umana',
    detail: 'Public strategist and policy delivery specialist',
    accent: 'lime',
    portrait: {
      src: '/assets/panelist-abasiekeme-umana.jpg',
      thumb: '/assets/sm/panelist-abasiekeme-umana.jpg',
      objectPosition: 'center 18%',
    },
    imageHeight: PANEL_IMAGE_HEIGHT,
  },
  {
    id: 'rejoice-madara',
    eyebrow: 'PANELIST',
    // Her headshot arrived filed as "REJOICE EKEMINI" but her panelist reveal
    // flier bills her as Rejoice Madara, so the flier wins — see README.
    name: 'Rejoice Madara',
    detail: 'Creative director, Elysian Planet',
    accent: 'lime',
    portrait: {
      src: '/assets/panelist-rejoice-madara.jpg',
      thumb: '/assets/sm/panelist-rejoice-madara.jpg',
      objectPosition: 'center 18%',
    },
    imageHeight: PANEL_IMAGE_HEIGHT,
  },
  {
    id: 'ima-akpan',
    eyebrow: 'PANELIST',
    name: 'Ms. Ima Akpan',
    detail: 'Director, Aimas R-Firm',
    accent: 'lime',
    portrait: {
      src: '/assets/panelist-ima-akpan.jpg',
      thumb: '/assets/sm/panelist-ima-akpan.jpg',
      objectPosition: 'center 18%',
    },
    imageHeight: PANEL_IMAGE_HEIGHT,
  },
]

/**
 * The fireside chat's own topic, printed on each fireside reveal flier. (The
 * fliers label it "Panel Topic", but it is distinct from the panel's.)
 */
export const firesideTopic =
  '“Power UP — Africa’s Youth Skills, Startups and Wealth Creation.”'

export const firesideNote =
  'Two chairs, no slides, 30 minutes. Held in the media and interview lounge.'

/**
 * The four announced fireside chat names, each with the role from their reveal
 * flier. Who hosts and who guests has not been published, so all four are billed
 * uniformly as FIRESIDE CHAT rather than one being guessed into the host's chair.
 */
export const firesideGuests: SpeakerCard[] = [
  {
    id: 'emediong-edem',
    eyebrow: 'FIRESIDE CHAT',
    name: 'Emediong Edem',
    detail: 'Book publishing consultant',
    accent: 'amber',
    portrait: {
      src: '/assets/fireside-emediong-edem.jpg',
      thumb: '/assets/sm/fireside-emediong-edem.jpg',
      objectPosition: 'center 18%',
    },
    imageHeight: PANEL_IMAGE_HEIGHT,
  },
  {
    id: 'miracle-edet',
    eyebrow: 'FIRESIDE CHAT',
    name: 'Miracle Edet',
    detail: 'AI creator · Designer',
    accent: 'amber',
    portrait: {
      src: '/assets/fireside-miracle-edet.jpg',
      thumb: '/assets/sm/fireside-miracle-edet.jpg',
      objectPosition: 'center 18%',
    },
    imageHeight: PANEL_IMAGE_HEIGHT,
  },
  {
    id: 'saviour-udoh',
    eyebrow: 'FIRESIDE CHAT',
    // Flier spells it "Udoh"; the supplied image file said "UDO".
    name: 'Saviour Udoh',
    detail: 'CEO, Sinzu Consult Ltd & KJ2 Energy Resources Ltd',
    accent: 'amber',
    portrait: {
      src: '/assets/fireside-saviour-udoh.jpg',
      thumb: '/assets/sm/fireside-saviour-udoh.jpg',
      objectPosition: 'center 18%',
    },
    imageHeight: PANEL_IMAGE_HEIGHT,
  },
  {
    id: 'utonne-ekefre',
    eyebrow: 'FIRESIDE CHAT',
    name: 'Utonne Ekefre',
    detail: 'CEO, Latonne Signature Shoes',
    accent: 'amber',
    portrait: {
      src: '/assets/fireside-utonne-ekefre.jpg',
      thumb: '/assets/sm/fireside-utonne-ekefre.jpg',
      objectPosition: 'center 18%',
    },
    imageHeight: PANEL_IMAGE_HEIGHT,
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
