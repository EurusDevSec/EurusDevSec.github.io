"use client";

import LikeButton from "./LikeButton";
import ShareButton from "./ShareButton";

interface PostActionsProps {
  slug: string;
  title: string;
  isFloating?: boolean;
}

export default function PostActions({ slug, title, isFloating = false }: PostActionsProps) {
  const scrollToComments = () => {
    const el = document.getElementById("comments-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isFloating) {
    return (
      <div className="flex flex-col items-center gap-6">
        {/* Like */}
        <LikeButton slug={slug} isFloating />

        {/* Comment Link */}
        <button
          onClick={scrollToComments}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-surface/80 text-text-secondary hover:border-emerald-500/30 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all duration-300 active:scale-95"
          aria-label="Cuộn đến bình luận"
          title="Bình luận"
        >
          <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>

        {/* Share Dropdown */}
        <ShareButton slug={slug} title={title} isFloating />
      </div>
    );
  }

  // Inline layout for mobile/tablet & end of post
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-6 border-y border-border/40 my-8">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-text-muted">Thích bài viết:</span>
        <LikeButton slug={slug} />
      </div>
      <div className="h-4 w-px bg-border/60" />
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-text-muted">Chia sẻ:</span>
        <ShareButton slug={slug} title={title} />
      </div>
      <div className="h-4 w-px bg-border/60" />
      <button
        onClick={scrollToComments}
        className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/80 text-text-secondary hover:border-emerald-500/30 hover:text-emerald-400 hover:bg-emerald-500/5 px-4 py-2 text-sm font-semibold transition-all duration-300 active:scale-95"
      >
        <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        Bình luận
      </button>
    </div>
  );
}
