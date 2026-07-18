import { Heading, Body } from '@/components/ui/Typography'
import { cn } from '@/lib/utils/cn'

interface EmptyStateProps {
  title:       string
  description?: string
  icon?:       React.ReactNode
  action?:     React.ReactNode
  className?:  string
}

function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-20 px-8',
        className
      )}
    >
      {icon && (
        <div
          className="flex items-center justify-center w-16 h-16 rounded-full mb-6"
          style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text-tertiary)' }}
        >
          {icon}
        </div>
      )}

      <Heading as={3} size="h5" className="mb-3">
        {title}
      </Heading>

      {description && (
        <Body size="sm" color="tertiary" className="max-w-sm mb-8">
          {description}
        </Body>
      )}

      {action}
    </div>
  )
}

export { EmptyState }
export type { EmptyStateProps }
