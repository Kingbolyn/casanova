import { cn } from '@/lib/utils/cn'

type GridCols = 1 | 2 | 3 | 4
type GridGap  = 'sm' | 'md' | 'lg'

interface GridProps {
  cols?:     GridCols
  gap?:      GridGap
  children:  React.ReactNode
  className?: string
}

const colsClass: Record<GridCols, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

const gapStyle: Record<GridGap, React.CSSProperties> = {
  sm: { gap: 'var(--grid-gap-sm)' },
  md: { gap: 'var(--grid-gap-md)' },
  lg: { gap: 'var(--grid-gap-lg)' },
}

function Grid({ cols = 3, gap = 'md', children, className }: GridProps) {
  return (
    <div
      className={cn('grid', colsClass[cols], className)}
      style={gapStyle[gap]}
    >
      {children}
    </div>
  )
}

export { Grid }
export type { GridProps, GridCols, GridGap }
