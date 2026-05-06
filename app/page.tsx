import Link from 'next/link'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PostCard from '@/components/blog/PostCard'
import { getLatestPosts, getFeaturedPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'EurusDevSec — DevSecOps Blog',
  description:
    'Blog cá nhân về DevSecOps, Cloud, Cybersecurity và trải nghiệm cuộc sống của EurusDevSec.',
}

const CATEGORIES = [
  { icon: '🛡️', label: 'DevSecOps & Security', color: 'text-cyan-400' },
  { icon: '☁️', label: 'Cloud & AWS', color: 'text-blue-400' },
  { icon: '🔧', label: 'Tutorial & Projects', color: 'text-emerald-400' },
  { icon: '📖', label: 'Văn học & Đọc sách', color: 'text-violet-400' },
  { icon: '🌱', label: 'Trải nghiệm sống', color: 'text-orange-400' },
]

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/eurusdevsec', icon: 'GH' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/eurusdevsec', icon: 'LI' },
]

export default async function HomePage() {
  const [latestPosts, featuredPosts] = await Promise.all([
    getLatestPosts(3),
    getFeaturedPosts(1),
  ])

  return (
    <>
      <Navbar />
      <main>
        {/* ── HERO ── */}
        <section className="relative overflow-hidden py-24 md:py-32">
          {/* Animated grid background */}
          <div className="hero-grid absolute inset-0" />
          {/* Radial glow */}
          <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent/5 blur-[120px]" />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              {/* Status badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs text-accent">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                IT Student → DevSecOps Engineer
              </div>

              {/* Name */}
              <h1 className="mb-4 text-5xl font-extrabold tracking-tight md:text-7xl">
                <span className="gradient-text">EurusDevSec</span>
              </h1>

              {/* Tagline */}
              <p className="mb-8 text-lg leading-relaxed text-text-secondary md:text-xl">
                Nơi tôi chia sẻ hành trình chinh phục{' '}
                <span className="font-semibold text-accent">DevSecOps</span>,{' '}
                <span className="font-semibold text-secondary">Cloud</span>,
                phân tích văn học và những khoảnh khắc đáng nhớ trong cuộc sống.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/blog" className="btn-primary">
                  Đọc Blog
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/community" className="btn-secondary">
                  Community
                </Link>
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-xs font-bold text-text-muted transition-all hover:border-accent/30 hover:bg-accent/10 hover:text-accent"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CATEGORIES ── */}
        <section className="border-y border-border/50 bg-surface/30 py-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.label}
                  href="/blog"
                  className="flex items-center gap-2 rounded-lg border border-border/60 bg-surface px-4 py-2.5 text-sm text-text-secondary transition-all hover:border-accent/30 hover:text-text-primary"
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span>{cat.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── TWO-COLUMN PREVIEW ── */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Personal Blog preview */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="section-heading">
                    📝 Blog của tôi
                  </h2>
                  <p className="mt-1 text-sm text-text-muted">
                    Bài viết từ góc nhìn của EurusDevSec
                  </p>
                </div>
                <Link
                  href="/blog"
                  className="text-sm text-accent transition-colors hover:underline"
                >
                  Xem tất cả →
                </Link>
              </div>

              {latestPosts.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {latestPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border p-8 text-center text-text-muted">
                  Chưa có bài viết nào.
                </div>
              )}
            </div>

            {/* Community preview */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="section-heading">
                    👥 Community
                  </h2>
                  <p className="mt-1 text-sm text-text-muted">
                    Bài viết từ cộng đồng
                  </p>
                </div>
                <Link
                  href="/community"
                  className="text-sm text-accent transition-colors hover:underline"
                >
                  Xem tất cả →
                </Link>
              </div>

              {/* Placeholder — Phase 3 */}
              <div className="rounded-xl border border-dashed border-border bg-surface/40 p-10 text-center">
                <div className="mb-3 text-3xl">✍️</div>
                <p className="text-sm font-medium text-text-secondary">
                  Community đang được xây dựng
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  Sắp ra mắt — đăng ký để viết bài đầu tiên
                </p>
                <Link href="/register" className="btn-primary mt-4">
                  Tạo tài khoản
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT STRIP ── */}
        <section className="border-t border-border/50 bg-surface/30 py-14">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="mb-3 text-2xl font-bold text-text-primary">Về EurusDevSec</h2>
            <p className="leading-relaxed text-text-secondary">
              Mình là sinh viên IT sắp ra trường, đang theo đuổi lộ trình{' '}
              <span className="text-accent">DevSecOps</span>. Blog này là nơi mình lưu
              lại hành trình — từ lab AWS, project DevOps cho đến những suy nghĩ về
              văn học và cuộc sống. Nếu bạn cũng đang trên con đường này, hãy cùng
              nhau chia sẻ!
            </p>
            <Link href="/about" className="btn-secondary mt-6 inline-flex">
              Xem thêm về mình →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
