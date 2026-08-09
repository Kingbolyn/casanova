import Link from 'next/link'
import { Label, Caption } from '@/components/ui/Typography'

/* ─── Data ───────────────────────────────────────────────────────── */

const exploreLinks = [
  { label: 'All Properties',  href: '/properties'    },
  { label: 'Collections',     href: '/collections'   },
  { label: 'Neighbourhoods',  href: '/neighbourhoods' },
  { label: 'Search',          href: '/search'        },
]

const neighbourhoodLinks = [
  { label: 'Victoria Island', href: '/neighbourhoods/victoria-island' },
  { label: 'Ikoyi',           href: '/neighbourhoods/ikoyi'           },
  { label: 'Banana Island',   href: '/neighbourhoods/banana-island'   },
  { label: 'Lekki',           href: '/neighbourhoods/lekki'           },
  { label: 'Maitama',         href: '/neighbourhoods/maitama'         },
  { label: 'Asokoro',         href: '/neighbourhoods/asokoro'         },
]

const companyLinks = [
  { label: 'About',           href: '/about'   },
  { label: 'Contact',         href: '/contact' },
  { label: 'Privacy Policy',  href: '/privacy' },
  { label: 'Terms of Service', href: '/terms'  },
  { label: 'Cookie Policy',   href: '/cookies' },
]

const legalLinks = [
  { label: 'Privacy Policy',   href: '/privacy' },
  { label: 'Terms of Service', href: '/terms'   },
  { label: 'Cookie Policy',    href: '/cookies' },
]

/* ─── Column component ───────────────────────────────────────────── */

interface FooterColumnProps {
  heading: string
  links: Array<{ label: string; href: string }>
}

function FooterColumn({ heading, links }: FooterColumnProps) {
  return (
    <div>
      <Label
        className="block mb-5"
        style={{
          color:          'rgba(255,255,255,0.35)',
          letterSpacing:  '0.14em',
          fontSize:       'var(--type-xs)',
        }}
      >
        {heading}
      </Label>
      <ul className="flex flex-col list-none" style={{ gap: '0.875rem' }} role="list">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="footer-link-nav">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ─── Footer ─────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-primary-base)',
        color:           'var(--color-text-inverse)',
      }}
      aria-label="Site footer"
    >

      {/* ── Pre-footer CTA strip ──────────────────────────────────── */}
      <div
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding:      'clamp(3rem, 6vw, 5rem) 0',
        }}
      >
        <div className="container-content">
          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
            style={{ gap: 'var(--space-8)' }}
          >
            <div>
              <p
                style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'clamp(1.5rem, 3vw, 2.25rem)',
                  fontWeight:    300,
                  letterSpacing: 'var(--tracking-tight)',
                  color:         'var(--color-text-inverse)',
                  lineHeight:    1.2,
                  marginBottom:  '0.5rem',
                }}
              >
                Ready to find your property?
              </p>
              <p
                style={{
                  fontSize:  'var(--type-small)',
                  color:     'rgba(255,255,255,0.45)',
                  lineHeight: 1.6,
                }}
              >
                An advisor responds within one business day.
              </p>
            </div>
            <div
              className="flex flex-col sm:flex-row"
              style={{ gap: 'var(--space-3)', flexShrink: 0 }}
            >
              <Link
                href="/properties"
                className="footer-cta-secondary"
              >
                Browse Properties
              </Link>
              <Link
                href="/contact"
                className="footer-cta-primary"
              >
                Speak with an Advisor
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main grid ─────────────────────────────────────────────── */}
      <div className="container-content section-lg">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]"
          style={{ gap: 'clamp(2.5rem, 5vw, 3.5rem)' }}
        >

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-display font-light block mb-5"
              style={{
                fontSize:      'var(--type-h3)',
                color:         'var(--color-text-inverse)',
                letterSpacing: 'var(--tracking-tight)',
              }}
              aria-label="CasaNova Home"
            >
              CasaNova
            </Link>
            <p
              className="font-body mb-8"
              style={{
                fontSize:   'var(--type-small)',
                lineHeight: 1.8,
                color:      'rgba(255,255,255,0.45)',
                maxWidth:   '34ch',
              }}
            >
              Property discovery begins with emotion, not transaction.
              We help you find not just a house, but a home that fits your life.
            </p>

            {/* Contact details */}
            <ul className="flex flex-col list-none" style={{ gap: '0.625rem' }} role="list">
              <li>
                <a
                  href="mailto:hello@casanova.ng"
                  className="footer-contact-link"
                  aria-label="Email CasaNova"
                >
                  hello@casanova.ng
                </a>
              </li>
              <li>
                <a
                  href="tel:+2348000000000"
                  className="footer-contact-link"
                  aria-label="Call CasaNova"
                >
                  +234 (0) 800 000 0000
                </a>
              </li>
              <li>
                <span
                  style={{
                    fontSize: 'var(--type-xs)',
                    color:    'rgba(255,255,255,0.35)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Lagos &amp; Abuja, Nigeria
                </span>
              </li>
            </ul>

            {/* Accent line */}
            <div
              style={{
                width:           '32px',
                height:          '1px',
                backgroundColor: 'var(--color-accent-base)',
                marginTop:       'var(--space-8)',
              }}
              aria-hidden="true"
            />
          </div>

          {/* Explore */}
          <FooterColumn heading="Explore"        links={exploreLinks}      />

          {/* Neighbourhoods */}
          <FooterColumn heading="Neighbourhoods" links={neighbourhoodLinks} />

          {/* Company */}
          <FooterColumn heading="Company"        links={companyLinks}      />

        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container-content">
          <div
            className="flex flex-col sm:flex-row items-center justify-between"
            style={{ paddingBlock: 'var(--space-6)', gap: 'var(--space-4)' }}
          >
            <Caption style={{ color: 'rgba(255,255,255,0.55)' }}>
              © 2026 CasaNova. All rights reserved.
            </Caption>
            <ul
              className="flex flex-wrap items-center justify-center list-none"
              style={{ gap: 'var(--space-6)' }}
              role="list"
            >
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link-legal">
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
