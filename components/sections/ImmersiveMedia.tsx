'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { m, useScroll, useTransform } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { Heading, Body, Label } from '@/components/ui/Typography'
import { FadeIn } from '@/components/motion/FadeIn'

function ImmersiveMedia() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ minHeight: '80vh' }} id="immersive">
      {/* Full-bleed parallax image */}
      <m.div className="absolute inset-0" style={{ y: imageY, position: 'absolute' }}>
        <Image
          src="https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?w=2000&q=80"
          alt="Immersive interior view of an exceptional property"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.2) 100%)' }}
        />
      </m.div>

      {/* Content */}
      <div className="relative h-full flex items-center" style={{ minHeight: '80vh' }}>
        <Container width="narrow">
          <FadeIn direction="up" delay={0.1}>
            <Label className="block mb-6" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: 'var(--tracking-widest)' }}>
              The CasaNova difference
            </Label>
            <Heading
              as={2}
              size="h2"
              color="inverse"
              italic={false}
              className="mb-8"
              style={{ maxWidth: '18ch' }}
            >
              Experience first.{' '}
              <em className="font-display" style={{ fontStyle: 'italic', color: 'var(--color-accent-light)' }}>
                Decide second.
              </em>
            </Heading>
            <Body
              size="lg"
              className="mb-0"
              style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '48ch' }}
            >
              We believe that finding the right home begins long before a viewing. Our immersive approach puts you inside the property experience: its light, its atmosphere, its feeling. When you arrive, you already know.
            </Body>
          </FadeIn>
        </Container>
      </div>
    </section>
  )
}

export { ImmersiveMedia }
