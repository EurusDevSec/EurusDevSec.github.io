"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-surface/80 text-text-secondary shadow-lg backdrop-blur-md transition-all duration-300 hover:border-emerald-500/30 hover:text-emerald-400 hover:bg-emerald-500/5 hover:scale-110 active:scale-95",
        isVisible ? "translate-y-0 opacity-100 visible" : "translate-y-4 opacity-0 invisible"
      )}
      aria-label="Quay lại đầu trang"
      title="Quay lại đầu trang"
    >
      <svg
        className="h-5 w-5 animate-pulse"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
}
