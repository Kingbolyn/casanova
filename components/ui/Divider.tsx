import { cn } from '@/lib/utils/cn'

interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  variant?:     'subtle' | 'default' | 'accent'
  className?:   string
}

const colors = {
  subtle:  'var(--color-border-subtle)',
  default: 'var(--color-border-default)',
  accent:  'var(--color-accent-base)',
}

function Divider({ orientation = 'horizontal', variant = 'default', className }: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <span
        role="separator"
        aria-orientation="vertical"
        className={cn('inline-block w-px self-stretch', className)}
        style={{ backgroundColor: colors[variant] }}
      />
    )
  }

  return (
    <hr
      role="separator"
      className={cn('border-none h-px w-full', className)}
      style={{ backgroundColor: colors[variant] }}
    />
  )
}

export { Divider }
export type { DividerProps }
