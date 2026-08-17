import { useState } from 'react'
import { faq } from '../../content'
import { c, t, w } from '../../shared/config/theme'
import { Eyebrow, Heading, Wrap } from '../../shared/ui'

/**
 * FAQ accordion.
 *
 * Each panel is an independent toggle rather than a single-open accordion — that
 * matches the design, and lets someone compare two answers at once. The first
 * item starts open so the section never reads as an empty list of headings.
 */
export function Faq() {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(faq.map((item) => [item.id, Boolean(item.openByDefault)])),
  )

  const toggle = (id: string) => setOpen((current) => ({ ...current, [id]: !current[id] }))

  return (
    <section id="faq" style={{ padding: '100px 28px', background: c.forest }}>
      <Wrap size="sm" style={{ padding: 0 }}>
        <Eyebrow>FAQ</Eyebrow>

        <Heading size="md" style={{ margin: '16px 0 42px' }}>
          Before you come
        </Heading>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faq.map((item) => {
            const isOpen = open[item.id]
            const panelId = `${item.id}-answer`

            return (
              <div
                key={item.id}
                className="faq-item"
                style={{
                  borderRadius: 18,
                  background: w(0.05),
                  border: `1px solid ${w(0.1)}`,
                }}
              >
                <h3 style={{ margin: 0 }}>
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 20,
                      alignItems: 'center',
                      padding: '24px 26px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: 'inherit',
                      font: 'inherit',
                    }}
                  >
                    <span
                      style={{ fontSize: 18.5, fontWeight: 800, letterSpacing: '-0.02em' }}
                    >
                      {item.question}
                    </span>
                    <span
                      aria-hidden
                      style={{ fontSize: 22, color: c.lime, lineHeight: 1, flex: '0 0 auto' }}
                    >
                      {isOpen ? '–' : '+'}
                    </span>
                  </button>
                </h3>

                {isOpen && (
                  <div id={panelId} style={{ padding: '0 26px 24px' }}>
                    <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: t(0.72) }}>
                      {item.answer}
                      {item.contactEmail && (
                        <a href={`mailto:${item.contactEmail}`}>{item.contactEmail}</a>
                      )}
                      {item.contactEmail && ' for the partnership pack.'}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Wrap>
    </section>
  )
}
