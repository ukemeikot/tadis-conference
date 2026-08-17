import { useState } from 'react'
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'
import { Icon } from './Icon'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

type SizeSpec = {
  height: string
  padding: string
  font: string
  gap: number
  icon: number
}

const SIZES: Record<ButtonSize, SizeSpec> = {
  sm: { height: 'var(--control-h-sm)', padding: '0 14px', font: 'var(--text-sm)', gap: 6, icon: 16 },
  md: { height: 'var(--control-h-md)', padding: '0 20px', font: 'var(--text-base)', gap: 8, icon: 18 },
  lg: { height: 'var(--control-h-lg)', padding: '0 28px', font: 'var(--text-lg)', gap: 10, icon: 20 },
}

type Palette = {
  bg: string
  bgHover: string
  bgActive: string
  fg: string
  border: string
  shadow: string
}

function palette(variant: ButtonVariant): Palette {
  switch (variant) {
    case 'secondary':
      return {
        bg: 'var(--color-secondary)',
        bgHover: 'var(--gold-600)',
        bgActive: 'var(--gold-700)',
        fg: 'var(--green-900)',
        border: 'transparent',
        shadow: 'var(--shadow-sm)',
      }
    case 'outline':
      return {
        bg: 'transparent',
        bgHover: 'var(--color-primary-soft)',
        bgActive: 'var(--green-100)',
        fg: 'var(--color-primary)',
        border: 'var(--border-brand)',
        shadow: 'none',
      }
    case 'ghost':
      return {
        bg: 'transparent',
        bgHover: 'var(--surface-hover)',
        bgActive: 'var(--slate-200)',
        fg: 'var(--text-body)',
        border: 'transparent',
        shadow: 'none',
      }
    case 'danger':
      return {
        bg: 'var(--danger-fg)',
        bgHover: 'var(--red-600)',
        bgActive: '#A61F1F',
        fg: 'var(--white)',
        border: 'transparent',
        shadow: 'var(--shadow-sm)',
      }
    case 'primary':
    default:
      return {
        bg: 'var(--color-primary)',
        bgHover: 'var(--color-primary-hover)',
        bgActive: 'var(--color-primary-active)',
        fg: 'var(--text-on-primary)',
        border: 'transparent',
        shadow: 'var(--shadow-brand)',
      }
  }
}

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> & {
  children?: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  leftIcon?: string
  rightIcon?: string
  fullWidth?: boolean
  loading?: boolean
  style?: CSSProperties
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  fullWidth = false,
  loading = false,
  disabled = false,
  type = 'button',
  style,
  ...rest
}: ButtonProps) {
  const [hover, setHover] = useState(false)
  const [active, setActive] = useState(false)

  const spec = SIZES[size]
  const colors = palette(variant)
  const isDisabled = disabled || loading
  const background = active ? colors.bgActive : hover ? colors.bgHover : colors.bg

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false)
        setActive(false)
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spec.gap,
        height: spec.height,
        padding: spec.padding,
        width: fullWidth ? '100%' : 'auto',
        font: `var(--weight-semibold) ${spec.font}/1 var(--font-sans)`,
        letterSpacing: 'var(--tracking-snug)',
        color: colors.fg,
        background,
        border: `1.5px solid ${colors.border}`,
        borderRadius: 'var(--radius-lg)',
        boxShadow: isDisabled ? 'none' : colors.shadow,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.5 : 1,
        transform: active && !isDisabled ? 'translateY(1px)' : 'none',
        transition: 'var(--transition-colors), var(--transition-transform)',
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {loading && (
        <Icon
          name="loader-circle"
          size={spec.icon}
          style={{ animation: 'tadisSpin 0.8s linear infinite' }}
        />
      )}
      {!loading && leftIcon && <Icon name={leftIcon} size={spec.icon} />}
      {children}
      {!loading && rightIcon && <Icon name={rightIcon} size={spec.icon} />}
    </button>
  )
}
