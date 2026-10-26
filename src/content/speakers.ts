import type { SpeakerCard, StageSpeaker } from './types'

/**
 * Speakers with a full scroll-driven stage row.
 *
 * Order is by standing, not by time of day: Special Guest of Honour, then the
 * keynote, then the speakers, and the convener closes. The order things actually
 * ran in is on the memory walk and in the recordings.
 *
 * Roles and topics are transcribed from the official "SPEAKER REVEAL" fliers,
 * which are the published source of truth. No slot times are printed: the
 * running order moved on the day, so `recording` — where each talk sits in the
 * livestreams — is the reliable pointer, and `session` is left empty.
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
    recording: 'helen-obareki',
    name: 'Lady Helen Eno Obareki',
    eyebrow: 'SPECIAL GUEST OF HONOUR',
    eyebrowStyle: 'outline',
    accent: 'gold',
    role: 'Coordinator, Office of the First Lady, Akwa Ibom State',
    sessionTitle: '“Re-engineering The Hearts Of The African Girl Child.”',
    session: [],
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
    recording: 'fela-durotoye',
    name: 'Fela Durotoye',
    eyebrow: 'KEYNOTE SPEAKER',
    eyebrowStyle: 'solid',
    accent: 'gold',
    role: 'Founder / CEO, Gemstone Group · 🇳🇬 Nigeria',
    sessionTitle: '“Re-engineering the African Mindset, You are not enough”',
    session: [],
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
    portrait: {
      src: '/assets/speaker-onofiok-luke.jpg',
      thumb: '/assets/sm/speaker-onofiok-luke.jpg',
      // 2:3 source in a 4:5 frame — crops top and bottom, so hold the face high.
      objectPosition: 'center 12%',
    },
    border: 'lime',
  },
  {
    id: 'williams-uchemba',
    recording: 'williams-uchemba',
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
    recording: 'paul-udah',
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
    recording: 'aniekan-usoroh',
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
    recording: 'jasper-ifeanyi',
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
    id: 'emanamfon-akpan',
    recording: 'emanamfon-akpan',
    name: 'Emanamfon Akpan',
    eyebrow: 'CONVENER',
    eyebrowStyle: 'outline',
    accent: 'lime',
    role: 'The African Dream Network',
    biography:
      'Closed the day with the charge to the room — and wrote the letter of thanks ' +
      'near the top of this page.',
    session: [],
    side: 'right',
    portrait: {
      src: '/assets/speaker-emanamfon-akpan.jpg',
      thumb: '/assets/sm/speaker-emanamfon-akpan.jpg',
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

export const panelNote =
  'Faculty panel in the main auditorium, with questions taken from the floor.'

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
  'No slides, just conversation — held on the main stage in the second half of the day.'

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

/** Counts shown as filter chips under the speakers heading. */
export const facultyCounts = {
  mainStage: stageSpeakers.length,
  panel: panelists.length,
  fireside: firesideGuests.length,
} as const
