'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import UserMenu from '@/components/auth/UserMenu'

const NAV_LINKS = [
  { href: '/blog', label: 'Blog' },
  { href: '/community', label: 'Community' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold"
          onClick={() => setMenuOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent text-xs font-mono font-bold">
            E
          </span>
          <span className="gradient-text">EurusDevSec</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                pathname.startsWith(link.href)
                  ? 'bg-accent/10 text-accent'
                  : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Dynamic auth state via UserMenu */}
          <UserMenu />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:bg-surface-elevated hover:text-text-primary md:hidden"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto max-w-6xl space-y-1 px-4 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                  pathname.startsWith(link.href)
                    ? 'bg-accent/10 text-accent'
                    : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-1 border-t border-border/50 pt-2">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-4 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-elevated hover:text-text-primary"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg border border-accent/20 px-4 py-2.5 text-sm font-medium text-accent hover:bg-accent/10"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
