import { useEffect, useState } from 'react'

export type Countdown = {
  days: string
  hours: string
  minutes: string
  seconds: string
  /** true once the target moment has passed */
  elapsed: boolean
}

const PLACEHOLDER: Countdown = {
  days: '--',
  hours: '--',
  minutes: '--',
  seconds: '--',
  elapsed: false,
}

const pad = (n: number, width = 2) => String(Math.floor(n)).padStart(width, '0')

/**
 * Ticks once a second toward `target`.
 *
 * Renders `--` on the very first paint (before the effect runs) so the server
 * and client markup agree and the digits never flash a wrong value.
 */
export function useCountdown(target: string): Countdown {
  const [value, setValue] = useState<Countdown>(PLACEHOLDER)

  useEffect(() => {
    const targetMs = new Date(target).getTime()

    if (Number.isNaN(targetMs)) {
      console.warn(`[TADIS] Invalid event date: "${target}"`)
      return
    }

    const tick = () => {
      let diff = Math.max(0, targetMs - Date.now())
      const elapsed = diff === 0

      const d = diff / 86_400_000
      diff -= Math.floor(d) * 86_400_000
      const h = diff / 3_600_000
      diff -= Math.floor(h) * 3_600_000
      const m = diff / 60_000
      diff -= Math.floor(m) * 60_000

      setValue({
        days: pad(d),
        hours: pad(h),
        minutes: pad(m),
        seconds: pad(diff / 1000),
        elapsed,
      })
    }

    tick()
    const timer = window.setInterval(tick, 1000)
    return () => window.clearInterval(timer)
  }, [target])

  return value
}
