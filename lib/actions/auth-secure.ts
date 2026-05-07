// lib/actions/auth-secure.ts
// Secured auth actions with rate limiting and input validation

'use server'

import { createClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/ratelimit/limiter'
import { sanitizeTitle } from '@/lib/security/sanitize'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export type AuthState = {
  error?: string
  success?: string
  field?: string
} | null

/**
 * Get client IP from headers (for rate limiting)
 */
async function getClientIP(): Promise<string> {
  const headersList = await headers()
  return (
    headersList.get('x-forwarded-for')?.split(',')[0].trim() ||
    headersList.get('x-real-ip') ||
    headersList.get('cf-connecting-ip') ||
    'unknown'
  )
}

/**
 * Secure login with rate limiting
 */
export async function secureLoginAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const ip = await getClientIP()
  
  // Rate limit by IP + email
  const rateLimitKey = `login:${ip}:${email}`
  const rateLimit = await checkRateLimit(rateLimitKey, 'login')
  
  if (!rateLimit.success) {
    return {
      error: rateLimit.message,
      field: 'email'
    }
  }
  
  // Validate input
  if (!email || !password) {
    return { error: 'Email và mật khẩu không được trống.' }
  }
  
  if (!email.includes('@')) {
    return { error: 'Email không hợp lệ.', field: 'email' }
  }
  
  if (password.length < 6) {
    return { error: 'Mật khẩu phải ít nhất 6 ký tự.', field: 'password' }
  }
  
  // Attempt login
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  
  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      return { error: 'Email hoặc mật khẩu không đúng.', field: 'email' }
    }
    return { error: error.message }
  }
  
  redirect('/dashboard')
}

/**
 * Secure register with rate limiting and stronger validation
 */
export async function secureRegisterAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirm_password') as string
  const username = formData.get('username') as string
  const displayName = formData.get('display_name') as string
  const ip = await getClientIP()
  
  // Rate limit by IP
  const rateLimit = await checkRateLimit(`register:${ip}`, 'register')
  
  if (!rateLimit.success) {
    return {
      error: rateLimit.message,
      field: 'email'
    }
  }
  
  // Validate all fields
  if (!email || !password || !username) {
    return { error: 'Vui lòng nhập đầy đủ thông tin.' }
  }
  
  // Email validation
  if (!isValidEmail(email)) {
    return { error: 'Email không hợp lệ.', field: 'email' }
  }
  
  // Password validation (stronger)
  const passwordValidation = validatePassword(password)
  if (!passwordValidation.valid) {
    return { error: passwordValidation.error, field: 'password' }
  }
  
  // Password match
  if (password !== confirmPassword) {
    return { error: 'Mật khẩu không khớp.', field: 'confirm_password' }
  }
  
  // Username validation
  if (!/^[a-z0-9_-]{3,30}$/.test(username)) {
    return {
      error: 'Username chỉ chứa chữ thường, số, _ hoặc - (3-30 ký tự).',
      field: 'username',
    }
  }
  
  // Check username availability
  const supabase = await createClient()
  const { data: existing } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .maybeSingle()
  
  if (existing) {
    return { error: 'Username này đã được sử dụng.', field: 'username' }
  }
  
  // Register
  const { data, error } = await supabase.auth.signUp({ email, password })
  
  if (error) {
    if (error.message.includes('already registered')) {
      return { error: 'Email này đã được đăng ký.', field: 'email' }
    }
    return { error: error.message }
  }
  
  if (!data.user) {
    return { error: 'Không thể tạo tài khoản. Vui lòng thử lại.' }
  }
  
  // Create profile (will be auto-created by database trigger in production)
  // This is a fallback in case trigger is not set up
  try {
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      username,
      display_name: displayName || username,
      role: 'writer'
    })
    
    // If insert fails due to constraint (duplicate key), it's ok - profile might already exist
    if (profileError && !profileError.message?.includes('duplicate')) {
      console.error('Profile creation error:', profileError?.message)
      // Silently continue - profile might be created by trigger
    }
  } catch (err) {
    console.error('Profile creation exception:', err)
    // Silently continue
  }
  
  return {
    success: 'Đăng ký thành công! Vui lòng đăng nhập.',
  }
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

/**
 * Validate password strength
 */
function validatePassword(password: string): { valid: boolean; error?: string } {
  if (password.length < 8) {
    return { valid: false, error: 'Mật khẩu phải ít nhất 8 ký tự.' }
  }
  
  if (password.length > 128) {
    return { valid: false, error: 'Mật khẩu quá dài (tối đa 128 ký tự).' }
  }
  
  // Require at least one uppercase, one lowercase, one number
  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: 'Mật khẩu phải chứa ít nhất 1 ký tự in hoa.' }
  }
  
  if (!/[a-z]/.test(password)) {
    return { valid: false, error: 'Mật khẩu phải chứa ít nhất 1 ký tự thường.' }
  }
  
  if (!/[0-9]/.test(password)) {
    return { valid: false, error: 'Mật khẩu phải chứa ít nhất 1 ký tự số.' }
  }
  
  // Check for common patterns
  if (/(.)\1{3,}/.test(password)) {
    return { valid: false, error: 'Mật khẩu không được chứa ký tự lặp lại (aaaa).' }
  }
  
  return { valid: true }
}
