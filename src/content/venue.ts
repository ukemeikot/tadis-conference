import type { VenueZone } from './types'

/**
 * The six zones of the venue, drawn as an isometric floor plan.
 *
 * Geometry is percentages within the plan surface plus a stacking depth in px.
 * The layout is indicative until the venue walkthrough is done — the note under
 * the heading says as much on the page.
 */
export const floorPlanNote =
  'Insight Bible Church, 227 Nsikak Eduok Avenue, Uyo. Hover a zone to lift it — ' +
  'the layout is indicative until the venue walkthrough is done.'

export const venueZones: VenueZone[] = [
  {
    number: '01',
    name: 'Main auditorium',
    detail: 'Keynotes, guest of honour, closing charge',
    geometry: { left: '6%', top: '8%', width: '52%', height: '56%' },
    gradient: 'linear-gradient(150deg, #159B62, #0A3D29)',
    border: '1px solid rgba(233,201,53,0.5)',
    numberColor: '#E9C935',
    numberSize: 22,
    depth: 34,
    liftedDepth: 74,
  },
  {
    number: '02',
    name: 'Accreditation & registration',
    detail: 'Badge pick-up from 08:00',
    geometry: { right: '6%', top: '8%', width: '32%', height: '26%' },
    gradient: 'linear-gradient(150deg, #A3D93C, #5f8f1c)',
    border: '1px solid rgba(255,255,255,0.35)',
    numberColor: '#04160F',
    numberSize: 19,
    depth: 22,
    liftedDepth: 62,
  },
  {
    number: '03',
    name: 'Exhibition alley',
    detail: 'Partner and chapter stands',
    geometry: { right: '6%', top: '40%', width: '32%', height: '24%' },
    gradient: 'linear-gradient(150deg, #E9C935, #B8963A)',
    border: '1px solid rgba(255,255,255,0.3)',
    numberColor: '#04160F',
    numberSize: 19,
    depth: 16,
    liftedDepth: 56,
  },
  {
    number: '04',
    name: 'Master class rooms A–D',
    detail: 'Parallel sessions from 12:00',
    geometry: { left: '6%', bottom: '8%', width: '30%', height: '24%' },
    gradient: 'linear-gradient(150deg, #7B1E12, #4a1109)',
    border: '1px solid rgba(233,201,53,0.35)',
    numberColor: '#E9C935',
    numberSize: 19,
    depth: 20,
    liftedDepth: 60,
  },
  {
    number: '05',
    name: 'Media & interview lounge',
    detail: 'Press, podcasts, speaker interviews',
    geometry: { left: '40%', bottom: '8%', width: '24%', height: '24%' },
    gradient: 'linear-gradient(150deg, #0E9597, #0a5f61)',
    border: '1px solid rgba(255,255,255,0.25)',
    numberColor: '#E9C935',
    numberSize: 19,
    depth: 14,
    liftedDepth: 54,
  },
  {
    number: '06',
    name: 'Refreshment court',
    detail: 'Lunch service, 14:00',
    geometry: { right: '6%', bottom: '8%', width: '26%', height: '24%' },
    gradient: 'linear-gradient(150deg, rgba(255,255,255,0.22), rgba(255,255,255,0.06))',
    border: '1px dashed rgba(255,255,255,0.4)',
    numberColor: '#FFFFFF',
    numberSize: 19,
    depth: 10,
    liftedDepth: 50,
  },
]
