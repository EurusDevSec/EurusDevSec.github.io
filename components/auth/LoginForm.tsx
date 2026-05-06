'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { loginAction } from '@/lib/actions/auth'

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, null)

  return (
    <div className="glass-card p-8">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-text-primary">Đăng nhập</h1>
        <p className="mt-1 text-sm text-text-muted">
          Chào mừng trở lại 👋
        </p>
      </div>

      <form action={action} className="space-y-4">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-text-secondary"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-muted transition-colors focus:border-accent/60 focus:ring-1 focus:ring-accent/30"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-medium text-text-secondary"
          >
            Mật khẩu
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-muted transition-colors focus:border-accent/60 focus:ring-1 focus:ring-accent/30"
          />
        </div>

        {/* Error */}
        {state?.error && (
          <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
            <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            {state.error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg border border-accent/30 bg-accent/10 py-2.5 text-sm font-semibold text-accent transition-all hover:bg-accent/20 hover:border-accent/60 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Đang đăng nhập...
            </span>
          ) : (
            'Đăng nhập'
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        Chưa có tài khoản?{' '}
        <Link href="/register" className="font-medium text-accent hover:underline">
          Đăng ký ngay
        </Link>
      </p>
    </div>
  )
}
