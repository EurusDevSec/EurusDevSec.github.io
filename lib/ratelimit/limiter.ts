// lib/ratelimit/limiter.ts
// Server-side rate limiter using in-memory store (simple version)
// For production, use @upstash/ratelimit with Redis

import { RATE_LIMITS, type RateLimitKey } from './config'

interface RateLimitEntry {
  count: number
  resetAt: number
}

// In-memory store (simple version - NOT for production with multiple servers)
const store = new Map<string, RateLimitEntry>()

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt < now) {
      store.delete(key)
    }
  }
}, 5 * 60 * 1000)

export async function checkRateLimit(
  key: string,
  limitType: RateLimitKey
): Promise<{ success: boolean; remaining: number; resetIn: number; message?: string }> {
  const config = RATE_LIMITS[limitType]
  const now = Date.now()
  
  let entry = store.get(key)
  
  // Reset if window expired
  if (!entry || entry.resetAt < now) {
    entry = {
      count: 0,
      resetAt: now + config.window * 1000
    }
    store.set(key, entry)
  }
  
  const remaining = Math.max(0, config.requests - entry.count)
  const resetIn = Math.ceil((entry.resetAt - now) / 1000)
  
  if (entry.count >= config.requests) {
    return {
      success: false,
      remaining: 0,
      resetIn,
      message: config.message
    }
  }
  
  // Increment counter
  entry.count++
  return {
    success: true,
    remaining: remaining - 1,
    resetIn: 0
  }
}

// For client-side feedback
export function getRateLimitStatus(
  key: string,
  limitType: RateLimitKey
): { remaining: number; limit: number; resetIn: number } {
  const config = RATE_LIMITS[limitType]
  const entry = store.get(key)
  const now = Date.now()
  
  if (!entry || entry.resetAt < now) {
    return {
      remaining: config.requests,
      limit: config.requests,
      resetIn: 0
    }
  }
  
  return {
    remaining: Math.max(0, config.requests - entry.count),
    limit: config.requests,
    resetIn: Math.ceil((entry.resetAt - now) / 1000)
  }
}
