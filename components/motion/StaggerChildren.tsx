'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { DUR, EASE } from '@/lib/motion'

interface StaggerChildrenProps {
  children:   React.ReactNode
  stagger?:   number
  delay?:     number
  once?:      boolean
  className?: string
}

const containerVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: {
      staggerChildren: stagger,
    },
  }),
}

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.large, ease: EASE.entrance } },
}

const itemVariantsReduced: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DUR.standard, ease: EASE.standard } },
}

function StaggerChildren({
  children,
  stagger = 0.08,
  delay = 0,
  once = true,
  className,
}: StaggerChildrenProps) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      custom={prefersReduced ? 0 : stagger}
      variants={containerVariants}
      transition={{ delayChildren: prefersReduced ? 0 : delay }}
    >
      {children}
    </motion.div>
  )
}

/* Wrap each direct child in this to participate in stagger */
function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div className={className} variants={prefersReduced ? itemVariantsReduced : itemVariants}>
      {children}
    </motion.div>
  )
}

export { StaggerChildren, StaggerItem }
export type { StaggerChildrenProps }
