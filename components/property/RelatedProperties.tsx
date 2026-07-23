import Link from 'next/link'
import Image from 'next/image'
import { Heading, Label } from '@/components/ui/Typography'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import type { Property } from '@/lib/types'

interface RelatedPropertiesProps {
  properties: Property[]
  currentId:  string
}

function RelatedProperties({ properties, currentId }: RelatedPropertiesProps) {
  const related = properties.filter((p) => p.id !== currentId).slice(0, 3)
  if (related.length === 0) return null

  return (
    <section aria-label="Related properties" className="mt-4">
      <FadeIn direction="up">
        <div className="mb-8 flex items-center gap-4">
          <div style={{ width: '32px', height: '1px', backgroundColor: 'var(--color-accent-base)' }} aria-hidden="true" />
          <Label style={{ letterSpacing: 'var(--tracking-widest)', color: 'var(--color-text-muted)' }}>
            You may also like
          </Label>
        </div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.1}>
          {related.map((p) => (
            <StaggerItem key={p.id}>
              <Link
                href={`/property/${p.slug}`}
                className="block group"
                style={{ textDecoration: 'none' }}
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden mb-4"
                  style={{ aspectRatio: '4/3', backgroundColor: 'var(--color-surface-secondary)' }}
                >
                  <Image
                    src={p.media.hero}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Info */}
                <Label
                  style={{ display: 'block', color: 'var(--color-text-muted)', letterSpacing: 'var(--tracking-wide)', marginBottom: '0.375rem' }}
                >
                  {p.location.neighbourhood}, {p.location.city}
                </Label>
                <Heading as={3} size="h5" className="mb-1 group-hover:text-accent-base transition-colors">
                  {p.title}
                </Heading>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', color: 'var(--color-accent-base)', fontWeight: 300 }}>
                  {p.priceLabel}
                </p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </FadeIn>
    </section>
  )
}

export { RelatedProperties }
