import { Heading, Label } from '@/components/ui/Typography'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { PropertyCard } from '@/components/property/PropertyCard'
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
      </FadeIn>

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.1}>
        {related.map((p) => (
          <StaggerItem key={p.id}>
            <PropertyCard property={p} />
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  )
}

export { RelatedProperties }
