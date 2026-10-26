import type { NavItem } from './types'

/** Header links, in scroll order. Each `id` must match a section's `id`. */
export const navigation: NavItem[] = [
  { id: 'memories', label: 'Memory walk' },
  { id: 'appreciation', label: 'Appreciation' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'speakers', label: 'Speakers' },
  { id: 'programme', label: 'Programme' },
  { id: 'photos', label: 'Photos' },
  { id: 'faq', label: 'FAQ' },
]

/**
 * Sections that have no link of their own but still take part in the scroll spy,
 * so the underline lets go of the previous link instead of lingering on it. The
 * sessions section is reached through the header's call-to-action instead.
 */
export const spyOnly: string[] = ['about', 'numbers', 'gallery', 'sessions', 'contact']
