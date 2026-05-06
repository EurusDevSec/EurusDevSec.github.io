import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO } from 'date-fns'
import { vi } from 'date-fns/locale'

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format date to Vietnamese locale string */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, 'dd MMMM, yyyy', { locale: vi })
}

/** Format date to ISO string for datetime attr */
export function formatDateISO(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, 'yyyy-MM-dd')
}

/** Convert text to URL-friendly slug */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/đ/g, 'd')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .trim()
}

/** Truncate text to max length with ellipsis */
export function truncate(text: string, maxLength = 160): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '...'
}

/** Extract plain text from markdown */
export function stripMarkdown(content: string): string {
  return content
    .replace(/#{1,6}\s+/g, '')     // headings
    .replace(/\*\*(.+?)\*\*/g, '$1') // bold
    .replace(/\*(.+?)\*/g, '$1')   // italic
    .replace(/`(.+?)`/g, '$1')     // inline code
    .replace(/```[\s\S]*?```/g, '') // code blocks
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // links
    .replace(/!\[.*?\]\(.*?\)/g, '') // images
    .replace(/^>\s+/gm, '')         // blockquotes
    .replace(/\n+/g, ' ')
    .trim()
}

/** Tag color palette (cycles through accent colors) */
const TAG_COLORS = [
  'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'bg-violet-500/10 text-violet-400 border-violet-500/20',
  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'bg-pink-500/10 text-pink-400 border-pink-500/20',
  'bg-blue-500/10 text-blue-400 border-blue-500/20',
]

export function getTagColor(tag: string): string {
  let hash = 0
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash)
  }
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length]
}
