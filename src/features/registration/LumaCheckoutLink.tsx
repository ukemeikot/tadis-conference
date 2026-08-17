import type { CSSProperties, ReactNode } from 'react'
import { site } from '../../shared/config/site'

export type LumaCheckoutLinkProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * A "Register free" trigger.
 *
 * Deliberately an `<a>` with a real `href` rather than a `<button>`: Luma's embed
 * script intercepts the click and opens its overlay, but if the script is blocked
 * — ad blockers, corporate proxies, flaky mobile connections — the element is
 * still a working link to the event page. Registration is the whole point of the
 * site, so it must not depend on third-party JavaScript loading.
 */
export function LumaCheckoutLink({ children, className, style }: LumaCheckoutLinkProps) {
  return (
    <a
      href={site.luma.eventUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-luma-action="checkout"
      data-luma-event-id={site.luma.eventId}
      className={className}
      style={style}
    >
      {children}
    </a>
  )
}
