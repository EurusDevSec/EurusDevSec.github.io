import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About — EurusDevSec",
  description:
    "Sinh viên IT đam mê DevSecOps, Cloud Infrastructure và bảo mật. Khám phá hành trình và kỹ năng của tôi.",
};

const SKILLS = [
  { name: "AWS", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "Terraform", category: "IaC" },
  { name: "Linux", category: "System" },
  { name: "CI/CD", category: "DevOps" },
  { name: "Python", category: "Language" },
  { name: "Next.js", category: "Frontend" },
  { name: "Supabase", category: "Backend" },
  { name: "GitHub Actions", category: "CI/CD" },
  { name: "Security", category: "SecOps" },
  { name: "Networking", category: "Infra" },
];

const STATS = [
  { label: "Blog Posts", value: "9+" },
  { label: "Certifications", value: "1+" },
  { label: "Projects", value: "5+" },
];

const SKILL_GROUPS = SKILLS.reduce<Record<string, string[]>>(
  (groups, skill) => {
    if (!groups[skill.category]) groups[skill.category] = [];
    groups[skill.category].push(skill.name);
    return groups;
  },
  {},
);

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-surface/90 via-surface/80 to-emerald-500/5 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.08)] sm:p-8 lg:sticky lg:top-24">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/6 via-transparent to-teal-500/6" />
            <div className="relative flex flex-col items-center text-center">
              <div className="relative mb-6 animate-scale-in">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 opacity-80 blur-md animate-gradient bg-[length:200%_200%]" />
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-5xl font-bold text-emerald-400 shadow-[0_0_40px_hsl(160_84%_39%/0.22)] animate-float sm:h-40 sm:w-40 sm:text-6xl">
                  E
                </div>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
                Eurus<span className="gradient-text">DevSec</span>
              </h1>
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.28em] text-emerald-400/90">
                @eurusdevsec
              </p>

              <p className="mt-5 max-w-sm text-sm leading-7 text-text-secondary sm:text-base">
                Sinh viên IT đam mê DevSecOps, Cloud Infrastructure và bảo mật
                hạ tầng đám mây. Mục tiêu là xây dựng các hệ thống an toàn, rõ
                ràng và đủ đẹp để học tiếp được lâu dài.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href="https://github.com/EurusDevSec"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <Link href="/certifications" className="btn-secondary">
                  Certifications
                </Link>
              </div>

              <div className="mt-6 grid w-full grid-cols-3 gap-3 text-left">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-border/60 bg-surface/70 px-3 py-4"
                  >
                    <p className="text-2xl font-bold text-emerald-400">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <section className="overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-surface/90 via-surface/75 to-emerald-500/5 p-8 shadow-[0_18px_60px_rgba(0,0,0,0.06)]">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />
              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
                  About Me
                </p>
                <h2 className="mt-2 text-2xl font-bold text-text-primary sm:text-3xl">
                  Kỹ thuật, văn học, và tư duy hệ thống
                </h2>
                <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
                <p className="mt-6 text-base leading-8 text-text-secondary sm:text-lg">
                  Tôi là sinh viên IT sắp ra trường, đam mê{" "}
                  <span className="font-semibold text-emerald-500">
                    DevSecOps
                  </span>
                  ,{" "}
                  <span className="font-semibold text-emerald-500">
                    Cloud Infrastructure
                  </span>{" "}
                  và những hệ thống có cấu trúc rõ ràng. Blog này là nơi tôi ghi
                  lại bài học kỹ thuật — từ{" "}
                  <span className="font-medium text-teal-500">AWS</span>,{" "}
                  <span className="font-medium text-teal-500">Docker</span>,{" "}
                  <span className="font-medium text-teal-500">Kubernetes</span>{" "}
                  đến <span className="font-medium text-teal-500">CI/CD</span> —
                  và cả những mảnh ghép về văn học, triết học, đời sống.
                </p>
                <p className="mt-4 text-base leading-8 text-text-secondary">
                  Mục tiêu của tôi là xây dựng một{" "}
                  <span className="font-semibold text-emerald-500">
                    career path
                  </span>{" "}
                  bền vững trong lĩnh vực{" "}
                  <span className="font-semibold text-emerald-500">
                    bảo mật hạ tầng đám mây
                  </span>
                  , đồng thời giữ được khả năng diễn đạt và tư duy độc lập.
                </p>
              </div>
            </section>

            <section className="grid gap-4 rounded-3xl border border-border/60 bg-surface/55 p-6 shadow-sm sm:grid-cols-3">
              {STATS.map((stat, index) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border/60 bg-background/70 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                      {index === 0 ? (
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      ) : index === 1 ? (
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.105 0-2 .672-2 1.5S10.895 11 12 11s2 .672 2 1.5S13.105 14 12 14m0-6V6m0 8v2m9-6a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-text-primary">
                        {stat.value}
                      </p>
                      <p className="text-xs text-text-muted">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            <section className="rounded-3xl border border-border/60 bg-gradient-to-br from-surface/90 via-surface/75 to-teal-500/5 p-8 shadow-[0_18px_60px_rgba(0,0,0,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
                Technical Skills
              </p>
              <h2 className="mt-2 text-2xl font-bold text-text-primary">
                Technologies and tools I work with
              </h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {Object.entries(SKILL_GROUPS).map(([category, skills]) => (
                  <div
                    key={category}
                    className="rounded-2xl border border-border/60 bg-background/70 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-semibold text-text-primary">
                        {category}
                      </p>
                      <span className="text-xs text-text-muted">
                        {skills.length} skills
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg border border-border/60 bg-surface/80 px-3 py-1.5 text-sm text-text-secondary transition-all hover:-translate-y-0.5 hover:border-emerald-500/30 hover:text-emerald-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-surface/85 to-teal-500/10 p-8 shadow-[0_18px_60px_rgba(13,162,113,0.12)]">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
                Contact
              </p>
              <h2 className="mt-2 text-2xl font-bold text-text-primary">
                Get in touch
              </h2>
              <p className="mt-3 text-base leading-7 text-text-secondary">
                Liên hệ nếu bạn muốn trao đổi về DevSecOps, cloud, học tập hoặc
                các bài viết kỹ thuật trên blog.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a
                  href="mailto:eurusdevsec@gmail.com"
                  className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-base font-medium text-text-primary transition-all hover:border-emerald-500/30 hover:text-emerald-400"
                >
                  <svg
                    className="h-5 w-5 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  eurusdevsec@gmail.com
                </a>
                <a
                  href="https://linkedin.com/in/eurusdevsec"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-base font-medium text-text-primary transition-all hover:border-emerald-500/30 hover:text-emerald-400"
                >
                  <svg
                    className="h-5 w-5 text-emerald-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
