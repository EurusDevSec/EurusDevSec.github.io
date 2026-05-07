"use client";

import { useActionState } from "react";
import Link from "next/link";
import { secureRegisterAction } from "@/lib/actions/auth-secure";

export default function RegisterForm() {
  const [state, action, pending] = useActionState(secureRegisterAction, null);

  const inputClass = (field?: string) =>
    `w-full rounded-lg border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-muted transition-colors focus:ring-1 ${
      state?.field === field
        ? "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/20"
        : "border-border focus:border-accent/60 focus:ring-accent/30"
    }`;

  if (state?.success) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-3xl">
          ✉️
        </div>
        <h2 className="text-xl font-bold text-text-primary">Kiểm tra email!</h2>
        <p className="mt-2 text-sm text-text-secondary">{state.success}</p>
        <Link href="/login" className="btn-primary mt-6">
          Đến trang đăng nhập
        </Link>
      </div>
    );
  }

  return (
    <div className="glass-card p-8">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-text-primary">Tạo tài khoản</h1>
        <p className="mt-1 text-sm text-text-muted">
          Tham gia cộng đồng EurusDevSec 🚀
        </p>
      </div>

      <form action={action} className="space-y-4">
        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="mb-1.5 block text-sm font-medium text-text-secondary"
          >
            Username{" "}
            <span className="text-xs text-text-muted">
              (chỉ a-z, 0-9, _, -)
            </span>
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            autoComplete="username"
            placeholder="username"
            pattern="[a-z0-9_\-]{3,30}"
            className={inputClass("username")}
          />
        </div>

        {/* Display name */}
        <div>
          <label
            htmlFor="display_name"
            className="mb-1.5 block text-sm font-medium text-text-secondary"
          >
            Tên hiển thị{" "}
            <span className="text-xs text-text-muted">(tùy chọn)</span>
          </label>
          <input
            id="display_name"
            name="display_name"
            type="text"
            autoComplete="name"
            placeholder="Tên của bạn"
            className={inputClass()}
          />
        </div>

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
            className={inputClass("email")}
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-medium text-text-secondary"
          >
            Mật khẩu{" "}
            <span className="text-xs text-text-muted">
              (8+ ký tự, chữ hoa, số)
            </span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            placeholder="••••••••"
            minLength={8}
            className={inputClass("password")}
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirm_password"
            className="mb-1.5 block text-sm font-medium text-text-secondary"
          >
            Xác nhận mật khẩu
          </label>
          <input
            id="confirm_password"
            name="confirm_password"
            type="password"
            required
            autoComplete="new-password"
            placeholder="••••••••"
            minLength={8}
            className={inputClass("confirm_password")}
          />
        </div>

        {/* Error */}
        {state?.error && (
          <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
            <svg
              className="h-4 w-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
            {state.error}
          </div>
        )}

        {/* Terms note */}
        <p className="text-xs text-text-muted">
          Bằng cách đăng ký, bạn đồng ý với{" "}
          <span className="text-accent">Điều khoản sử dụng</span> của chúng tôi.
        </p>

        {/* Submit */}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg border border-accent/30 bg-accent/10 py-2.5 text-sm font-semibold text-accent transition-all hover:bg-accent/20 hover:border-accent/60 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="h-4 w-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Đang tạo tài khoản...
            </span>
          ) : (
            "Tạo tài khoản"
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        Đã có tài khoản?{" "}
        <Link href="/login" className="font-medium text-accent hover:underline">
          Đăng nhập
        </Link>
      </p>
    </div>
  );
}
