import type { NavItem } from './types'

/** Header links, in scroll order. Each `id` must match a section's `id`. */
export const navigation: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'speakers', label: 'Speakers' },
  { id: 'panelists', label: 'Panels' },
  { id: 'fireside', label: 'Fireside' },
  { id: 'programme', label: 'Programme' },
  { id: 'venue', label: 'Venue' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'faq', label: 'FAQ' },
]
