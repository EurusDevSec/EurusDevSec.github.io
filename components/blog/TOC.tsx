"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import type { Heading } from "@/lib/types";

interface TOCProps {
  headings: Heading[];
}

interface TOCGroup {
  parent: Heading;
  children: Heading[];
}

export default function TOC({ headings }: TOCProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [indicatorStyle, setIndicatorStyle] = useState({ height: 0, top: 0, opacity: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Group headings: level 2 are parents, level 3 are children
  const groups: TOCGroup[] = [];
  let currentGroup: TOCGroup | null = null;

  headings.forEach((heading) => {
    if (heading.level === 2) {
      currentGroup = { parent: heading, children: [] };
      groups.push(currentGroup);
    } else if (heading.level === 3) {
      if (currentGroup) {
        currentGroup.children.push(heading);
      } else {
        // H3 before any H2
        groups.push({ parent: heading, children: [] });
      }
    } else {
      // For any other heading levels (e.g. H4), lump into children if a group exists
      if (currentGroup) {
        currentGroup.children.push(heading);
      } else {
        groups.push({ parent: heading, children: [] });
      }
    }
  });

  // IntersectionObserver to watch scroll position
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

  // Update sliding vertical indicator position
  useEffect(() => {
    const updateIndicator = () => {
      if (!activeId || !containerRef.current) {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      const activeEl = containerRef.current.querySelector(
        `[data-id="${CSS.escape(activeId)}"]`
      ) as HTMLElement;

      if (activeEl) {
        setIndicatorStyle({
          height: activeEl.offsetHeight - 8,
          top: activeEl.offsetTop + 4,
          opacity: 1,
        });
      }
    };

    updateIndicator();
    // Re-run after a small delay in case collapsible sections are transitioning
    const timer = setTimeout(updateIndicator, 200);
    return () => clearTimeout(timer);
  }, [activeId, headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-2xl border border-border/60 bg-surface/60 p-5 backdrop-blur-md sticky top-24"
    >
      <p className="mb-4 text-xs font-bold uppercase tracking-wider text-text-muted">
        Mục lục bài viết
      </p>

      {/* Main menu container */}
      <div ref={containerRef} className="relative pl-3 border-l border-border/60">
        {/* Sliding Active Indicator Line */}
        <div
          className="absolute left-0 w-0.5 bg-emerald-500 dark:bg-emerald-400 transition-all duration-300 ease-in-out"
          style={{
            height: `${indicatorStyle.height}px`,
            transform: `translateY(${indicatorStyle.top}px)`,
            opacity: indicatorStyle.opacity,
          }}
        />

        <ul className="space-y-3 text-sm">
          {groups.map((group) => {
            const isParentActive = activeId === group.parent.id;
            const isChildActive = group.children.some((child) => child.id === activeId);
            const isExpanded = isParentActive || isChildActive;

            const handleHeadingClick = (e: React.MouseEvent, id: string) => {
              e.preventDefault();
              document.getElementById(id)?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
              setActiveId(id);
            };

            return (
              <li key={group.parent.id} className="space-y-1.5">
                {/* Parent H2 */}
                <a
                  href={`#${group.parent.id}`}
                  data-id={group.parent.id}
                  className={cn(
                    "block py-0.5 text-sm font-medium transition-all duration-200 hover:text-emerald-400",
                    isParentActive
                      ? "text-emerald-500 dark:text-emerald-400 font-semibold translate-x-0.5"
                      : "text-text-secondary"
                  )}
                  onClick={(e) => handleHeadingClick(e, group.parent.id)}
                >
                  {group.parent.text}
                </a>

                {/* Collapsible Children H3 */}
                {group.children.length > 0 && (
                  <ul
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out pl-3 space-y-1.5 border-l border-border/30",
                      isExpanded
                        ? "max-h-96 opacity-100 mt-1 mb-2 py-0.5"
                        : "max-h-0 opacity-0 pointer-events-none"
                    )}
                  >
                    {group.children.map((child) => {
                      const isCurrentActive = activeId === child.id;
                      return (
                        <li key={child.id}>
                          <a
                            href={`#${child.id}`}
                            data-id={child.id}
                            className={cn(
                              "block text-xs transition-all duration-200 hover:text-emerald-400",
                              isCurrentActive
                                ? "text-emerald-500 dark:text-emerald-400 font-semibold translate-x-0.5"
                                : "text-text-muted"
                            )}
                            onClick={(e) => handleHeadingClick(e, child.id)}
                          >
                            {child.text}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
