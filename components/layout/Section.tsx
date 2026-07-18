import React from 'react'
import { cn } from '@/lib/utils/cn'

type SectionSpacing = 'sm' | 'md' | 'lg' | 'xl' | 'none'
type SectionBg      = 'default' | 'white' | 'light' | 'muted' | 'primary' | 'transparent'

interface SectionProps {
  as?:        React.ElementType
  spacing?:   SectionSpacing
  bg?:        SectionBg
  children:   React.ReactNode
  className?: string
  id?:        string
  style?:     React.CSSProperties
}

const spacingClass: Record<SectionSpacing, string> = {
  none: '',
  sm:   'section-sm',
  md:   'section-md',
  lg:   'section-lg',
  xl:   'section-xl',
}

const bgStyle: Record<SectionBg, React.CSSProperties> = {
  default:     { backgroundColor: 'var(--color-surface-off-white)' },
  white:       { backgroundColor: 'var(--color-surface-white)' },
  light:       { backgroundColor: 'var(--color-surface-light)' },
  muted:       { backgroundColor: 'var(--color-surface-muted)' },
  primary:     { backgroundColor: 'var(--color-primary-base)' },
  transparent: { backgroundColor: 'transparent' },
}

function Section({
  as = 'section',
  spacing = 'lg',
  bg = 'default',
  children,
  className,
  id,
  style,
}: SectionProps) {
  return React.createElement(
    as as string,
    {
      id,
      className: cn(spacingClass[spacing], className),
      style: { ...bgStyle[bg], ...style },
    },
    children,
  )
}

export { Section }
export type { SectionProps, SectionSpacing, SectionBg }
