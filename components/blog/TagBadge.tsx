import Link from 'next/link'
import { cn, getTagColor } from '@/lib/utils'

interface TagBadgeProps {
  tag: string
  href?: boolean
  className?: string
  size?: 'sm' | 'md'
}

export default function TagBadge({
  tag,
  href = true,
  className,
  size = 'sm',
}: TagBadgeProps) {
  const colorClasses = getTagColor(tag)
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'

  const content = (
    <span
      className={cn(
        'tag-pill font-medium',
        colorClasses,
        sizeClasses,
        className
      )}
    >
      {tag}
    </span>
  )

  if (!href) return content

  return (
    <Link href={`/blog/tags/${encodeURIComponent(tag.toLowerCase())}`}>
      {content}
    </Link>
  )
}
