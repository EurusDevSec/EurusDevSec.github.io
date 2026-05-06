// Shared TypeScript types for the blog

export interface PostFrontmatter {
  title: string
  date: string
  tags?: string[]
  categories?: string[]
  author?: string
  description?: string
  /** URL-friendly slug (overrides filename) */
  slug?: string
  /** Show Table of Contents */
  ShowToc?: boolean
  TocOpen?: boolean
  comments?: boolean
  /** Pin to homepage featured section */
  featured?: boolean
  cover?: {
    image?: string
    alt?: string
  }
}

export interface PostMeta extends Omit<PostFrontmatter, 'slug'> {
  slug: string
  readingTime: string
  wordCount: number
  excerpt?: string
}

export interface Post extends PostMeta {
  content: string
}

export interface Heading {
  id: string
  text: string
  level: number
}

// Community posts (Supabase)
export interface CommunityPostMeta {
  id: string
  title: string
  slug: string
  excerpt?: string
  cover_image?: string
  tags?: string[]
  category?: string
  status: 'draft' | 'published'
  views: number
  published_at?: string
  created_at: string
  author: {
    id: string
    username: string
    display_name?: string
    avatar_url?: string
  }
}

export interface Profile {
  id: string
  username: string
  display_name?: string
  avatar_url?: string
  bio?: string
  website?: string
  role: 'reader' | 'writer' | 'admin'
  created_at: string
}
