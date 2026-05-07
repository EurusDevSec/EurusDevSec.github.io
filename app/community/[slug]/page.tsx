import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CommentSection from '@/components/community/CommentSection'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('posts')
    .select('title, excerpt')
    .eq('slug', slug)
    .single()

  return {
    title: data?.title ?? 'Community Post',
    description: data?.excerpt ?? '',
  }
}

export default async function CommunityPostPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch post + author
  const { data: post } = await supabase
    .from('posts')
    .select(`
      id, title, slug, content, excerpt, tags, created_at,
      profiles ( username, display_name )
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!post) notFound()

  // Fetch comments
  const { data: comments } = await supabase
    .from('comments')
    .select(`
      id, content, created_at,
      profiles ( username, display_name )
    `)
    .eq('post_id', post.id)
    .order('created_at', { ascending: true })

  // Current user (for comment ownership)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const author = (post.profiles as any)?.display_name || (post.profiles as any)?.username || 'Anonymous'
  const initial = author.charAt(0).toUpperCase()

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-text-muted">
          <Link href="/" className="hover:text-accent">Trang chủ</Link>
          <span>/</span>
          <Link href="/community" className="hover:text-accent">Community</Link>
          <span>/</span>
          <span className="line-clamp-1 text-text-secondary">{post.title}</span>
        </nav>

        <article>
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full border border-secondary/20 bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-text-primary md:text-4xl">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="mb-8 flex items-center gap-4 border-b border-border/60 pb-6 text-sm text-text-muted">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary/20 text-xs font-bold text-secondary">
                {initial}
              </div>
              <span>{author}</span>
            </div>
            <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
            <span>{(comments ?? []).length} bình luận</span>
          </div>

          {/* Content — react-markdown for user-generated content */}
          <div className="prose-blog">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* Back link */}
        <div className="mt-10 border-t border-border/60 pt-6">
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Quay lại Community
          </Link>
        </div>

        {/* Comments */}
        <CommentSection
          postId={post.id}
          postSlug={post.slug}
          comments={(comments ?? []) as any}
          currentUserId={user?.id}
        />
      </main>
      <Footer />
    </>
  )
}
