import type { ProgrammeSlot } from './types'

/**
 * Running order for Saturday 3 October 2026, from the published programme flier.
 *
 * Times are the printed start times, 24h. Durations are not stored because every
 * slot runs into the next one, so a slot's length is the gap to the row below it
 * — the flier's own minute column is that subtraction already done. The only
 * figure that subtraction cannot recover is the end of the day, which is why the
 * closing anthem names it.
 *
 * Attributions come from `speakers.ts` rather than the flier, which bills people
 * by name alone. Same people, fuller billing, and one place to correct a title.
 *
 * Set `programmeIsDraft` to true to show a dashed "DRAFT" caveat above the
 * timeline — useful while the schedule is still moving.
 */
export const programmeIsDraft: boolean = false

export const programmeDraftNote =
  'Running order is still moving; times may shift by a few minutes on the day.'

export const programme: ProgrammeSlot[] = [
  {
    id: 'anthem-open',
    time: '08:30',
    title: 'National Anthem',
    emphasis: 'plain',
  },
  {
    id: 'welcome',
    time: '08:35',
    title: 'Welcome',
    emphasis: 'plain',
  },
  {
    id: 'opening-remarks',
    time: '08:40',
    title: 'Opening Remarks',
    emphasis: 'plain',
  },
  {
    id: 'first-speaker',
    time: '08:45',
    title: 'First Speaker',
    attribution: 'Paul Udah · Pan-Africa leadership educator, Paul Udah Leadership Firm',
    emphasis: 'plain',
  },
  {
    id: 'pulf-graduation',
    time: '09:00',
    title: 'PULF Graduation',
    description: 'The graduating cohort of the Paul Udah Leadership Firm.',
    emphasis: 'plain',
  },
  {
    id: 'panel',
    time: '09:10',
    title: 'Panel Session',
    description:
      'Abasiekeme Umana · Rejoice Madara · Ms. Ima Akpan, with questions taken ' +
      'from the floor.',
    emphasis: 'plain',
  },
  {
    id: 'song-1',
    time: '09:50',
    title: 'Song Performance',
    emphasis: 'plain',
  },
  {
    id: 'williams-uchemba',
    time: '09:55',
    title: 'Williams Uchemba',
    attribution: 'Founder, Williams Uchemba Foundation',
    emphasis: 'plain',
  },
  {
    id: 'recognitions-1',
    time: '10:15',
    title: 'Recognitions',
    emphasis: 'plain',
  },
  {
    id: 'jasper-ifeanyi',
    time: '10:20',
    title: 'Jasper Ifeanyi',
    attribution: 'CEO & co-founder, Success Haven',
    emphasis: 'plain',
  },
  {
    id: 'spoken-word',
    time: '10:35',
    title: 'Spoken Word',
    emphasis: 'plain',
  },
  {
    id: 'guest-of-honour',
    time: '10:40',
    eyebrow: 'GUEST OF HONOUR',
    title: '“Re-engineering The Hearts Of The African Girl Child.”',
    attribution:
      'Lady Helen Eno Obareki · Coordinator, Office of the First Lady, Akwa Ibom State',
    emphasis: 'rust',
  },
  {
    id: 'recognitions-2',
    time: '11:15',
    title: 'Recognitions',
    emphasis: 'plain',
  },
  {
    id: 'fireside-chat',
    time: '11:20',
    title: 'Fireside Chat',
    description:
      'Emediong Edem · Miracle Edet · Saviour Udoh · Utonne Ekefre.',
    emphasis: 'plain',
  },
  {
    id: 'sax',
    time: '12:00',
    title: 'Sax Performance',
    emphasis: 'plain',
  },
  {
    id: 'aniekan-usoroh',
    time: '12:05',
    title: 'Aniekan Usoroh',
    attribution: 'Leadership strategist · Executive consultant',
    emphasis: 'plain',
  },
  {
    id: 'song-2',
    time: '12:40',
    title: 'Song Performance',
    emphasis: 'plain',
  },
  {
    id: 'keynote',
    time: '12:45',
    eyebrow: 'KEYNOTE',
    title: '“Re-engineering the African Mindset, You are not enough”',
    attribution: 'Fela Durotoye · Founder / CEO, Gemstone Group',
    emphasis: 'gold',
  },
  {
    id: 'african-dream-lab',
    time: '13:40',
    title: 'African Dream Lab',
    emphasis: 'plain',
  },
  {
    id: 'song-3',
    time: '13:50',
    title: 'Song Performance',
    emphasis: 'plain',
  },
  {
    id: 'onofiok-luke',
    time: '13:55',
    title: 'Rt. Hon. Onofiok Luke Ph.D',
    attribution: 'Legislative & policy advisor',
    emphasis: 'plain',
  },
  {
    id: 'sponsors',
    time: '14:30',
    title: 'Sponsors Highlight',
    emphasis: 'plain',
  },
  {
    id: 'remarks',
    time: '14:40',
    title: 'Remarks',
    emphasis: 'plain',
  },
  {
    id: 'closing-remarks',
    time: '15:05',
    title: 'Closing Remarks',
    emphasis: 'plain',
  },
  {
    id: 'anthem-close',
    time: '15:15',
    title: 'National Anthem',
    description: 'Close at 15:20.',
    emphasis: 'green',
  },
]
