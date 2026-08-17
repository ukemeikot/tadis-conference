import { useEffect } from 'react'

const SCRIPT_ID = 'luma-checkout'
const SCRIPT_SRC = 'https://embed.lu.ma/checkout-button.js'

declare global {
  interface Window {
    luma?: {
      initCheckout?: () => void
    }
  }
}

/**
 * Loads Luma's checkout embed and binds it to our triggers.
 *
 * Luma's script scans for `[data-luma-action="checkout"]` when it loads. Because
 * React renders those anchors after the document is parsed, the initial scan can
 * miss them — hence the explicit `initCheckout()` call once the script is ready,
 * which is what Luma's own docs prescribe for dynamically rendered elements.
 *
 * Call this once, high in the tree. The script is injected only once even across
 * StrictMode's double-mount in development.
 */
export function useLumaCheckout() {
  useEffect(() => {
    const init = () => window.luma?.initCheckout?.()

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null

    if (existing) {
      // Already injected by a previous mount — just rebind to our triggers.
      init()
      return
    }

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = SCRIPT_SRC
    script.async = true
    script.addEventListener('load', init)
    script.addEventListener('error', () => {
      // Not fatal: every trigger is an anchor pointing at the Luma event page,
      // so a blocked script degrades to a normal link rather than a dead button.
      console.warn('[TADIS] Luma embed failed to load; registration links will open luma.com directly.')
    })
    document.body.appendChild(script)

    return () => script.removeEventListener('load', init)
  }, [])
}
