import type { ProgrammeSlot } from './types'

/**
 * Running order for Saturday 3 October 2026.
 *
 * Set `programmeIsDraft` to true to show a dashed "DRAFT" caveat above the
 * timeline — useful while the schedule is still moving.
 */
export const programmeIsDraft: boolean = false

export const programmeDraftNote =
  'Running order is a placeholder built around the two confirmed sessions.'

export const programme: ProgrammeSlot[] = [
  {
    id: 'doors',
    time: '08:00',
    title: 'Doors open · accreditation',
    description:
      'Registration desk, delegate badges and seating. Bring your confirmation email.',
    emphasis: 'plain',
  },
  {
    id: 'opening-keynote',
    time: '08:30',
    eyebrow: 'OPENING KEYNOTE · CONFIRMED',
    title: '“Re-engineering the African Mindset, You are not enough”',
    attribution: 'Fela Durotoye · Founder / CEO, Gemstone Group',
    emphasis: 'gold',
  },
  {
    id: 'welcome',
    time: '10:00',
    title: 'Welcome address · the state of the network',
    description:
      'Paul Udah, convener, on where The African Dream Network stands and what ' +
      '2027 asks of it.',
    emphasis: 'plain',
  },
  {
    id: 'guest-of-honour',
    time: '10:45',
    eyebrow: 'GUEST OF HONOUR · CONFIRMED',
    title: '“Re-engineering The Hearts Of The African Girl Child.”',
    attribution:
      'Lady Helen Eno Obareki · Coordinator, Office of the First Lady, Akwa Ibom State',
    emphasis: 'rust',
  },
  {
    id: 'master-classes',
    time: '12:00',
    title: 'Master classes · four parallel rooms',
    description:
      'Enterprise and capital · Leadership and adaptive capacity · Civic reform ' +
      'and governance · The creative economy.',
    rooms: ['Room A', 'Room B', 'Room C', 'Room D'],
    emphasis: 'plain',
  },
  {
    id: 'lunch',
    time: '14:00',
    title: 'Lunch and exhibition alley',
    description:
      'Partner stands, network chapters and a room deliberately built for ' +
      'introductions.',
    emphasis: 'plain',
  },
  {
    id: 'panel',
    time: '15:30',
    title: 'Panel · what has to be re-engineered first',
    description: 'Faculty panel with questions taken from the floor.',
    emphasis: 'plain',
  },
  {
    id: 'close',
    time: '17:00',
    title: 'Charge and close',
    description:
      'Commitments, chapter sign-ups and the closing charge. Dream. Lead. Transform.',
    emphasis: 'green',
  },
]
