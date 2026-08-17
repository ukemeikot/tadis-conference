import { site } from '../shared/config/site'
import type { FaqItem } from './types'

export const faq: FaqItem[] = [
  {
    id: 'is-it-free',
    question: 'Is the summit really free?',
    answer:
      'Yes. Entry is free and there is no delegate fee. Registration is ' +
      'compulsory because seating is limited.',
    openByDefault: true,
  },
  {
    id: 'arrival-time',
    question: 'What time should I arrive?',
    answer:
      'Doors and accreditation open at 08:00. The opening keynote starts at ' +
      '08:30 prompt.',
  },
  {
    id: 'outside-nigeria',
    question: 'Can I attend from outside Nigeria?',
    answer:
      'The summit is an in-person gathering in Uyo. Streaming and diaspora ' +
      'participation are still being decided — register and we will tell you first.',
  },
  {
    id: 'sponsorship',
    question: 'Can my organisation sponsor or exhibit?',
    answer:
      'Yes — the exhibition alley takes partner and chapter stands. Write to ',
    contactEmail: site.contact.email,
  },
]
