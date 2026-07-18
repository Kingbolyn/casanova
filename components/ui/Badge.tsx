import { cn } from '@/lib/utils/cn'

type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'error' | 'outline'

interface BadgeProps {
  variant?:  BadgeVariant
  children:  React.ReactNode
  className?: string
}

const base = [
  'inline-flex items-center',
  'font-body font-medium tracking-widest uppercase',
  'text-[10px] px-3 py-1',
  'rounded-[--radius-full]',
].join(' ')

const variants: Record<BadgeVariant, string> = {
  default:  'bg-[--color-surface-muted] text-[--color-text-secondary]',
  accent:   'bg-[--color-accent-subtle] text-[--color-accent-dark]',
  success:  'bg-[--color-success-light] text-[--color-success-base]',
  warning:  'bg-[--color-warning-light] text-[--color-warning-base]',
  error:    'bg-[--color-error-light]   text-[--color-error-base]',
  outline:  'bg-transparent border border-[--color-border-default] text-[--color-text-tertiary]',
}

function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span className={cn(base, variants[variant], className)}>
      {children}
    </span>
  )
}

export { Badge }
export type { BadgeProps, BadgeVariant }
