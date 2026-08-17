import { useId, useState } from 'react'
import type { CSSProperties, SelectHTMLAttributes } from 'react'
import { Icon } from './Icon'

export type SelectOption = string | { value: string; label: string }

export type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'size' | 'style' | 'children'
> & {
  label?: string
  hint?: string
  error?: string
  options: ReadonlyArray<SelectOption>
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  style?: CSSProperties
}

const heightFor = (size: 'sm' | 'md' | 'lg') =>
  size === 'lg'
    ? 'var(--control-h-lg)'
    : size === 'sm'
      ? 'var(--control-h-sm)'
      : 'var(--control-h-md)'

export function Select({
  label,
  hint,
  error,
  options,
  placeholder = 'Select…',
  size = 'md',
  disabled = false,
  required = false,
  id,
  style,
  ...rest
}: SelectProps) {
  const [focused, setFocused] = useState(false)
  const generatedId = useId()
  const selectId = id ?? generatedId
  const messageId = `${selectId}-message`

  const borderColor = error
    ? 'var(--danger-fg)'
    : focused
      ? 'var(--border-brand)'
      : 'var(--border-default)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', ...style }}>
      {label && (
        <label
          htmlFor={selectId}
          style={{
            font: 'var(--weight-semibold) var(--text-sm)/1.3 var(--font-sans)',
            color: 'var(--text-strong)',
          }}
        >
          {label}
          {required && <span style={{ color: 'var(--danger-fg)' }}> *</span>}
        </label>
      )}

      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          height: heightFor(size),
          background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
          border: `1.5px solid ${borderColor}`,
          borderRadius: 'var(--radius-md)',
          boxShadow: focused ? 'var(--shadow-focus)' : 'none',
          transition: 'var(--transition-colors)',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <select
          id={selectId}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={hint || error ? messageId : undefined}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            appearance: 'none',
            WebkitAppearance: 'none',
            flex: 1,
            height: '100%',
            padding: '0 40px 0 14px',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            font: 'var(--weight-regular) var(--text-base)/1 var(--font-sans)',
            color: 'var(--text-strong)',
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
          {...rest}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => {
            const value = typeof option === 'string' ? option : option.value
            const optionLabel = typeof option === 'string' ? option : option.label
            return (
              <option key={value} value={value}>
                {optionLabel}
              </option>
            )
          })}
        </select>
        <Icon
          name="chevron-down"
          size={18}
          color="var(--text-muted)"
          style={{ position: 'absolute', right: 12, pointerEvents: 'none' }}
        />
      </div>

      {(hint || error) && (
        <span
          id={messageId}
          role={error ? 'alert' : undefined}
          style={{
            font: 'var(--text-sm)/1.4 var(--font-sans)',
            color: error ? 'var(--danger-fg)' : 'var(--text-muted)',
          }}
        >
          {error || hint}
        </span>
      )}
    </div>
  )
}
