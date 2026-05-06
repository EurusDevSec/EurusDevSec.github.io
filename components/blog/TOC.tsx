'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import type { Heading } from '@/lib/types'

interface TOCProps {
  headings: Heading[]
}

export default function TOC({ headings }: TOCProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-xl border border-border/60 bg-surface/60 p-4"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
        Mục lục
      </p>
      <ul className="space-y-1">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
          >
            <a
              href={`#${heading.id}`}
              className={cn(
                'block rounded py-1 text-sm transition-colors hover:text-accent',
                activeId === heading.id
                  ? 'font-medium text-accent'
                  : 'text-text-muted'
              )}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
