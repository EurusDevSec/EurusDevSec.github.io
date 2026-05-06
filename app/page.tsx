import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PostCard from '@/components/blog/PostCard'
import { getLatestPosts } from '@/lib/posts'

export default async function HomePage() {
  const latestPosts = await getLatestPosts(6)

  return (
    <>
      <Navbar />

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden">
        <div className="hero-grid absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-hero-glow" />

        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">DevSecOps · Cloud · Life</span>
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-text-primary sm:text-5xl">
              Hi, I&apos;m{' '}
              <span className="gradient-text">EurusDevSec</span>
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-text-secondary">
              Sinh viên IT sắp ra trường, đam mê DevSecOps và Cloud. Blog này là nơi tôi chia sẻ kiến thức kỹ thuật, phân tích văn học, và những trải nghiệm cuộc sống.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/blog" className="btn-primary">
                Đọc Blog
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/about" className="btn-secondary">
                Về tôi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Latest Posts ── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="section-heading">Bài viết mới nhất</h2>
            <p className="mt-1 text-sm text-text-muted">
              Chia sẻ kiến thức và trải nghiệm
            </p>
          </div>
          <Link href="/blog" className="btn-secondary text-sm">
            Xem tất cả
          </Link>
        </div>

        {latestPosts.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-text-muted py-12">
            Chưa có bài viết nào.
          </p>
        )}
      </section>

      <Footer />
    </>
  )
}
