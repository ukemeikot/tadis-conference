import { site } from '../shared/config/site'
import type { FaqItem } from './types'

export const faq: FaqItem[] = [
  {
    id: 'watch',
    question: 'Where can I watch the sessions?',
    answer:
      'Both halves of the day were livestreamed and are on YouTube. Each talk in the ' +
      'sessions section links straight to the moment it starts. ',
    link: { href: '#sessions', label: 'Jump to the sessions' },
    openByDefault: true,
  },
  {
    id: 'photos',
    question: 'Can I get a photo of myself from the day?',
    answer:
      'Yes — the red-carpet portraits, the hall and the full shoot are all public, ' +
      'linked under the gallery. If you cannot find yourself, write to ',
    contactEmail: site.contact.email,
    afterEmail: ' with the session and rough time, and the media team will send what they have.',
  },
  {
    id: 'next-year',
    question: 'When is TADIS 2027?',
    answer:
      'Dates and venue are being planned. Use the TADIS 2027 box under the sessions ' +
      'and you will be among the first to hear.',
  },
  {
    id: 'partner',
    question: 'Can my organisation partner next year?',
    answer: 'Yes — partner and chapter stands return for 2027. Write to ',
    contactEmail: site.contact.email,
    afterEmail: ' for the partnership pack.',
  },
]
