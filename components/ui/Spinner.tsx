import { cn } from '@/lib/utils/cn'

type SpinnerSize = 'sm' | 'md' | 'lg'

interface SpinnerProps {
  size?:      SpinnerSize
  color?:     'primary' | 'accent' | 'inverse'
  className?: string
  label?:     string
}

const dimensions: Record<SpinnerSize, number> = { sm: 16, md: 24, lg: 40 }
const strokeWidth: Record<SpinnerSize, number> = { sm: 1.5, md: 1.5, lg: 2 }

const colors = {
  primary: 'var(--color-primary-base)',
  accent:  'var(--color-accent-base)',
  inverse: 'var(--color-text-inverse)',
}

function Spinner({ size = 'md', color = 'primary', className, label = 'Loading…' }: SpinnerProps) {
  const d   = dimensions[size]
  const sw  = strokeWidth[size]
  const r   = (d - sw * 2) / 2
  const cx  = d / 2
  const c   = colors[color]

  return (
    <svg
      className={cn('animate-spin', className)}
      width={d}
      height={d}
      viewBox={`0 0 ${d} ${d}`}
      fill="none"
      role="status"
      aria-label={label}
    >
      <circle cx={cx} cy={cx} r={r} stroke={c} strokeWidth={sw} strokeOpacity="0.2" />
      <path
        d={`M ${cx} ${sw} A ${r} ${r} 0 0 1 ${d - sw} ${cx}`}
        stroke={c}
        strokeWidth={sw}
        strokeLinecap="round"
      />
    </svg>
  )
}

export { Spinner }
export type { SpinnerProps, SpinnerSize }
