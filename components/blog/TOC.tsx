"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Heading } from "@/lib/types";

interface TOCProps {
  headings: Heading[];
}

export default function TOC({ headings }: TOCProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      },
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-xl border border-border/60 bg-surface/60 p-4"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
        Mục lục
      </p>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const indent = (heading.level - 1) * 12;
          const textClass =
            heading.level === 2
              ? "text-sm font-medium"
              : heading.level === 3
                ? "text-sm text-text-muted"
                : "text-xs text-text-muted";

          return (
            <li key={heading.id} style={{ paddingLeft: `${indent}px` }}>
              <a
                href={`#${heading.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex items-center gap-2 rounded px-2 py-1 transition-colors group",
                  isActive
                    ? "text-accent bg-accent/5 ring-1 ring-accent/10"
                    : "hover:text-accent",
                )}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                  // update activeId immediately for instant feedback
                  setActiveId(heading.id);
                }}
              >
                <span
                  className={cn(
                    "inline-block flex-none rounded-full transition-all",
                    isActive
                      ? "w-2.5 h-2.5 bg-accent"
                      : "w-2 h-2 bg-border group-hover:bg-accent",
                  )}
                  aria-hidden
                />
                <span className={cn(textClass)}>{heading.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
