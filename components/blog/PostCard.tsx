import Link from 'next/link'
import Image from 'next/image'
import type { PostMeta } from '@/lib/types'
import { formatDate, cn } from '@/lib/utils'
import TagBadge from './TagBadge'
import ReadingTime from './ReadingTime'

interface PostCardProps {
  post: PostMeta
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const hasCoverImage = post.cover?.image

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'glow-card group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-surface/60 shadow-sm transition-all duration-300',
        'hover:border-emerald-500/40 hover:shadow-[0_8px_30px_hsl(160_84%_39%/0.12)] hover:-translate-y-1 hover:scale-[1.02]',
        featured && 'md:col-span-2'
      )}
    >
      {/* Gradient glow on hover */}
      <div className="absolute inset-0 card-glow opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

      {/* Featured badge */}
      {featured && (
        <div className="absolute right-4 top-4 z-10">
          <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent backdrop-blur-sm">
            ✦ Nổi bật
          </span>
        </div>
      )}

      {/* Thumbnail Image */}
      {hasCoverImage && post.cover?.image && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-elevated">
          <Image
            src={post.cover.image}
            alt={post.cover.alt || post.title}
            fill
            className={cn(
              "object-cover transition-transform duration-500 group-hover:scale-110",
              post.cover.position === "top" && "object-top",
              post.cover.position === "bottom" && "object-bottom",
              post.cover.position === "left" && "object-left",
              post.cover.position === "right" && "object-right",
              (!post.cover.position || post.cover.position === "center") && "object-center"
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Gradient overlay for better text readability if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      )}

      <div className="relative flex flex-1 flex-col gap-3 p-6">
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.categories.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="text-xs font-semibold uppercase tracking-wider text-accent/80 transition-colors group-hover:text-accent"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2
          className={cn(
            'font-bold leading-tight text-text-primary transition-colors duration-200 group-hover:text-accent',
            featured ? 'text-2xl' : 'text-lg'
          )}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="line-clamp-3 text-sm leading-relaxed text-text-secondary">
            {post.excerpt}
          </p>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 4).map((tag) => (
              <TagBadge key={tag} tag={tag} href={false} />
            ))}
          </div>
        )}

        {/* Meta row - pushed to bottom with mt-auto */}
        <div className="mt-auto flex items-center justify-between border-t border-border/40 pt-3 text-xs text-text-muted">
          <div className="flex items-center gap-2.5">
            {/* Author avatar */}
            <div className="flex items-center gap-1.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-[10px] font-bold text-accent ring-1 ring-accent/30 transition-all duration-200 group-hover:bg-accent/30 group-hover:ring-accent/50">
                E
              </div>
              <span className="font-medium">{post.author ?? 'EurusDevSec'}</span>
            </div>
            <span className="text-border">·</span>
            <time dateTime={post.date} className="font-medium">
              {formatDate(post.date)}
            </time>
          </div>
          <ReadingTime text={post.readingTime} />
        </div>
      </div>

      {/* Bottom accent line on hover */}
      <div className="h-0.5 w-0 bg-gradient-to-r from-accent via-secondary to-accent transition-all duration-500 group-hover:w-full" />
    </Link>
  )
}
