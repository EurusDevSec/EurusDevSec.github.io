// lib/middleware/rateLimit.ts
// Server action wrapper for rate limiting

import { checkRateLimit } from '@/lib/ratelimit/limiter'
import { type RateLimitKey } from '@/lib/ratelimit/config'

/**
 * Get client IP from headers
 */
export function getClientIP(request?: Request): string {
  if (!request) return 'unknown'
  
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  )
}

/**
 * Wrap a server action with rate limiting
 * 
 * @example
 * export const loginAction = withRateLimit(
 *   'login',
 *   async (formData) => { ... }
 * )
 */
export function withRateLimit<T extends (...args: any[]) => Promise<any>>(
  limitType: RateLimitKey,
  action: T,
  getKey?: (args: any[]) => string
): T {
  return (async (...args: any[]) => {
    // Get rate limit key (usually email or IP)
    const key = getKey ? getKey(args) : 'default'
    
    const result = await checkRateLimit(key, limitType)
    
    if (!result.success) {
      return {
        error: result.message,
        remaining: 0,
        resetIn: result.resetIn
      }
    }
    
    // Execute original action
    try {
      const response = await action(...args)
      // Add rate limit info to response
      return {
        ...response,
        _rateLimit: {
          remaining: result.remaining,
          resetIn: result.resetIn
        }
      }
    } catch (error) {
      throw error
    }
  }) as T
}

/**
 * Middleware function for API routes
 */
export async function rateLimitMiddleware(
  request: Request,
  limitType: RateLimitKey
): Promise<{ allowed: boolean; message?: string; remaining: number; resetIn: number }> {
  const ip = getClientIP(request)
  const result = await checkRateLimit(ip, limitType)
  
  return {
    allowed: result.success,
    message: result.message,
    remaining: result.remaining,
    resetIn: result.resetIn
  }
}
