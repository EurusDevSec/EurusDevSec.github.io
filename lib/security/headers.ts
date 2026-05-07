// lib/security/headers.ts
// Security headers configuration

export const SECURITY_HEADERS = {
  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  
  // Prevent clickjacking
  'X-Frame-Options': 'DENY',
  
  // XSS protection (legacy)
  'X-XSS-Protection': '1; mode=block',
  
  // Referrer policy
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Disable client-side caching for sensitive data
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
  
  // HSTS (only on HTTPS)
  ...(process.env.NODE_ENV === 'production' && {
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
  }),
  
  // Reduce information leakage
  'X-Powered-By': '',
  'Server': ''
}

/**
 * CSP Policy for Next.js 15
 * Adjust 'unsafe-inline' if possible (use nonce instead)
 */
export const CSP_POLICY = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://cdn.tailwindcss.com;
  style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdn.tailwindcss.com;
  img-src 'self' data: https: blob:;
  font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;
  connect-src 'self' https://*.supabase.co https://api.github.com;
  frame-src 'self' https://supabase.co;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`.replace(/\n/g, ' ').trim()

/**
 * CORS policy for API routes
 */
export const CORS_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://eurusdevsec.github.io',
  // Add your production domain
]

export function isCORSOriginAllowed(origin: string): boolean {
  return CORS_ORIGINS.some(allowedOrigin => {
    if (allowedOrigin === '*') return true
    if (allowedOrigin === origin) return true
    if (allowedOrigin.startsWith('*.')) {
      const domain = allowedOrigin.slice(2)
      return origin.endsWith(domain)
    }
    return false
  })
}
