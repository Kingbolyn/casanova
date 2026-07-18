/* Accessibility: lets keyboard users skip the nav and jump straight to main content */

function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999]"
      style={{
        padding: 'var(--space-3) var(--space-6)',
        backgroundColor: 'var(--color-accent-base)',
        color: 'var(--color-text-inverse)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--type-small)',
        fontWeight: 'var(--weight-medium)',
        borderRadius: 'var(--radius-sm)',
        textDecoration: 'none',
      }}
    >
      Skip to main content
    </a>
  )
}

export { SkipToContent }
