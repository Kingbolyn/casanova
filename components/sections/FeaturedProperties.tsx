import Link from 'next/link'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Grid } from '@/components/layout/Grid'
import { Heading, Label } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import { PropertyCard } from '@/components/property/PropertyCard'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { featuredProperties } from '@/lib/data/properties'

function FeaturedProperties() {
  return (
    <Section spacing="xl" bg="default" id="featured-properties">
      <Container>
        {/* Header */}
        <FadeIn direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <Label color="tertiary" className="block mb-4">
              Handpicked for you
            </Label>
            <Heading as={2} size="h2">
              Featured Properties
            </Heading>
          </div>
          <Link href="/properties" className="shrink-0">
            <Button variant="secondary" size="sm">
              View All Properties
            </Button>
          </Link>
        </FadeIn>

        {/* Cards */}
        <StaggerChildren stagger={0.12}>
          <Grid cols={3} gap="lg">
            {featuredProperties.map((property, i) => (
              <StaggerItem key={property.id}>
                <PropertyCard property={property} priority={i === 0} />
              </StaggerItem>
            ))}
          </Grid>
        </StaggerChildren>
      </Container>
    </Section>
  )
}

export { FeaturedProperties }
