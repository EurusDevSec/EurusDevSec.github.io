import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PostContent from '@/components/blog/PostContent'
import TOC from '@/components/blog/TOC'
import TagBadge from '@/components/blog/TagBadge'
import ReadingTime from '@/components/blog/ReadingTime'
import BlogCommentSection from '@/components/blog/BlogCommentSection'
import { getPostBySlug, getAllSlugs, extractHeadings } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { createClient } from '@/lib/supabase/server'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt ?? post.description,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author ?? 'EurusDevSec'],
      tags: post.tags,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const headings = post.ShowToc !== false ? extractHeadings(post.content) : []

  // Fetch blog comments by slug
  const supabase = await createClient()
  const { data: comments } = await supabase
    .from('comments')
    .select(`
      id, content, created_at,
      profiles ( username, display_name )
    `)
    .eq('blog_slug', slug)
    .order('created_at', { ascending: true })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-text-muted">
          <Link href="/" className="hover:text-emerald-400">Trang chủ</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-emerald-400">Blog</Link>
          <span>/</span>
          <span className="text-text-secondary line-clamp-1">{post.title}</span>
        </nav>

        <div className="flex gap-10">
          {/* ── MAIN CONTENT ── */}
          <article className="min-w-0 flex-1">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {post.categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/blog?category=${encodeURIComponent(cat)}`}
                    className="text-sm font-medium uppercase tracking-wider text-emerald-400/80 hover:text-emerald-400"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-text-primary md:text-4xl">
              {post.title}
            </h1>

            {/* Meta bar */}
            <div className="mb-8 flex flex-wrap items-center gap-4 border-b border-white/[0.06] pb-6 text-sm text-text-muted">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-xs font-bold text-emerald-400">
                  E
                </div>
                <span>{post.author ?? 'EurusDevSec'}</span>
              </div>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <ReadingTime text={post.readingTime} />
              {post.wordCount && (
                <span>{post.wordCount.toLocaleString()} từ</span>
              )}
            </div>

            {/* MDX Content */}
            <PostContent content={post.content} />

            {/* Tags footer */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-6">
                <span className="text-sm text-text-muted">Tags:</span>
                {post.tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} size="md" />
                ))}
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 border-t border-white/[0.06] pt-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-emerald-400"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Quay lại Blog
              </Link>
            </div>

            {/* ── COMMENTS ── */}
            <BlogCommentSection
              blogSlug={slug}
              comments={(comments ?? []) as any}
              currentUserId={user?.id}
            />
          </article>

          {/* ── SIDEBAR (TOC) ── */}
          {headings.length > 0 && (
            <aside className="hidden w-60 shrink-0 xl:block">
              <div className="sticky top-24">
                <TOC headings={headings} />
              </div>
            </aside>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
