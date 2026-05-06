/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Images ──────────────────────────────────────────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      // For any external blog images (if needed later)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // ── File extensions ──────────────────────────────────────────────────────
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  // ── Security & performance headers ───────────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },

  // ── Redirects (migrate old Hugo paths if needed) ─────────────────────────
  async redirects() {
    return [
      // Redirect /posts/* → /blog/* to preserve old Hugo URLs
      {
        source: '/posts/:slug*',
        destination: '/blog/:slug*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
