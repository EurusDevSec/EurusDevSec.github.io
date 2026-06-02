"use client";

import { useEffect, useState } from "react";
import { getLikesAction, incrementLikeAction } from "@/lib/actions/likes";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  slug: string;
  isFloating?: boolean;
}

export default function LikeButton({ slug, isFloating = false }: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [showFloatingPlus, setShowFloatingPlus] = useState<boolean>(false);

  useEffect(() => {
    // 1. Fetch total likes from database
    getLikesAction(slug).then((count) => {
      setLikes(count);
    });

    // 2. Check if this client has liked this post in localStorage
    const likedStatus = localStorage.getItem(`liked_${slug}`);
    setHasLiked(likedStatus === "true");
  }, [slug]);

  const handleLike = async () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 400);

    const newLikedStatus = !hasLiked;
    setHasLiked(newLikedStatus);

    const change = newLikedStatus ? 1 : -1;
    
    // Update local UI immediately
    setLikes((prev) => Math.max(0, prev + change));
    localStorage.setItem(`liked_${slug}`, newLikedStatus ? "true" : "false");

    if (newLikedStatus) {
      setShowFloatingPlus(true);
      setTimeout(() => setShowFloatingPlus(false), 800);
    }

    // Call server action
    const serverResult = await incrementLikeAction(slug, change);
    if (serverResult !== -1) {
      setLikes(serverResult);
    }
  };

  const buttonContent = (
    <div className="relative">
      {/* Floating +1 / heart animation */}
      {showFloatingPlus && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-rose-500 animate-fade-in-up select-none pointer-events-none whitespace-nowrap">
          ❤️ +1
        </span>
      )}
      <button
        onClick={handleLike}
        className={cn(
          "relative flex items-center justify-center rounded-full border transition-all duration-300 active:scale-95 group",
          isFloating
            ? "h-12 w-12 flex-col"
            : "gap-2 px-4 py-2 text-sm font-medium",
          hasLiked
            ? "border-rose-500/30 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"
            : "border-border/60 bg-surface/80 text-text-secondary hover:border-rose-500/30 hover:text-rose-500 hover:bg-rose-500/5"
        )}
        aria-label={hasLiked ? "Bỏ thích bài viết" : "Thích bài viết"}
      >
        <svg
          className={cn(
            "transition-all duration-300",
            isFloating ? "h-5.5 w-5.5" : "h-4.5 w-4.5",
            hasLiked ? "fill-rose-500 scale-110" : "fill-none group-hover:scale-105",
            isAnimating && "animate-ping opacity-75 absolute"
          )}
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>

        {/* Duplicate SVG for animation click layer */}
        {isAnimating && (
          <svg
            className="absolute h-5.5 w-5.5 fill-rose-500 text-rose-500 animate-scale-in"
            viewBox="0 0 24 24"
          >
            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        )}

        {!isFloating && <span className="font-semibold">{likes}</span>}
      </button>
    </div>
  );

  if (isFloating) {
    return (
      <div className="flex flex-col items-center gap-1">
        {buttonContent}
        <span className="text-[11px] font-semibold text-text-muted">{likes}</span>
      </div>
    );
  }

  return buttonContent;
}
