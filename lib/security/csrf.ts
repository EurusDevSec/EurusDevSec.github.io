// lib/security/csrf.ts
// CSRF token generation and validation

import { createHash, randomBytes } from 'crypto'
import { cookies } from 'next/headers'

const CSRF_TOKEN_LENGTH = 32
const CSRF_COOKIE_NAME = '__Host-csrf-token'
const CSRF_HEADER_NAME = 'x-csrf-token'

/**
 * Generate CSRF token and store in httpOnly cookie
 */
export async function generateCSRFToken(): Promise<string> {
  const token = randomBytes(CSRF_TOKEN_LENGTH).toString('hex')
  const cookieStore = await cookies()
  
  // Set httpOnly, Secure, SameSite cookie
  cookieStore.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 // 24 hours
  })
  
  return token
}

/**
 * Validate CSRF token from request
 */
export async function validateCSRFToken(token: string): Promise<boolean> {
  const cookieStore = await cookies()
  const stored = cookieStore.get(CSRF_COOKIE_NAME)?.value
  
  if (!stored) return false
  
  // Constant-time comparison to prevent timing attacks
  return cryptoCompare(token, stored)
}

/**
 * Constant-time string comparison
 */
function cryptoCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  
  let result = 0
  for (let i = 0; i < bufA.length; i++) {
    result |= bufA[i] ^ bufB[i]
  }
  
  return result === 0
}

/**
 * Extract CSRF token from request headers
 */
export function getCSRFTokenFromRequest(request: Request): string | null {
  return request.headers.get(CSRF_HEADER_NAME)
}
