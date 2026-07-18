import React from 'react'
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
  as = 'div',
  width = 'content',
  children,
  className,
}: ContainerProps) {
  return React.createElement(
    as as string,
    { className: cn(widthClass[width], className) },
    children,
  )
}

export { Container }
export type { ContainerProps, ContainerWidth }
