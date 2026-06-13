import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import ScrollToTop from '@/components/blog/ScrollToTop'
import CursorGlowProvider from '@/components/home/CursorGlowProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://eurusdev.me'
  ),
  title: {
    default: 'EurusDevSec — DevSecOps Blog',
    template: '%s | EurusDevSec',
  },
  description:
    'Blog cá nhân của EurusDevSec — DevSecOps, Cloud, Security, và trải nghiệm cuộc sống.',
  keywords: ['DevSecOps', 'DevOps', 'Cybersecurity', 'Cloud', 'AWS', 'Blog', 'Vietnamese'],
  authors: [{ name: 'EurusDevSec', url: 'https://eurusdev.me' }],
  creator: 'EurusDevSec',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://eurusdev.me',
    siteName: 'EurusDevSec',
    title: 'EurusDevSec — DevSecOps Blog',
    description:
      'Blog cá nhân của EurusDevSec — DevSecOps, Cloud, Security, và trải nghiệm cuộc sống.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EurusDevSec — DevSecOps Blog',
    description: 'Blog cá nhân về DevSecOps, Cloud, Security và cuộc sống.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background antialiased" suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <CursorGlowProvider />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}

