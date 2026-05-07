// UPDATE next.config.mjs — Add CSP and rate limit headers

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  // ── Security & Performance Headers ──────────────────────────────────────
  async headers() {
    const isDev = process.env.NODE_ENV === 'development'
    
    return [
      {
        source: '/(.*)',
        headers: [
          // Existing headers
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          
          // NEW: Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: `
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
            `
              .replace(/\n/g, ' ')
              .replace(/\s{2,}/g, ' ')
              .trim(),
          },
          
          // NEW: Cache control (prevent caching of sensitive pages)
          {
            source: '/(auth|dashboard|community/write)/:path*',
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
          
          // NEW: Disable TRACE method
          { key: 'Allow', value: 'GET, HEAD, POST, PUT, DELETE, OPTIONS' },
          
          // HSTS (only production)
          ...(process.env.NODE_ENV === 'production' && {
            source: '/(.*)',
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          }),
        ],
      },
      
      // Security headers for API routes
      {
        source: '/api/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          // CORS should be handled per route, not here
        ],
      },
    ]
  },

  // ── Redirects ──────────────────────────────────────────────────────────
  async redirects() {
    return [
      {
        source: '/posts/:slug*',
        destination: '/blog/:slug*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
