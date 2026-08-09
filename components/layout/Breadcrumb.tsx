import Link from 'next/link'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  /** Light variant for use over dark hero images (default: dark) */
  variant?: 'light' | 'dark'
}

/**
 * Visible breadcrumb navigation.
 * Renders an accessible <nav> with aria-label="Breadcrumb".
 * Current page (last item without href) carries aria-current="page".
 */
function Breadcrumb({ items, variant = 'dark' }: BreadcrumbProps) {
  const textColor   = variant === 'light' ? 'rgba(255,255,255,0.55)' : 'var(--color-text-muted)'
  const activeColor = variant === 'light' ? 'rgba(255,255,255,0.9)'  : 'var(--color-text-secondary)'
  const sepColor    = variant === 'light' ? 'rgba(255,255,255,0.25)' : 'var(--color-border-default)'

  return (
    <nav aria-label="Breadcrumb">
      <ol
        style={{
          display:    'flex',
          flexWrap:   'wrap',
          alignItems: 'center',
          gap:        '0.375rem',
          listStyle:  'none',
          padding:    0,
          margin:     0,
          fontFamily: 'var(--font-body)',
          fontSize:   'var(--type-xs)',
          fontWeight: 500,
          letterSpacing: '0.06em',
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li
              key={item.label}
              style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
            >
              {index > 0 && (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  aria-hidden="true"
                  style={{ flexShrink: 0 }}
                >
                  <path
                    d="M3.5 2l3 3-3 3"
                    stroke={sepColor}
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}

              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  style={{
                    color:      isLast ? activeColor : textColor,
                    fontStyle:  isLast ? 'italic' : 'normal',
                  }}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  style={{
                    color:          textColor,
                    textDecoration: 'none',
                    transition:     'color var(--dur-micro) var(--ease-standard)',
                  }}
                  className="breadcrumb-link"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export { Breadcrumb }
