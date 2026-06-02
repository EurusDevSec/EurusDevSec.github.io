"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  slug: string;
  title: string;
  isFloating?: boolean;
}

export default function ShareButton({ slug, title, isFloating = false }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/blog/${slug}`;
    }
    return "";
  };

  const handleCopy = async () => {
    const url = getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const shareToTwitter = () => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(`Đọc bài viết hay từ EurusDevSec: "${title}"`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
  };

  const shareToFacebook = () => {
    const url = encodeURIComponent(getShareUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
  };

  const menuContent = (
    <div className={cn(
      "absolute z-10 w-44 rounded-xl border border-border bg-surface/95 p-1 shadow-lg backdrop-blur-md transition-all duration-200",
      isFloating 
        ? "left-14 top-0 origin-left" 
        : "bottom-12 right-0 origin-bottom-right",
      open ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"
    )}>
      <button
        onClick={handleCopy}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-text-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-primary transition-colors"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
        {copied ? "Đã sao chép!" : "Sao chép liên kết"}
      </button>
      <button
        onClick={shareToTwitter}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-text-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-primary transition-colors"
      >
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Chia sẻ Twitter
      </button>
      <button
        onClick={shareToFacebook}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-text-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-primary transition-colors"
      >
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        Chia sẻ Facebook
      </button>
    </div>
  );

  return (
    <div 
      className="relative"
      onMouseEnter={() => !isFloating && setOpen(true)}
      onMouseLeave={() => !isFloating && setOpen(false)}
    >
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center justify-center rounded-full border border-border/60 bg-surface/80 text-text-secondary hover:border-emerald-500/30 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all duration-300 active:scale-95",
          isFloating ? "h-12 w-12" : "gap-2 px-4 py-2 text-sm font-medium"
        )}
        aria-label="Chia sẻ bài viết"
      >
        <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 10.742l5.028-2.514m0 0a3 3 0 10-2.243-4.077L7.74 6.726a3 3 0 100 5.436l6.726 3.363a3 3 0 102.243-4.077" />
        </svg>
        {!isFloating && <span className="font-semibold">Chia sẻ</span>}
      </button>
      {menuContent}
    </div>
  );
}
