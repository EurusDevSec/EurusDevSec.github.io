'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export type AuthState = {
  error?: string
  success?: string
  field?: string // which field caused the error
} | null

// ── LOGIN ──────────────────────────────────────────────────────────────────
export async function loginAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Vui lòng nhập đầy đủ thông tin.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      return { error: 'Email hoặc mật khẩu không đúng.' }
    }
    return { error: error.message }
  }

  redirect('/dashboard')
}

// ── REGISTER ───────────────────────────────────────────────────────────────
export async function registerAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const username = formData.get('username') as string
  const displayName = formData.get('display_name') as string

  // Validate
  if (!email || !password || !username) {
    return { error: 'Vui lòng nhập đầy đủ thông tin.' }
  }
  if (password.length < 6) {
    return { error: 'Mật khẩu phải ít nhất 6 ký tự.', field: 'password' }
  }
  if (!/^[a-z0-9_-]{3,30}$/.test(username)) {
    return {
      error: 'Username chỉ chứa chữ thường, số, _ hoặc - (3-30 ký tự).',
      field: 'username',
    }
  }

  const supabase = await createClient()

  // Check username uniqueness
  const { data: existing } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .maybeSingle()

  if (existing) {
    return { error: 'Username này đã được sử dụng.', field: 'username' }
  }

  // Sign up
  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) {
    if (error.message.includes('already registered')) {
      return { error: 'Email này đã được đăng ký.', field: 'email' }
    }
    return { error: error.message }
  }

  // Create profile (works when email confirmation is disabled)
  if (data.user) {
    await supabase.from('profiles').insert({
      id: data.user.id,
      username,
      display_name: displayName || username,
      role: 'writer',
    })
  }

  // If email confirmation is required, Supabase returns session=null
  if (!data.session) {
    return {
      success:
        'Tài khoản đã tạo! Vui lòng kiểm tra email để xác nhận trước khi đăng nhập.',
    }
  }

  redirect('/dashboard')
}

// ── LOGOUT ─────────────────────────────────────────────────────────────────
export async function logoutAction(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}

// ── UPDATE PROFILE ─────────────────────────────────────────────────────────
export async function updateProfileAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const displayName = formData.get('display_name') as string
  const bio = formData.get('bio') as string
  const website = formData.get('website') as string

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'Chưa đăng nhập.' }

  const { error } = await supabase
    .from('profiles')
    .update({
      display_name: displayName,
      bio,
      website,
    })
    .eq('id', user.id)

  if (error) return { error: error.message }

  return { success: 'Cập nhật hồ sơ thành công!' }
}
