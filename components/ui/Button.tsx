'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent'
type ButtonSize    = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?:    ButtonSize
  loading?: boolean
  icon?:    React.ReactNode
  iconPosition?: 'left' | 'right'
}

const base = [
  'inline-flex items-center justify-center gap-2',
  'font-body font-medium tracking-wider uppercase',
  'border transition-all select-none',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-border-accent] focus-visible:ring-offset-2',
  'disabled:pointer-events-none disabled:opacity-40',
].join(' ')

const variants: Record<ButtonVariant, string> = {
  primary: [
    'bg-[--color-primary-base] text-[--color-text-inverse]',
    'border-[--color-primary-base]',
    'hover:bg-[--color-primary-light] hover:border-[--color-primary-light]',
    'active:bg-[--color-primary-dark]',
  ].join(' '),

  secondary: [
    'bg-transparent text-[--color-text-primary]',
    'border-[--color-border-default]',
    'hover:border-[--color-primary-base] hover:bg-[--color-surface-light]',
    'active:bg-[--color-surface-muted]',
  ].join(' '),

  ghost: [
    'bg-transparent text-[--color-text-secondary]',
    'border-transparent',
    'hover:text-[--color-text-primary] hover:bg-[--color-surface-light]',
    'active:bg-[--color-surface-muted]',
  ].join(' '),

  accent: [
    'bg-[--color-accent-base] text-[--color-text-inverse]',
    'border-[--color-accent-base]',
    'hover:bg-[--color-accent-light] hover:border-[--color-accent-light]',
    'active:bg-[--color-accent-dark]',
  ].join(' '),
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9  px-5  text-[10px] rounded-[--radius-sm]',
  md: 'h-11 px-7  text-[11px] rounded-[--radius-sm]',
  lg: 'h-13 px-10 text-[12px] rounded-[--radius-sm]',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    iconPosition = 'right',
    className,
    children,
    disabled,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      style={{ transitionDuration: 'var(--duration-normal)', transitionTimingFunction: 'var(--ease-architectural)' }}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </button>
  )
})

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.25" />
      <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export { Button }
export type { ButtonProps, ButtonVariant, ButtonSize }
