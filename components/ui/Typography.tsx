import React from 'react'
import { cn } from '@/lib/utils/cn'

/* ─── Heading ───────────────────────────────────────────── */

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
type HeadingSize  = 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type HeadingColor = 'primary' | 'secondary' | 'inverse' | 'accent'

interface HeadingProps {
  as?:        HeadingLevel
  size?:      HeadingSize
  color?:     HeadingColor
  italic?:    boolean
  children:   React.ReactNode
  className?: string
  id?:        string
  style?:     React.CSSProperties
}

const sizeStyle: Record<HeadingSize, React.CSSProperties> = {
  display: { fontSize: 'var(--type-display)', lineHeight: 'var(--leading-none)',  letterSpacing: 'var(--tracking-tight)'  },
  h1:      { fontSize: 'var(--type-h1)',      lineHeight: 'var(--leading-none)',  letterSpacing: 'var(--tracking-tight)'  },
  h2:      { fontSize: 'var(--type-h2)',      lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-tight)'  },
  h3:      { fontSize: 'var(--type-h3)',      lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-snug)'   },
  h4:      { fontSize: 'var(--type-h4)',      lineHeight: 'var(--leading-snug)',  letterSpacing: 'var(--tracking-snug)'   },
  h5:      { fontSize: 'var(--type-h5)',      lineHeight: 'var(--leading-snug)',  letterSpacing: 'var(--tracking-normal)' },
  h6:      { fontSize: 'var(--type-h6)',      lineHeight: 'var(--leading-snug)',  letterSpacing: 'var(--tracking-normal)' },
}

const headingColor: Record<HeadingColor, string> = {
  primary:   'var(--color-text-primary)',
  secondary: 'var(--color-text-secondary)',
  inverse:   'var(--color-text-inverse)',
  accent:    'var(--color-accent-base)',
}

function Heading({
  as: level = 2,
  size,
  color = 'primary',
  italic = false,
  children,
  className,
  id,
  style,
}: HeadingProps) {
  const resolvedSize: HeadingSize = size ?? (`h${level}` as HeadingSize)

  return React.createElement(
    `h${level}`,
    {
      id,
      className: cn('font-display font-light', italic && 'italic', className),
      style: {
        ...sizeStyle[resolvedSize],
        color: headingColor[color],
        fontFamily: 'var(--font-display)',
        fontWeight: 'var(--weight-light)',
        ...style,
      },
    },
    children,
  )
}

/* ─── Body ──────────────────────────────────────────────── */

type BodySize  = 'lg' | 'base' | 'sm'
type BodyColor = 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'accent'

interface BodyProps {
  as?:        React.ElementType
  size?:      BodySize
  color?:     BodyColor
  children:   React.ReactNode
  className?: string
  style?:     React.CSSProperties
}

const bodySize: Record<BodySize, React.CSSProperties> = {
  lg:   { fontSize: 'var(--type-body-lg)', lineHeight: 'var(--leading-relaxed)' },
  base: { fontSize: 'var(--type-base)',    lineHeight: 'var(--leading-relaxed)' },
  sm:   { fontSize: 'var(--type-small)',   lineHeight: 'var(--leading-normal)'  },
}

const bodyColor: Record<BodyColor, string> = {
  primary:   'var(--color-text-primary)',
  secondary: 'var(--color-text-secondary)',
  tertiary:  'var(--color-text-tertiary)',
  inverse:   'var(--color-text-inverse)',
  accent:    'var(--color-accent-base)',
}

function Body({ as = 'p', size = 'base', color = 'secondary', children, className, style }: BodyProps) {
  return React.createElement(
    as as string,
    {
      className: cn('font-body', className),
      style: {
        ...bodySize[size],
        color: bodyColor[color],
        fontFamily: 'var(--font-body)',
        ...style,
      },
    },
    children,
  )
}

/* ─── Label ─────────────────────────────────────────────── */

interface LabelProps {
  children:   React.ReactNode
  className?: string
  color?:     BodyColor
  style?:     React.CSSProperties
}

function Label({ children, className, color = 'tertiary', style }: LabelProps) {
  return (
    <span
      className={cn('font-body font-medium uppercase tracking-widest', className)}
      style={{
        fontSize: 'var(--type-caption)',
        color: bodyColor[color],
        fontFamily: 'var(--font-body)',
        letterSpacing: 'var(--tracking-widest)',
        ...style,
      }}
    >
      {children}
    </span>
  )
}

/* ─── Caption ───────────────────────────────────────────── */

interface CaptionProps {
  children:   React.ReactNode
  className?: string
  color?:     BodyColor
  style?:     React.CSSProperties
}

function Caption({ children, className, color = 'tertiary', style }: CaptionProps) {
  return (
    <span
      className={cn('font-body', className)}
      style={{
        fontSize: 'var(--type-caption)',
        lineHeight: 'var(--leading-normal)',
        color: bodyColor[color],
        fontFamily: 'var(--font-body)',
        ...style,
      }}
    >
      {children}
    </span>
  )
}

export { Heading, Body, Label, Caption }
export type { HeadingProps, BodyProps, LabelProps, CaptionProps }
