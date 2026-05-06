import Link from 'next/link'
import type { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16">
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/5 blur-[100px]" />
      <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-secondary/5 blur-[100px]" />

      {/* Logo */}
      <Link
        href="/"
        className="relative mb-8 flex items-center gap-2 text-lg font-bold"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent text-xs font-mono font-bold">
          E
        </span>
        <span className="gradient-text">EurusDevSec</span>
      </Link>

      {/* Card */}
      <div className="relative w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
