import type { AboutPanel } from './types'

/**
 * The four panels in the scroll-driven About stack. Each one pins to the
 * viewport, then scales and blurs away as the next rises over it.
 */
export const aboutPanels: AboutPanel[] = [
  {
    id: 'summit',
    index: '01 / THE SUMMIT',
    tint: 'green',
    centred: true,
    heading: 'Dream. Lead.\nTransform.',
    body:
      'The African Dream Network International Summit is the annual gathering of ' +
      'the network — a day of keynotes, master classes and honest conversation ' +
      'for young Africans who intend to build rather than wait.',
  },
  {
    id: 'vision',
    index: '02 / VISION',
    tint: 'teal',
    quote:
      '“To lead Africa’s awakening by uniting emerging youth for a self-sustaining continent.”',
    body:
      'The 2026 edition takes one question seriously: what has to be ' +
      're-engineered before the continent can carry its own weight? Not the ' +
      'infrastructure first, but the mindset that builds it.',
  },
  {
    id: 'mission',
    index: '03 / MISSION',
    tint: 'rust',
    quote:
      '“To forge a generation of visionary African youths who will shape the ' +
      'continent through innovation, purpose, and unity.”',
    body:
      'A network with chapters, not an audience with tickets. Delegates leave ' +
      'with a track, a cohort and a commitment they made out loud.',
  },
  {
    id: 'why-attend',
    index: '04 / WHY ATTEND',
    tint: 'deep',
    reasons: [
      {
        number: '01',
        title: 'World-class faculty',
        body: 'Leaders who have built companies, reformed institutions and shaped policy.',
      },
      {
        number: '02',
        title: 'A working network',
        body: 'Founders, public servants and creatives already doing the work.',
      },
      {
        number: '03',
        title: 'Practical master classes',
        body: 'Enterprise, leadership, civic reform and the creative economy.',
      },
      {
        number: '04',
        title: 'It costs nothing',
        body: 'Entry is free by design. Register, show up, bring someone.',
      },
    ],
    cta: { label: 'Meet the speakers', href: '#speakers' },
  },
]
