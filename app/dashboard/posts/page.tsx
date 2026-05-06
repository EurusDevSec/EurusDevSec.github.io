import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import { deletePostFormAction } from '@/lib/actions/post-delete'

export const metadata: Metadata = { title: 'Bài viết của tôi' }

export default async function DashboardPostsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, tags, created_at, published')
    .eq('author_id', user.id)
    .order('created_at', { ascending: false })

  const postList = posts ?? []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Bài viết của tôi</h1>
          <p className="mt-1 text-sm text-text-muted">
            {postList.length} bài viết trên Community
          </p>
        </div>
        <Link href="/community/write" className="btn-primary text-sm">
          + Viết bài mới
        </Link>
      </div>

      {postList.length > 0 ? (
        <div className="space-y-3">
          {postList.map((post) => (
            <div
              key={post.id}
              className="flex items-start justify-between gap-4 rounded-xl border border-border/60 bg-surface/60 p-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                      post.published
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-orange-500/10 text-orange-400'
                    }`}
                  >
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                  <Link
                    href={`/community/${post.slug}`}
                    className="truncate font-semibold text-text-primary hover:text-accent"
                  >
                    {post.title}
                  </Link>
                </div>
                <p className="mt-1 line-clamp-1 text-xs text-text-muted">
                  {formatDate(post.created_at)}
                  {post.tags?.length > 0 && ` · ${post.tags.slice(0, 3).join(', ')}`}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/community/${post.slug}`}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs text-text-secondary transition-colors hover:border-accent/30 hover:text-accent"
                >
                  Xem
                </Link>
                <form action={deletePostFormAction}>
                  <input type="hidden" name="post_id" value={post.id} />
                  <button
                    type="submit"
                    className="rounded-lg border border-red-500/20 px-3 py-1.5 text-xs text-red-400 transition-colors hover:bg-red-500/10"
                  >
                    Xóa
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-surface/40 py-16 text-center">
          <div className="mb-3 text-4xl">📝</div>
          <p className="text-sm font-medium text-text-secondary">
            Bạn chưa có bài viết nào trên Community.
          </p>
          <Link href="/community/write" className="btn-primary mt-4">
            Viết bài đầu tiên
          </Link>
        </div>
      )}
    </div>
  )
}
