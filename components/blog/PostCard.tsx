import Link from 'next/link'
import type { PostMeta } from '@/lib/types'
import { formatDate, cn } from '@/lib/utils'
import TagBadge from './TagBadge'
import ReadingTime from './ReadingTime'

interface PostCardProps {
  post: PostMeta
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-surface/60 transition-all duration-300',
        'hover:border-accent/30 hover:shadow-[0_0_30px_hsl(189_94%_43%/0.08)] hover:-translate-y-0.5',
        featured && 'md:col-span-2'
      )}
    >
      {/* Gradient glow on hover */}
      <div className="absolute inset-0 bg-card-glow opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Featured badge */}
      {featured && (
        <div className="absolute right-4 top-4 z-10">
          <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
            ✦ Nổi bật
          </span>
        </div>
      )}

      <div className="relative flex flex-col gap-3 p-6">
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.categories.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="text-xs font-medium uppercase tracking-wider text-accent/70"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2
          className={cn(
            'font-bold leading-snug text-text-primary transition-colors group-hover:text-accent',
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

        {/* Meta row */}
        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-text-muted">
          <div className="flex items-center gap-3">
            {/* Author avatar placeholder */}
            <div className="flex items-center gap-1.5">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-[10px] font-bold text-accent">
                E
              </div>
              <span>{post.author ?? 'EurusDevSec'}</span>
            </div>
            <span className="text-border">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
          <ReadingTime text={post.readingTime} />
        </div>
      </div>

      {/* Bottom accent line on hover */}
      <div className="h-px w-0 bg-gradient-to-r from-accent to-secondary transition-all duration-500 group-hover:w-full" />
    </Link>
  )
}
