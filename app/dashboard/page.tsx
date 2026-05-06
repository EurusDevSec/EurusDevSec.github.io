import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Get profile + post count
  const [{ data: profile }, { count: postCount }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).maybeSingle(),
    supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('author_id', user.id),
  ])

  const memberSince = profile?.created_at
    ? formatDate(profile.created_at)
    : formatDate(user.created_at)

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="rounded-xl border border-accent/20 bg-gradient-to-r from-accent/5 to-secondary/5 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 bg-accent/20 text-2xl font-bold text-accent">
            {(profile?.display_name || user.email || 'U').charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">
              Chào, {profile?.display_name || profile?.username || 'bạn'} 👋
            </h1>
            <p className="text-sm text-text-muted">
              @{profile?.username} · Thành viên từ {memberSince}
            </p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border/60 bg-surface/60 p-5">
          <p className="text-xs uppercase tracking-wider text-text-muted">Bài đã viết</p>
          <p className="mt-1 text-3xl font-bold text-accent">{postCount ?? 0}</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-surface/60 p-5">
          <p className="text-xs uppercase tracking-wider text-text-muted">Role</p>
          <p className="mt-1 text-sm font-semibold capitalize text-secondary">
            {profile?.role ?? 'writer'}
          </p>
        </div>
        <div className="col-span-2 rounded-xl border border-border/60 bg-surface/60 p-5 sm:col-span-1">
          <p className="text-xs uppercase tracking-wider text-text-muted">Bio</p>
          <p className="mt-1 text-sm text-text-secondary line-clamp-2">
            {profile?.bio || 'Chưa có bio. Cập nhật hồ sơ!'}
          </p>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
          Hành động nhanh
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/community/write"
            className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface/60 p-4 transition-all hover:border-accent/30 hover:bg-accent/5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-text-primary">Viết bài mới</p>
              <p className="text-xs text-text-muted">Đăng lên Community</p>
            </div>
          </Link>

          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface/60 p-4 transition-all hover:border-secondary/30 hover:bg-secondary/5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-text-primary">Cập nhật hồ sơ</p>
              <p className="text-xs text-text-muted">Chỉnh sửa bio và tên</p>
            </div>
          </Link>

          <Link
            href="/dashboard/posts"
            className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface/60 p-4 transition-all hover:border-emerald-500/30 hover:bg-emerald-500/5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-text-primary">Quản lý bài viết</p>
              <p className="text-xs text-text-muted">Draft, published, archive</p>
            </div>
          </Link>

          <Link
            href="/blog"
            className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface/60 p-4 transition-all hover:border-blue-500/30 hover:bg-blue-500/5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-text-primary">Xem Blog</p>
              <p className="text-xs text-text-muted">Trang blog chính</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
