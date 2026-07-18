import { cn } from '@/lib/utils/cn'

type ContainerWidth = 'narrow' | 'content' | 'wide' | 'full'

interface ContainerProps {
  as?:       React.ElementType
  width?:    ContainerWidth
  children:  React.ReactNode
  className?: string
}

const widthClass: Record<ContainerWidth, string> = {
  narrow:  'container-narrow',
  content: 'container-content',
  wide:    'container-wide',
  full:    'container-full',
}

function Container({
  as: Tag = 'div',
  width = 'content',
  children,
  className,
}: ContainerProps) {
  return (
    <Tag className={cn(widthClass[width], className)}>
      {children}
    </Tag>
  )
}

export { Container }
export type { ContainerProps, ContainerWidth }
