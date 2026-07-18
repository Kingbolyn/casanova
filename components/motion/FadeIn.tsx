'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'

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
  up:    { x: 0,  y: 24  },
  down:  { x: 0,  y: -24 },
  left:  { x: 24, y: 0   },
  right: { x: -24, y: 0  },
  none:  { x: 0,  y: 0   },
}

function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
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
        visible: { opacity: 1, transition: { duration: 0.01 } },
      }
    : {
        hidden: { opacity: 0, x: d.x * scale, y: d.y * scale },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

export { FadeIn }
export type { FadeInProps, FadeInDirection }
