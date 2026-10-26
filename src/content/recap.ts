import archive from './photoArchive.json'
import type {
  ArchivePhoto,
  Letter,
  MemoryItem,
  PhotoAlbum,
  SessionRecording,
  Stream,
  Testimonial,
} from './types'
import { partners } from './gallery'
import {
  firesideGuests,
  firesideTopic,
  panelists,
  panelTopic,
  stageSpeakers,
} from './speakers'

/**
 * Everything the site needs now that the summit has happened: the recordings,
 * the photo albums, what people said afterwards, and the walk back through the day.
 */

/* ------------------------------- recordings ------------------------------- */

/** The day went out as two YouTube livestreams, split at the afternoon break. */
export const streams: Stream[] = [
  {
    id: 'part1',
    label: 'Part 1',
    youtubeId: 'ayO5GZL6IRQ',
    seconds: 11084,
    poster: '/assets/recap/stream-part1.jpg',
  },
  {
    id: 'part2',
    label: 'Part 2',
    youtubeId: 'oqo_qERuGAg',
    seconds: 9958,
    poster: '/assets/recap/stream-part2.jpg',
  },
]

/** "3h 05m" */
export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.round((seconds % 3600) / 60)
  return `${h}h ${String(m).padStart(2, '0')}m`
}

const streamById = Object.fromEntries(streams.map((s) => [s.id, s])) as Record<
  Stream['id'],
  Stream
>

/** Deep link into a stream at the moment a session starts. */
export function watchUrl(stream: Stream['id'], start = 0): string {
  const id = streamById[stream].youtubeId
  return start > 0
    ? `https://www.youtube.com/watch?v=${id}&t=${start}s`
    : `https://www.youtube.com/watch?v=${id}`
}

/** "1:28:00" — how a timestamp is printed on a card. */
export function formatStart(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  const mm = String(m).padStart(2, '0')
  const ss = String(s).padStart(2, '0')
  return h > 0 ? `${h}:${mm}:${ss}` : `${m}:${ss}`
}

export function streamLabel(stream: Stream['id']): string {
  return streamById[stream].label
}

/**
 * Where each session starts, in the order it ran.
 *
 * The streams have no chapters. Each start was read off the broadcast itself —
 * it shows a name card before every speaker — and is set a few seconds before
 * that card. Only sessions whose card was found are listed: two talks in Part 2
 * went out without one, and putting a name to them from a thumbnail would be a
 * guess.
 */
export const sessionRecordings: SessionRecording[] = [
  {
    id: 'helen-obareki',
    title: '“Re-engineering The Hearts Of The African Girl Child.”',
    who: 'Lady Helen Eno Obareki · Special guest of honour',
    stream: 'part1',
    start: 420,
    thumb: '/assets/sm/speaker-helen-obareki.jpg',
    objectPosition: 'center 15%',
  },
  {
    id: 'fela-durotoye',
    title: '“Re-engineering the African Mindset, You are not enough”',
    who: 'Fela Durotoye · Keynote',
    stream: 'part1',
    start: 2160,
    thumb: '/assets/sm/speaker-fela-durotoye.jpg',
    objectPosition: 'center 20%',
  },
  {
    id: 'williams-uchemba',
    title: '“Influence, Media and Africa”',
    who: 'Williams Uchemba',
    stream: 'part1',
    start: 5280,
    thumb: '/assets/sm/speaker-williams-uchemba.jpg',
    objectPosition: 'center 20%',
  },
  {
    id: 'panel',
    title: panelTopic,
    who: 'Faculty panel',
    stream: 'part1',
    start: 9150,
    thumb: '/assets/recap/walk-panel.jpg',
  },
  {
    id: 'paul-udah',
    title: '“African Youth Alignment for Personal and Global Impact”',
    who: 'Paul Udah · runs on into Part 2',
    stream: 'part1',
    start: 9960,
    thumb: '/assets/sm/speaker-paul-udah.jpg',
    objectPosition: 'center center',
  },
  {
    id: 'fireside',
    title: firesideTopic,
    who: 'Fireside chat · Utonne Ekefre, Miracle Edet, Emediong Edem, Saviour Udoh',
    stream: 'part2',
    start: 4800,
    thumb: '/assets/sm/fireside-utonne-ekefre.jpg',
    objectPosition: 'center 18%',
  },
  {
    id: 'jasper-ifeanyi',
    title:
      '“Monetization Structures For Purpose Sustenance: Structures For Wealth ' +
      'Creation in Purposes.”',
    who: 'Jasper Ifeanyi',
    stream: 'part2',
    start: 6700,
    thumb: '/assets/sm/speaker-jasper-ifeanyi.jpg',
    objectPosition: 'center center',
  },
  {
    id: 'aniekan-usoroh',
    title: '“Amplifying Africa’s Value”',
    who: 'Aniekan Usoroh',
    stream: 'part2',
    start: 8000,
    thumb: '/assets/sm/speaker-aniekan-usoroh.jpg',
    objectPosition: 'center 20%',
  },
  {
    id: 'convener-parents',
    title: 'A word from the convener’s parents',
    who: 'Mother, then father, of Emanamfon Akpan',
    stream: 'part2',
    start: 9540,
    end: 9750,
    thumb: '/assets/recap/parents.jpg',
    objectPosition: 'center 25%',
  },
  {
    id: 'emanamfon-akpan',
    title: 'Closing address',
    who: 'Emanamfon Akpan · Convener',
    stream: 'part2',
    start: 9840,
    thumb: '/assets/sm/speaker-emanamfon-akpan.jpg',
    objectPosition: 'center 20%',
  },
]

/** The parents' moment, given pride of place under the convener's letter. */
export const parentsMoment = {
  session: 'convener-parents',
  eyebrow: 'FAMILY',
  title: 'The convener’s parents, on stage',
  body:
    'Just before the closing address, Emanamfon Akpan’s mother and father came up ' +
    'to speak to the room — the people who were there long before the network was.',
  portrait: '/assets/recap/parents-portrait.jpg',
} as const

export const sessionById = Object.fromEntries(
  sessionRecordings.map((session) => [session.id, session]),
) as Record<string, SessionRecording>

/** The 73-second recap cut from the day, with sound. */
export const highlightReel = {
  src: '/assets/recap/reel.mp4',
  poster: '/assets/recap/reel.jpg',
  caption: 'The day in 73 seconds',
} as const

/* --------------------------------- albums --------------------------------- */

export const photoAlbums: PhotoAlbum[] = [
  {
    id: 'red-carpet',
    archiveKey: 'carpet',
    label: 'Red carpet portraits',
    detail: 'Shot by theBuchi',
    url: 'https://thebuchi1.pixieset.com/tadis2026-1/',
  },
  {
    id: 'in-the-hall',
    archiveKey: 'hall',
    label: 'In the hall',
    detail: 'Stage, audience and the moments between',
    url: 'https://photos.app.goo.gl/T4Pq9TbPokATCYTeA',
  },
  {
    id: 'full-shoot',
    archiveKey: 'shoot',
    label: 'The full shoot',
    detail: 'Every photo from the day, on Google Drive',
    url: 'https://drive.google.com/drive/folders/1eJxQnWS0Vwd5qFrdfa2N3kFzKOzA3brB',
  },
]

/**
 * Every photo from the three albums, re-encoded for the web by
 * build_photo_archive.py: a 480px thumbnail and a 1400px viewer copy each.
 * In-the-hall shots come first, then the full shoot, then the red carpet.
 */
export const photoArchive = archive as ArchivePhoto[]

export const photoThumb = (photo: ArchivePhoto) =>
  `/assets/photos/t/${String(photo.id).padStart(3, '0')}.webp`
export const photoLarge = (photo: ArchivePhoto) =>
  `/assets/photos/l/${String(photo.id).padStart(3, '0')}.webp`

/* --------------------------------- voices --------------------------------- */

const ernestTurner: Testimonial = {
  id: 'ernest-turner',
  quote: '“Top quality thinkers… movers and shakers.”',
  attribution: 'Rev. Ernest Turner',
  role: 'Former Regional Director in charge of West Africa, Pentecostal Holiness Church',
  body: [
    'I was able to watch a few speakers… top quality thinkers… movers and shakers.',
    'I am so proud of Emanam. We thank God for using him to break into an ' +
      'incredibly important and sensitive area… especially with some of our elders.',
    'When you start talking about pride and being willing to sacrifice ego… watch ' +
      'out. When you start looking at bringing it home and talking about the real ' +
      'issues and local solutions — and doing something about it… watch out, the ' +
      'devil doesn’t like that.',
    'I love you guys, I miss you and greatly appreciate your boldness and your ' +
      'aggressive faith.',
    'Stay in that place where everything changes… where creativity and solutions are ' +
      'birthed… where inspiration flows… where wisdom grows… the presence of the ' +
      'Lord. Things happen, things are birthed, new vision arises — in the presence ' +
      'of God. Spend meaningful time with Him and He will take you to new heights, ' +
      'with Him.',
    'Blessings on you always!',
  ],
}

/**
 * A message sent to the convener a while after the summit. It came unsigned in
 * the copy we were given, so it carries no name rather than an invented one —
 * add `attribution` once the writer is happy to be named.
 */
const convenerMessage: Testimonial = {
  id: 'message-to-the-convener',
  quote: '“Some people make an impression, others make an impact.”',
  attribution: 'A message to the convener',
  role: 'Sent after TADIS 2026',
  body: [
    'Good evening, Sir.',
    'First, congratulations on the successful conclusion of TADIS 2026 — Reengineering Africa.',
    'I have been meaning to send you this message since the conference, but I deliberately ' +
      'decided to give you some time. I imagined the number of messages, calls, and ' +
      'responsibilities that would naturally follow such a remarkable event, and I didn’t ' +
      'want my message to become another demand on your attention. Now that some time has ' +
      'passed, I felt it was important to reach out, celebrate you, and express my sincere ' +
      'appreciation for what you have done.',
    'Sir, beyond the success of the conference, I want you to understand that the value of ' +
      'what you are building goes far beyond an event. It lies in the minds you are ' +
      'awakening, the perspectives you are changing, the leaders you are inspiring, and the ' +
      'possibilities you are helping young people see for themselves and for Africa.',
    'In a time when many people are quick to identify the problems facing Nigeria and ' +
      'Africa, choosing to build a vision that inspires people to think differently, take ' +
      'responsibility, pursue excellence, and become part of the solution is truly ' +
      'commendable. That is the kind of influence that matters. It is the kind of ' +
      'leadership that goes beyond position or recognition and begins to create a lasting ' +
      'legacy.',
    'I sincerely appreciate you for the vision, courage, intentionality, and excellence you ' +
      'have invested in TADIS. Thank you for creating a platform that challenges people to ' +
      'look beyond their present circumstances and recognise their capacity to contribute ' +
      'meaningfully to the future of our nation and continent.',
    'One thing I deeply admire is that you are not merely encouraging people to dream about ' +
      'a better Africa; you are also demonstrating the importance of taking practical steps ' +
      'towards that future. A true visionary does not only speak about what is possible; a ' +
      'visionary creates the atmosphere for others to begin believing, preparing, and ' +
      'working towards it. In your own way, you are becoming that source of inspiration to ' +
      'many, especially young people who need to see that leadership, excellence, and ' +
      'meaningful impact are possible.',
    'My prayer and sincere wish for you is that this is only the beginning of greater ' +
      'things. May the vision grow beyond its present reach, may the impact multiply beyond ' +
      'what you can currently imagine, and may the seeds planted through this year’s ' +
      'conference produce fruits that will speak for generations to come.',
    'I believe that the editions ahead will be greater, more impactful, and more ' +
      'transformative than this year’s. May each new chapter bring greater opportunities, ' +
      'stronger partnerships, wider influence, and a deeper contribution to the ' +
      'reengineering of Africa.',
    'Please know that I genuinely appreciate what you are doing, and I am willing to ' +
      'identify with and support this vision in whatever capacity I can whenever the ' +
      'opportunity arises. I believe in the importance of the work, and I would be glad to ' +
      'contribute in my own little way to something that carries such a meaningful purpose.',
    'Once again, congratulations, Sir. May God continue to grant you wisdom, strength, ' +
      'discernment, and the right people to run with the vision. May He preserve your ' +
      'passion, enlarge your capacity, and give you the grace to see this vision grow into ' +
      'everything it was created to become.',
    'Some people make an impression, others make an impact. But the greatest among them are ' +
      'those who inspire others to become part of something bigger than themselves.',
    'Thank you for choosing to be one of those people.',
    'Congratulations once again, Sir. The journey has only just begun, and I look forward to ' +
      'witnessing the great and mighty things ahead.',
    'With sincere respect and appreciation. 🙏🏽🌍',
  ],
}

/** The feedback section, in the order it is shown. */
export const testimonials: Testimonial[] = [ernestTurner, convenerMessage]

/* ------------------------------ the letter -------------------------------- */

export const convenerLetter: Letter = {
  greeting: 'Dear TADIS Family,',
  paragraphs: [
    'On behalf of The African Dream Network, I extend my heartfelt appreciation to ' +
      'everyone who contributed to the success of the African Dream Network ' +
      'International Summit (TADIS 2026).',
    'What we witnessed at TADIS 2026 was a powerful reminder of what becomes possible ' +
      'when people unite around a shared vision. Under the theme Reengineering Africa, ' +
      'we gathered to exchange ideas, challenge perspectives, build meaningful ' +
      'connections and renew our commitment to a better Africa.',
    'But beyond the conversations, presentations and activities that defined the ' +
      'summit, what made TADIS 2026 truly meaningful was the people behind it.',
    'To our team leads, team members, volunteers and everyone who worked tirelessly ' +
      'behind the scenes, thank you for your dedication, sacrifices, creativity and ' +
      'commitment.',
    'Your contributions, whether visible or unseen, helped bring this vision to life. ' +
      'Every task completed, challenge overcome and extra effort made played a part in ' +
      'the outcome we celebrate today.',
    'To our distinguished speakers, panelists, facilitators and special guests, thank ' +
      'you for sharing your knowledge, experience and perspectives with us. Your ' +
      'presence and contributions enriched the conversations and challenged our ' +
      'participants to think more deeply about leadership, responsibility and ' +
      'Africa’s future.',
    'To our attendees, participants, students, young leaders and professionals who ' +
      'made time to be part of this gathering, thank you for showing up with open ' +
      'minds and a willingness to learn, connect and grow. You were not merely an ' +
      'audience; you were an essential part of the conversation we set out to create.',
    'We are equally grateful to our sponsors, partners, supporters, service providers, ' +
      'media collaborators and everyone who contributed resources, time, goodwill and ' +
      'encouragement towards making TADIS 2026 a reality. Your support helped create a ' +
      'platform where ideas could be shared, relationships could be built and ' +
      'possibilities could be explored.',
    'We also extend our sincere appreciation to Lady Helen Eno Obareki for honouring ' +
      'TADIS 2026 with her presence. Her participation was a meaningful part of the ' +
      'summit, and we are grateful for the opportunity to have welcomed her to the ' +
      'gathering.',
    'To everyone whose contribution may not have been individually mentioned, please ' +
      'know that your efforts are recognised and deeply appreciated.',
    'As Convener, I am particularly grateful that we could bring together people from ' +
      'different backgrounds, experiences and fields around one shared question: What ' +
      'will it take to reengineer Africa?',
    'The summit may have ended, but the responsibility it placed before us remains. ' +
      'The ideas shared must inspire action, the connections made must create ' +
      'opportunities, and the conversations started must continue beyond the walls of ' +
      'the venue.',
    'TADIS 2026 was a collective effort, and its story belongs to everyone who helped ' +
      'make it happen.',
    'Thank you for believing in the vision, contributing to the work and becoming part ' +
      'of this journey. May we continue to build with purpose, lead with integrity and ' +
      'work together towards the Africa we know is possible.',
  ],
  closing: 'With sincere appreciation,',
  name: 'Emanamfon Akpan',
  role: 'Convener, TADIS 2026',
  organisation: 'The African Dream Network',
  portrait: '/assets/sm/speaker-emanamfon-akpan.jpg',
}

/* ------------------------------- memory walk ------------------------------ */

/**
 * The walk, in the order the day actually ran — which is the order of the
 * livestreams, not of the published programme. Signs carry a part of the day
 * rather than a clock time: the running order moved on the day, and printing the
 * planned times against it would be wrong.
 */
export const memoryWalk: MemoryItem[] = [
  { kind: 'sign', id: 's-before', label: 'EARLY', title: 'Before the doors' },
  photo('stage', 'L', 'walk-stage', 'The stage, set and waiting', 'MAIN AUDITORIUM', -2),
  clip('arrival', 'R', 'clip-arrival', 'Setting up, rain or not', 'BEFORE THE DOORS', 2),
  photo('rain', 'L', 'walk-rain', 'Arriving through the rain', 'OUTSIDE THE HALL', 2.5),
  photo('arrive', 'R', 'walk-arrive', 'Made it', 'OUTSIDE THE HALL', -2),

  { kind: 'sign', id: 's-carpet', label: 'MORNING', title: 'The red carpet' },
  photo('carpet', 'L', 'walk-carpet', 'The red carpet', 'ENTRANCE', -2.5),
  photo('hug', 'R', 'walk-hug', 'Old friends, new badges', 'TADIS WALL', 2),
  clip('red-carpet', 'L', 'clip-red-carpet', 'Williams Uchemba arrives', 'RED CARPET', -1.5),
  photo('guests', 'R', 'walk-guests', 'The guests walk in', 'RED CARPET', 1.5),
  photo('selfie', 'L', 'walk-selfie', 'The selfie line', 'RED CARPET', 2.5),
  photo('friends', 'R', 'walk-friends', 'Everyone in the frame', 'RED CARPET', -2),

  { kind: 'sign', id: 's-hall', label: 'OPENING', title: 'A full hall' },
  photo('hall', 'L', 'walk-hall', 'Every seat taken', 'MAIN AUDITORIUM', -2),
  photo('hosts', 'R', 'walk-hosts', 'Your hosts for the day', 'MAIN STAGE', 2),
  clip('full-hall', 'L', 'clip-full-hall', 'The room, from the back', 'MAIN AUDITORIUM', 1.5),

  { kind: 'sign', id: 's-guest', label: 'MORNING', title: 'Guest of honour' },
  { kind: 'session', id: 'w-helen', side: 'R', session: 'helen-obareki' },
  clip('helen', 'L', 'clip-helen', 'Lady Helen Eno Obareki, with the faculty', 'MAIN STAGE', -2),

  { kind: 'sign', id: 's-keynote', label: 'MORNING', title: 'The keynote' },
  { kind: 'session', id: 'w-fela', side: 'R', session: 'fela-durotoye' },
  clip('fela', 'L', 'clip-fela', 'Fela Durotoye, mid-keynote', 'MAIN STAGE', 1.5),
  clip('fela-2', 'R', 'clip-fela-2', '“You are not enough”', 'MAIN STAGE', -1.5),
  photo('notes', 'L', 'walk-notes', 'Notes, everywhere', 'AUDIENCE', -2.5),

  { kind: 'sign', id: 's-media', label: 'MIDDAY', title: 'Influence & media' },
  { kind: 'session', id: 'w-williams', side: 'R', session: 'williams-uchemba' },
  clip('williams-talk', 'L', 'clip-williams-talk', 'Williams Uchemba on stage', 'MAIN STAGE', 2),
  photo('applause', 'R', 'walk-applause', 'Front-row applause', 'AUDIENCE', 2),
  photo('greet', 'L', 'walk-greet', 'Between sessions', 'FOYER', -2),
  photo('handshake', 'R', 'walk-handshake', 'Introductions', 'MAIN AUDITORIUM', -1.5),

  { kind: 'sign', id: 's-afternoon', label: 'AFTERNOON', title: 'Panel & alignment' },
  { kind: 'session', id: 'w-panel', side: 'L', session: 'panel' },
  photo('panel-voice', 'R', 'walk-panel-voice', 'From the panel chairs', 'MAIN STAGE', 2),
  { kind: 'session', id: 'w-paul', side: 'L', session: 'paul-udah' },
  photo('paul-wave', 'R', 'walk-paul-wave', 'Paul Udah, mid-talk', 'MAIN STAGE', -2),

  { kind: 'sign', id: 's-part2', label: 'PART TWO', title: 'Fireside & beyond' },
  { kind: 'session', id: 'w-fireside', side: 'L', session: 'fireside' },
  photo('catch-up', 'R', 'walk-catch-up', 'Catching up outside', 'GROUNDS', 2),
  { kind: 'session', id: 'w-jasper', side: 'L', session: 'jasper-ifeanyi' },
  { kind: 'session', id: 'w-aniekan', side: 'R', session: 'aniekan-usoroh' },

  { kind: 'sign', id: 's-close', label: 'CLOSE', title: 'Family & the charge' },
  { kind: 'session', id: 'w-parents', side: 'L', session: 'convener-parents' },
  { kind: 'session', id: 'w-close', side: 'R', session: 'emanamfon-akpan' },
  photo('group', 'L', 'walk-group', 'Faculty and hosts', 'RED CARPET', 1.5),
  { kind: 'end', id: 'end' },
]

function photo(
  id: string,
  side: 'L' | 'R',
  file: string,
  caption: string,
  meta: string,
  tilt: number,
): MemoryItem {
  return { kind: 'photo', id, side, src: `/assets/recap/${file}.jpg`, caption, meta, tilt }
}

function clip(
  id: string,
  side: 'L' | 'R',
  file: string,
  caption: string,
  meta: string,
  tilt: number,
): MemoryItem {
  return {
    kind: 'clip',
    id,
    side,
    src: `/assets/recap/${file}.mp4`,
    poster: `/assets/recap/${file}.jpg`,
    caption,
    meta,
    tilt,
  }
}

/* ---------------------------- the day in numbers --------------------------- */

/**
 * The stats band. Every figure is counted from data elsewhere on the site, so it
 * cannot drift from what the page shows — except the photo count, which was
 * counted across the three public albums in October 2026 (150 + 31 + 200) and is
 * printed as a floor rather than an exact number.
 */
const ALBUM_PHOTOS_COUNTED = 381

const onStage = stageSpeakers.length + panelists.length + firesideGuests.length
const streamedSeconds = streams.reduce((total, stream) => total + stream.seconds, 0)

export const dayInNumbers: { value: string; label: string; detail: string }[] = [
  {
    value: String(onStage),
    label: 'Voices on stage',
    detail: `${stageSpeakers.length} speakers, ${panelists.length} panelists and ${firesideGuests.length} in the fireside chat`,
  },
  {
    value: formatDuration(streamedSeconds),
    label: 'Livestreamed',
    detail: `${streams.length} streams on YouTube, free to rewatch`,
  },
  {
    value: String(sessionRecordings.length),
    label: 'Sessions, to the minute',
    detail: 'Each one links straight to where it starts',
  },
  {
    value: `${Math.floor(ALBUM_PHOTOS_COUNTED / 10) * 10}+`,
    label: 'Photos',
    detail: `Across ${photoAlbums.length} public albums`,
  },
  {
    value: String(partners.length),
    label: 'Partners',
    detail: 'Who kept entry free',
  },
  {
    value: '₦0',
    label: 'Entry',
    detail: 'Free by design, start to finish',
  },
]
