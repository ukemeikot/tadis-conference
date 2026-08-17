import type { CSSProperties } from 'react'
import { Icon } from './Icon'

export type CheckboxProps = {
  label?: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  name?: string
  style?: CSSProperties
}

export function Checkbox({
  label,
  description,
  checked,
  onChange,
  disabled = false,
  name,
  style,
}: CheckboxProps) {
  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: description ? 'flex-start' : 'center',
        gap: 10,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        ...style,
      }}
    >
      {/* The real input is visually hidden but still focusable and in the tab
          order; this span is the painted box. */}
      <span
        aria-hidden
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 20,
          height: 20,
          flex: '0 0 auto',
          marginTop: description ? 2 : 0,
          borderRadius: 'var(--radius-xs)',
          border: `1.5px solid ${checked ? 'var(--color-primary)' : 'var(--border-strong)'}`,
          background: checked ? 'var(--color-primary)' : 'var(--surface-card)',
          transition: 'var(--transition-colors)',
        }}
      >
        {checked && <Icon name="check" size={14} color="var(--white)" />}
      </span>

      <input
        type="checkbox"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          margin: -1,
          padding: 0,
          overflow: 'hidden',
          clip: 'rect(0 0 0 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      />

      {label && (
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span
            style={{
              font: 'var(--weight-medium) var(--text-base)/1.3 var(--font-sans)',
              color: 'var(--text-strong)',
            }}
          >
            {label}
          </span>
          {description && (
            <span
              style={{
                font: 'var(--text-sm)/1.4 var(--font-sans)',
                color: 'var(--text-muted)',
              }}
            >
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  )
}
