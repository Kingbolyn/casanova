import Link from 'next/link'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Heading, Body, Label } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <Section
      spacing="xl"
      bg="default"
      className="flex items-center"
      style={{ minHeight: '100dvh' } as React.CSSProperties}
    >
      <Container width="narrow">
        <Label color="tertiary" className="block mb-6">
          404: Page Not Found
        </Label>
        <Heading as={1} size="h2" className="mb-6">
          This page doesn't exist.
        </Heading>
        <Body size="lg" color="secondary" className="mb-10">
          The property or page you're looking for may have moved, or the link may be incorrect.
        </Body>
        <Link href="/">
          <Button variant="primary" size="lg">
            Return Home
          </Button>
        </Link>
      </Container>
    </Section>
  )
}
