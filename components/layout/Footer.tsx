import Link from 'next/link'
import { primaryNav } from '@/lib/data/navigation'
import { Divider } from '@/components/ui/Divider'
import { Label, Caption } from '@/components/ui/Typography'

const legalLinks = [
  { label: 'Privacy Policy',    href: '/privacy'     },
  { label: 'Terms of Service',  href: '/terms'       },
  { label: 'Cookie Policy',     href: '/cookies'     },
]

const contactDetails = [
  { label: 'hello@casanova.com' },
  { label: '+1 (555) 000-0000'  },
  { label: 'Lagos, Nigeria'     },
]

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-primary-base)',
        color: 'var(--color-text-inverse)',
      }}
      aria-label="Site footer"
    >
      {/* Main footer */}
      <div className="container-content section-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: 'var(--space-12)' }}>

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-display font-light block mb-6"
              style={{
                fontSize: 'var(--type-h3)',
                color: 'var(--color-text-inverse)',
                letterSpacing: 'var(--tracking-tight)',
              }}
              aria-label="CasaNova Home"
            >
              CasaNova
            </Link>
            <p
              className="font-body mb-8"
              style={{
                fontSize: 'var(--type-base)',
                lineHeight: 'var(--leading-relaxed)',
                color: 'rgba(255,255,255,0.55)',
                maxWidth: '36ch',
              }}
            >
              Property discovery begins with emotion, not transaction. We help you find not just a house, but a home that fits your life.
            </p>
            {/* Accent line */}
            <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--color-accent-base)' }} />
          </div>

          {/* Navigation */}
          <div>
            <Label color="tertiary" className="block mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Navigate
            </Label>
            <ul className="flex flex-col gap-4 list-none" role="list">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-body transition-colors"
                    style={{
                      fontSize: 'var(--type-small)',
                      color: 'rgba(255,255,255,0.6)',
                      transitionDuration: 'var(--duration-normal)',
                      transitionTimingFunction: 'var(--ease-architectural)',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <Label color="tertiary" className="block mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Contact
            </Label>
            <ul className="flex flex-col gap-4 list-none" role="list">
              {contactDetails.map((item) => (
                <li key={item.label}>
                  <span
                    className="font-body"
                    style={{ fontSize: 'var(--type-small)', color: 'rgba(255,255,255,0.6)' }}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container-content">
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ paddingBlock: 'var(--space-6)' }}
          >
            <Caption style={{ color: 'rgba(255,255,255,0.35)' }}>
              © {new Date().getFullYear()} CasaNova. All rights reserved.
            </Caption>
            <ul className="flex items-center gap-6 list-none" role="list">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-body transition-colors"
                    style={{
                      fontSize: 'var(--type-caption)',
                      color: 'rgba(255,255,255,0.35)',
                      transitionDuration: 'var(--duration-normal)',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
