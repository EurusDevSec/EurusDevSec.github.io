import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'About — EurusDevSec',
  description:
    'Sinh viên IT đam mê DevSecOps, Cloud Infrastructure và bảo mật. Khám phá hành trình và kỹ năng của tôi.',
}

const SKILLS = [
  { name: 'AWS', category: 'Cloud' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Kubernetes', category: 'DevOps' },
  { name: 'Terraform', category: 'IaC' },
  { name: 'Linux', category: 'System' },
  { name: 'CI/CD', category: 'DevOps' },
  { name: 'Python', category: 'Language' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Supabase', category: 'Backend' },
  { name: 'GitHub Actions', category: 'CI/CD' },
  { name: 'Security', category: 'SecOps' },
  { name: 'Networking', category: 'Infra' },
]

const STATS = [
  { label: 'Blog Posts', value: '9+' },
  { label: 'Certifications', value: '1+' },
  { label: 'Projects', value: '5+' },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        {/* ── Profile Header ── */}
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-emerald-500/30 bg-emerald-500/10 text-3xl font-bold text-emerald-400 shadow-[0_0_30px_hsl(160_84%_39%/0.15)]">
            E
          </div>

          <h1 className="text-3xl font-extrabold text-text-primary">
            Eurus<span className="text-emerald-400">DevSec</span>
          </h1>

          <p className="mt-1 text-sm text-emerald-400/80">@eurusdevsec</p>

          <a
            href="https://github.com/EurusDevSec"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-4 text-sm"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Follow on GitHub
          </a>
        </div>

        {/* ── Bio ── */}
        <div className="mt-12 rounded-2xl border border-white/[0.06] bg-surface/60 p-6">
          <p className="text-sm leading-relaxed text-text-secondary">
            Tôi là sinh viên IT sắp ra trường, đam mê <strong className="text-text-primary">DevSecOps</strong> và{' '}
            <strong className="text-text-primary">Cloud Infrastructure</strong>. Blog này vừa là nơi tôi chia sẻ kiến
            thức kỹ thuật — từ AWS, Docker, Kubernetes đến CI/CD — vừa là nơi tôi viết về văn học, triết học và những
            trải nghiệm cuộc sống. Mục tiêu của tôi là xây dựng một career path vững chắc trong lĩnh vực bảo mật hạ
            tầng đám mây.
          </p>
        </div>

        {/* ── Stats ── */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-xl border border-white/[0.06] bg-surface/40 py-5"
            >
              <span className="text-2xl font-bold text-emerald-400">{stat.value}</span>
              <span className="mt-1 text-xs text-text-muted">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* ── Technical Skills ── */}
        <div className="mt-12">
          <h2 className="mb-6 text-center text-xl font-bold text-text-primary">
            Technical Skills
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill.name}
                className="rounded-lg border border-white/[0.06] bg-surface/60 px-3 py-1.5 text-sm text-text-secondary transition-colors hover:border-emerald-500/30 hover:text-emerald-400"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* ── Contact ── */}
        <div className="mt-12 text-center">
          <h2 className="mb-4 text-xl font-bold text-text-primary">Get in Touch</h2>
          <div className="flex justify-center gap-3">
            <a
              href="mailto:eurusdevsec@gmail.com"
              className="btn-secondary text-sm"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
            <a
              href="https://linkedin.com/in/eurusdevsec"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
