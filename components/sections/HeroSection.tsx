'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Typography'

function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY   = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale    = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ height: '100dvh', minHeight: '680px' }}
      aria-label="Hero"
    >
      {/* Parallax image */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY, scale, position: 'absolute' }}
      >
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2000&q=85"
          alt="Luxury property exterior at golden hour"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
        {/* Scrim */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.7) 100%)' }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative h-full flex flex-col justify-end"
        style={{ opacity }}
      >
        <div className="container-content pb-20 md:pb-28">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center gap-4 mb-8"
          >
            <span style={{ width: '32px', height: '1px', backgroundColor: 'var(--color-accent-base)' }} />
            <Label style={{ color: 'rgba(255,255,255,0.65)', letterSpacing: 'var(--tracking-widest)' }}>
              Exceptional Properties
            </Label>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-display font-light mb-8"
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 6.5rem)',
              lineHeight: '1.02',
              letterSpacing: 'var(--tracking-tight)',
              color: 'var(--color-text-inverse)',
              maxWidth: '16ch',
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Find the home<br />
            <em style={{ fontStyle: 'italic', color: 'var(--color-accent-light)' }}>you imagined.</em>
          </motion.h1>

          {/* Sub */}
          <motion.p
            className="font-body mb-12"
            style={{
              fontSize: 'var(--type-body-lg)',
              lineHeight: 'var(--leading-relaxed)',
              color: 'rgba(255,255,255,0.65)',
              maxWidth: '44ch',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Property discovery begins with emotion, not transaction. We help you experience a home before you evaluate it.
          </motion.p>

          {/* Actions */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link href="/properties">
              <Button variant="accent" size="lg">
                Browse Properties
              </Button>
            </Link>
            <Link href="/collections">
              <Button
                variant="secondary"
                size="lg"
                style={{
                  borderColor: 'rgba(255,255,255,0.35)',
                  color: 'var(--color-text-inverse)',
                  background: 'transparent',
                }}
              >
                View Collections
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          aria-hidden="true"
        >
          <motion.span
            className="block"
            style={{ width: '1px', height: '48px', backgroundColor: 'rgba(255,255,255,0.3)' }}
            animate={{ scaleY: [1, 0.3, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export { HeroSection }
