import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PostCard from '@/components/blog/PostCard'
import TagBadge from '@/components/blog/TagBadge'
import { getAllPosts, getAllTags, getAllCategories } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Tất cả bài viết của EurusDevSec — DevSecOps, Cloud, AWS, Văn học và Trải nghiệm sống.',
}

const POSTS_PER_PAGE = 6

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; tag?: string; category?: string }>
}) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const activeTag = params.tag
  const activeCategory = params.category

  const [allPosts, allTags, allCategories] = await Promise.all([
    getAllPosts(),
    getAllTags(),
    getAllCategories(),
  ])

  // Filter
  const filtered = allPosts.filter((post) => {
    if (activeTag && !post.tags?.includes(activeTag)) return false
    if (activeCategory && !post.categories?.includes(activeCategory)) return false
    return true
  })

  // Paginate
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE)
  const posts = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-text-primary">
            Blog
          </h1>
          <p className="mt-2 text-text-secondary">
            {allPosts.length} bài viết · DevSecOps, Cloud, Văn học & Cuộc sống
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* ── SIDEBAR ── */}
          <aside className="w-full lg:w-60 xl:w-72 shrink-0">
            {/* Categories */}
            {allCategories.length > 0 && (
              <div className="mb-6 rounded-xl border border-border/60 bg-surface/60 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Chuyên mục
                </p>
                <ul className="space-y-1">
                  {allCategories.map((cat) => (
                    <li key={cat}>
                      <a
                        href={`/blog?category=${encodeURIComponent(cat)}`}
                        className={`block rounded-lg px-3 py-1.5 text-sm transition-colors ${
                          activeCategory === cat
                            ? 'bg-accent/10 text-accent'
                            : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'
                        }`}
                      >
                        {cat}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {allTags.length > 0 && (
              <div className="rounded-xl border border-border/60 bg-surface/60 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Tags
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {allTags.map((tag) => (
                    <TagBadge key={tag} tag={tag} href={false} />
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* ── POSTS GRID ── */}
          <div className="flex-1">
            {/* Active filters */}
            {(activeTag || activeCategory) && (
              <div className="mb-4 flex items-center gap-2 text-sm text-text-secondary">
                <span>Lọc theo:</span>
                {activeCategory && (
                  <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-0.5 text-accent">
                    {activeCategory}
                  </span>
                )}
                {activeTag && <TagBadge tag={activeTag} href={false} />}
                <a href="/blog" className="ml-2 text-xs text-text-muted hover:text-accent">
                  ✕ Xóa bộ lọc
                </a>
              </div>
            )}

            {posts.length > 0 ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  {posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <a
                        key={page}
                        href={`/blog?page=${page}${activeTag ? `&tag=${activeTag}` : ''}${activeCategory ? `&category=${activeCategory}` : ''}`}
                        className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm transition-colors ${
                          page === currentPage
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-border text-text-secondary hover:border-accent/30 hover:text-text-primary'
                        }`}
                      >
                        {page}
                      </a>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-xl border border-dashed border-border py-20 text-center text-text-muted">
                <p className="text-lg">Không tìm thấy bài viết nào.</p>
                <a href="/blog" className="mt-3 inline-block text-sm text-accent hover:underline">
                  Xóa bộ lọc
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
