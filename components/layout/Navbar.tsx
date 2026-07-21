'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavScroll } from '@/lib/hooks/useNavScroll'
import { useLockBodyScroll } from '@/lib/hooks/useLockBodyScroll'
import { primaryNav } from '@/lib/data/navigation'
import { Button } from '@/components/ui/Button'
import { SearchOverlay } from '@/components/ui/SearchOverlay'
import { cn } from '@/lib/utils/cn'

function Navbar() {
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [searchOpen, setSearchOpen]   = useState(false)
  const { scrolled, hidden } = useNavScroll()
  const pathname  = usePathname()

  useLockBodyScroll(mobileOpen)

  const isHome = pathname === '/'

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0',
          scrolled ? 'bg-[--color-surface-white] shadow-[--shadow-2]' : 'bg-transparent'
        )}
        style={{
          zIndex: 'var(--z-nav)',
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: `
            transform    var(--dur-standard) var(--ease-standard),
            background   var(--dur-standard) var(--ease-standard),
            box-shadow   var(--dur-standard) var(--ease-standard)
          `.trim(),
        }}
      >
        <div className="container-content">
          <nav
            className="flex items-center justify-between"
            style={{ height: scrolled ? '72px' : '88px', transition: 'height var(--dur-standard) var(--ease-standard)' }}
            aria-label="Primary navigation"
          >
            {/* Logo */}
            <Link
              href="/"
              className="font-display font-light tracking-tight"
              style={{
                fontSize: 'var(--type-h5)',
                color: isHome && !scrolled ? 'var(--color-text-inverse)' : 'var(--color-text-primary)',
                transition: 'color var(--dur-micro) var(--ease-standard)',
              }}
              aria-label="CasaNova Home"
            >
              CasaNova
            </Link>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-10 list-none" role="list">
              {primaryNav.map((item) => {
                const active = pathname.startsWith(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="relative font-body font-medium tracking-widest uppercase text-[11px] transition-colors"
                      style={{
                        color: isHome && !scrolled
                          ? active ? 'var(--color-text-inverse)' : 'rgba(255,255,255,0.7)'
                          : active ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
                        transitionDuration: 'var(--dur-micro)',
                        transitionTimingFunction: 'var(--ease-standard)',
                      }}
                      aria-current={active ? 'page' : undefined}
                    >
                      {item.label}
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-1 left-0 right-0 h-px"
                          style={{ backgroundColor: 'var(--color-accent-base)' }}
                          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Search + CTA */}
            <div className="hidden md:flex items-center gap-4">
              {/* Search trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: isHome && !scrolled ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted)',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 12l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <Button
                variant={isHome && !scrolled ? 'secondary' : 'primary'}
                size="sm"
                style={
                  isHome && !scrolled
                    ? {
                        borderColor: 'rgba(255,255,255,0.5)',
                        color: 'var(--color-text-inverse)',
                        background: 'transparent',
                      }
                    : undefined
                }
              >
                Book a Viewing
              </Button>
            </div>

            {/* Mobile search + toggle */}
            <button
              className="flex md:hidden flex-col justify-center items-center gap-1.5 w-10 h-10"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block w-6 h-px origin-center"
                  style={{ backgroundColor: isHome && !scrolled ? 'var(--color-text-inverse)' : 'var(--color-text-primary)' }}
                  animate={
                    mobileOpen
                      ? i === 0 ? { rotate: 45,  y: 8,  opacity: 1 }
                      : i === 1 ? { opacity: 0 }
                      :           { rotate: -45, y: -8, opacity: 1 }
                      : { rotate: 0, y: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                />
              ))}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 md:hidden"
              style={{ backgroundColor: 'var(--color-overlay-dark)', zIndex: 'calc(var(--z-nav) - 1)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              id="mobile-menu"
              className="fixed top-0 right-0 bottom-0 w-[300px] md:hidden flex flex-col"
              style={{
                backgroundColor: 'var(--color-surface-white)',
                zIndex: 'var(--z-nav)',
                paddingTop: '100px',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-label="Mobile navigation"
              aria-modal="true"
            >
              <nav className="flex flex-col px-8 gap-1">
                {primaryNav.map((item, i) => {
                  const active = pathname.startsWith(item.href)
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        className="block py-4 font-display font-light border-b"
                        style={{
                          fontSize: 'var(--type-h5)',
                          borderColor: 'var(--color-border-subtle)',
                          color: active ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
                        }}
                        onClick={() => setMobileOpen(false)}
                        aria-current={active ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              <div className="mt-auto px-8 pb-12">
                <Button variant="primary" size="md" className="w-full">
                  Book a Viewing
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

export { Navbar }
