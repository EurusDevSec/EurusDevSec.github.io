import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

interface CommunityPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  tags: string[];
  created_at: string;
  cover_image?: string | null;
  profiles: {
    username: string;
    display_name: string | null;
  } | null;
}

export default function CommunityPostCard({ post }: { post: CommunityPost }) {
  const author =
    post.profiles?.display_name || post.profiles?.username || "Anonymous";
  const initial = author.charAt(0).toUpperCase();

  return (
    <Link
      href={`/community/${post.slug}`}
      className="glow-card group relative flex flex-col gap-3 rounded-xl border border-border/60 bg-surface/60 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-secondary/30 hover:shadow-[0_8px_30px_hsl(258_90%_73%/0.08)]"
    >
      {/* Gradient glow on hover */}
      <div className="absolute inset-0 card-glow opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
      {post.cover_image && (
        <div className="relative h-40 w-full overflow-hidden bg-surface">
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-col gap-3 p-5">
        <h2 className="font-semibold leading-snug text-text-primary transition-colors group-hover:text-secondary">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="line-clamp-2 text-sm text-text-secondary">
            {post.excerpt}
          </p>
        )}

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-secondary/20 bg-secondary/10 px-2 py-0.5 text-xs text-secondary/80"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-text-muted">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary/20 text-[10px] font-bold text-secondary">
            {initial}
          </div>
          <span>{author}</span>
          <span>·</span>
          <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
        </div>

        <div className="h-px w-0 bg-gradient-to-r from-secondary to-accent transition-all duration-500 group-hover:w-full" />
      </div>
    </Link>
  );
}
