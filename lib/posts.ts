import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { PostFrontmatter, PostMeta, Post, Heading } from './types'
import { slugify, stripMarkdown, truncate } from './utils'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

/**
 * Rewrite relative image paths in markdown content.
 * Hugo resolves `![](image.jpg)` relative to the post folder automatically.
 * Next.js serves from public/, so we rewrite to `/blog-images/[slug]/image.jpg`.
 */
function rewriteImagePaths(content: string, slug: string): string {
  // Match ![alt](path) where path is NOT absolute (http/https or /)
  return content.replace(
    /!\[([^\]]*)\]\((?!https?:\/\/)(?!\/)([^)]+)\)/g,
    (_, alt, relativePath) => {
      // Strip leading ./ if present
      const cleanPath = relativePath.replace(/^\.\//, '')
      return `![${alt}](/blog-images/${slug}/${cleanPath})`
    }
  )
}

/**
 * Extract the first image from markdown content to use as fallback cover.
 */
function extractFirstImage(content: string, slug: string): string | undefined {
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/
  const match = content.match(imageRegex)
  if (match) {
    const rawPath = match[2].trim()
    if (/^(https?:\/\/|\/)/.test(rawPath)) {
      return rawPath
    }
    const cleanPath = rawPath.replace(/^\.\//, '')
    return `/blog-images/${slug}/${cleanPath}`
  }
  return undefined
}

/**
 * Resolve the slug for a post entry.
 * Priority: frontmatter.slug > slugify(name)
 */
function resolveSlug(name: string, frontmatter: PostFrontmatter): string {
  if (frontmatter.slug) return frontmatter.slug
  return slugify(name)
}

/**
 * Read a single post file and return raw matter result.
 */
function readPostFile(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  return matter(raw)
}

/**
 * Get all post entries from content/posts.
 * Supports both single .md files and folder-based posts (index.md).
 */
export async function getAllPosts(): Promise<PostMeta[]> {
  if (!fs.existsSync(POSTS_DIR)) return []

  const entries = fs.readdirSync(POSTS_DIR, { withFileTypes: true })
  const posts: PostMeta[] = []

  for (const entry of entries) {
    let filePath: string
    let entryName: string

    if (entry.isDirectory()) {
      const indexPath = path.join(POSTS_DIR, entry.name, 'index.md')
      if (!fs.existsSync(indexPath)) continue
      filePath = indexPath
      entryName = entry.name
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      filePath = path.join(POSTS_DIR, entry.name)
      entryName = entry.name.replace(/\.mdx?$/, '')
    } else {
      continue
    }

    const { data, content } = readPostFile(filePath)
    const frontmatter = data as PostFrontmatter
    const slug = resolveSlug(entryName, frontmatter)
    const stats = readingTime(content)
    const excerpt = frontmatter.description || truncate(stripMarkdown(content), 160)

    let cover = frontmatter.cover
    if (!cover?.image) {
      const firstImg = extractFirstImage(content, slug)
      if (firstImg) {
        cover = {
          ...cover,
          image: firstImg,
          alt: frontmatter.title
        }
      }
    }

    posts.push({
      ...frontmatter,
      cover,
      slug,
      readingTime: stats.text,
      wordCount: stats.words,
      excerpt,
    })
  }

  // Sort by date descending (newest first)
  return posts
    .filter((p) => p.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Get a single post by slug with full content.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!fs.existsSync(POSTS_DIR)) return null

  const entries = fs.readdirSync(POSTS_DIR, { withFileTypes: true })

  for (const entry of entries) {
    let filePath: string
    let entryName: string

    if (entry.isDirectory()) {
      const indexPath = path.join(POSTS_DIR, entry.name, 'index.md')
      if (!fs.existsSync(indexPath)) continue
      filePath = indexPath
      entryName = entry.name
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      filePath = path.join(POSTS_DIR, entry.name)
      entryName = entry.name.replace(/\.mdx?$/, '')
    } else {
      continue
    }

    const { data, content } = readPostFile(filePath)
    const frontmatter = data as PostFrontmatter
    const postSlug = resolveSlug(entryName, frontmatter)

    if (postSlug === slug) {
      const stats = readingTime(content)
      const excerpt = frontmatter.description || truncate(stripMarkdown(content), 160)
      // Rewrite relative image paths → /blog-images/[slug]/filename
      const rewrittenContent = rewriteImagePaths(content, postSlug)

      let cover = frontmatter.cover
      if (!cover?.image) {
        const firstImg = extractFirstImage(content, postSlug)
        if (firstImg) {
          cover = {
            ...cover,
            image: firstImg,
            alt: frontmatter.title
          }
        }
      }

      return {
        ...frontmatter,
        cover,
        slug: postSlug,
        readingTime: stats.text,
        wordCount: stats.words,
        excerpt,
        content: rewrittenContent,
      }
    }
  }

  return null
}

/**
 * Get all slugs for static path generation.
 */
export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts()
  return posts.map((p) => p.slug)
}

/**
 * Get all unique tags across all posts.
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tags = new Set<string>()
  posts.forEach((p) => p.tags?.forEach((t) => tags.add(t)))
  return Array.from(tags).sort()
}

/**
 * Get all unique categories across all posts.
 */
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts()
  const categories = new Set<string>()
  posts.forEach((p) => p.categories?.forEach((c) => categories.add(c)))
  return Array.from(categories).sort()
}

/**
 * Get featured posts (frontmatter.featured = true).
 */
export async function getFeaturedPosts(limit = 3): Promise<PostMeta[]> {
  const posts = await getAllPosts()
  return posts.filter((p) => p.featured).slice(0, limit)
}

/**
 * Get latest posts with optional limit.
 */
export async function getLatestPosts(limit = 6): Promise<PostMeta[]> {
  const posts = await getAllPosts()
  return posts.slice(0, limit)
}

/**
 * Extract headings from markdown content for TOC.
 */
export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings: Heading[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1').trim()
    // Generate ID matching rehype-slug behavior
    const id = text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '')
    headings.push({ id, text, level })
  }

  return headings
}
