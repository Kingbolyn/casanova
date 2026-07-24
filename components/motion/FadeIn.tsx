'use client'

import { m, useReducedMotion, type Variants } from 'framer-motion'
import { DUR, EASE } from '@/lib/motion'

type FadeInDirection = 'up' | 'down' | 'left' | 'right' | 'none'

interface FadeInProps {
  children:   React.ReactNode
  direction?: FadeInDirection
  delay?:     number
  duration?:  number
  distance?:  number
  once?:      boolean
  className?: string
}

const offset: Record<FadeInDirection, { x: number; y: number }> = {
  up:    { x: 0,   y: 20  },
  down:  { x: 0,   y: -20 },
  left:  { x: 20,  y: 0   },
  right: { x: -20, y: 0   },
  none:  { x: 0,   y: 0   },
}

function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = DUR.large,
  distance,
  once = true,
  className,
}: FadeInProps) {
  const prefersReduced = useReducedMotion()
  const d = offset[direction]
  const scale = distance ?? 1

  const variants: Variants = prefersReduced
    ? {
        hidden:  { opacity: 0 },
        visible: { opacity: 1, transition: { duration: DUR.standard, ease: EASE.standard } },
      }
    : {
        hidden: { opacity: 0, x: d.x * scale, y: d.y * scale },
        visible: {
          opacity: 1, x: 0, y: 0,
          transition: { duration, delay, ease: EASE.entrance },
        },
      }

  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      variants={variants}
    >
      {children}
    </m.div>
  )
}

export { FadeIn }
export type { FadeInProps, FadeInDirection }
