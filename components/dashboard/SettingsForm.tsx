'use client'

import { useActionState } from 'react'
import { updateProfileAction } from '@/lib/actions/auth'

interface SettingsFormProps {
  displayName?: string
  bio?: string
  website?: string
  username?: string
}

export default function SettingsForm({
  displayName,
  bio,
  website,
  username,
}: SettingsFormProps) {
  const [state, action, pending] = useActionState(updateProfileAction, null)

  const inputClass =
    'w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-muted transition-colors focus:border-accent/60 focus:ring-1 focus:ring-accent/30'

  return (
    <form action={action} className="space-y-5">
      {/* Success */}
      {state?.success && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-400">
          <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {state.success}
        </div>
      )}

      {/* Error */}
      {state?.error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
          <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          {state.error}
        </div>
      )}

      {/* Username (read-only) */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-text-secondary">
          Username <span className="text-xs text-text-muted">(không thể thay đổi)</span>
        </label>
        <input
          type="text"
          value={username ?? ''}
          disabled
          className="w-full cursor-not-allowed rounded-lg border border-border/50 bg-surface-elevated/50 px-4 py-2.5 text-sm text-text-muted"
        />
      </div>

      {/* Display name */}
      <div>
        <label htmlFor="display_name" className="mb-1.5 block text-sm font-medium text-text-secondary">
          Tên hiển thị
        </label>
        <input
          id="display_name"
          name="display_name"
          type="text"
          defaultValue={displayName ?? ''}
          placeholder="Tên hiển thị của bạn"
          className={inputClass}
        />
      </div>

      {/* Bio */}
      <div>
        <label htmlFor="bio" className="mb-1.5 block text-sm font-medium text-text-secondary">
          Bio <span className="text-xs text-text-muted">(tối đa 200 ký tự)</span>
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={3}
          maxLength={200}
          defaultValue={bio ?? ''}
          placeholder="Giới thiệu ngắn về bạn..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Website */}
      <div>
        <label htmlFor="website" className="mb-1.5 block text-sm font-medium text-text-secondary">
          Website
        </label>
        <input
          id="website"
          name="website"
          type="url"
          defaultValue={website ?? ''}
          placeholder="https://yoursite.com"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent transition-all hover:bg-accent/20 hover:border-accent/60 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? (
          <>
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Đang lưu...
          </>
        ) : (
          'Lưu thay đổi'
        )}
      </button>
    </form>
  )
}
