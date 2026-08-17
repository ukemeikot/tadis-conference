import { useId, useState } from 'react'
import type { CSSProperties, InputHTMLAttributes } from 'react'
import { Icon } from './Icon'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'style'> & {
  label?: string
  hint?: string
  error?: string
  leftIcon?: string
  rightIcon?: string
  size?: 'sm' | 'md' | 'lg'
  style?: CSSProperties
}

const heightFor = (size: 'sm' | 'md' | 'lg') =>
  size === 'lg'
    ? 'var(--control-h-lg)'
    : size === 'sm'
      ? 'var(--control-h-sm)'
      : 'var(--control-h-md)'

export function Input({
  label,
  hint,
  error,
  leftIcon,
  rightIcon,
  size = 'md',
  disabled = false,
  required = false,
  id,
  style,
  ...rest
}: InputProps) {
  const [focused, setFocused] = useState(false)
  // useId rather than the design system's Math.random(), which produced a new
  // id on every render and broke the label/input association after a re-render.
  const generatedId = useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`

  const borderColor = error
    ? 'var(--danger-fg)'
    : focused
      ? 'var(--border-brand)'
      : 'var(--border-default)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', ...style }}>
      {label && (
        <label
          htmlFor={inputId}
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
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          height: heightFor(size),
          padding: '0 14px',
          background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
          border: `1.5px solid ${borderColor}`,
          borderRadius: 'var(--radius-md)',
          boxShadow: focused ? 'var(--shadow-focus)' : 'none',
          transition: 'var(--transition-colors)',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {leftIcon && <Icon name={leftIcon} size={18} color="var(--text-muted)" />}
        <input
          id={inputId}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={hint || error ? messageId : undefined}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            minWidth: 0,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            font: 'var(--weight-regular) var(--text-base)/1.4 var(--font-sans)',
            color: 'var(--text-strong)',
          }}
          {...rest}
        />
        {rightIcon && <Icon name={rightIcon} size={18} color="var(--text-muted)" />}
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
