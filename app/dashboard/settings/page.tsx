import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import SettingsForm from '@/components/dashboard/SettingsForm'

export const metadata: Metadata = {
  title: 'Cài đặt hồ sơ',
}

export default async function SettingsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('username, display_name, bio, website')
    .eq('id', user.id)
    .maybeSingle()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Cài đặt hồ sơ</h1>
        <p className="mt-1 text-sm text-text-muted">
          Quản lý thông tin hiển thị của bạn trên EurusDevSec.
        </p>
      </div>

      {/* Avatar section */}
      <div className="rounded-xl border border-border/60 bg-surface/60 p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
          Ảnh đại diện
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-accent/20 text-2xl font-bold text-accent">
            {(profile?.display_name || user.email || 'U').charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm text-text-secondary">
              Tính năng upload avatar sẽ có trong phiên bản tiếp theo.
            </p>
            <p className="mt-0.5 text-xs text-text-muted">
              Hiện tại hiển thị ký tự đầu của tên.
            </p>
          </div>
        </div>
      </div>

      {/* Profile info */}
      <div className="rounded-xl border border-border/60 bg-surface/60 p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
          Thông tin hồ sơ
        </h2>
        <SettingsForm
          displayName={profile?.display_name ?? undefined}
          bio={profile?.bio ?? undefined}
          website={profile?.website ?? undefined}
          username={profile?.username ?? undefined}
        />
      </div>

      {/* Account info */}
      <div className="rounded-xl border border-border/60 bg-surface/60 p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
          Tài khoản
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Email</span>
            <span className="text-sm font-medium text-text-primary">{user.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Xác thực email</span>
            <span className={`text-xs font-medium ${user.email_confirmed_at ? 'text-emerald-400' : 'text-orange-400'}`}>
              {user.email_confirmed_at ? '✓ Đã xác thực' : '⚠ Chưa xác thực'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
