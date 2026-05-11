import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/blog/PostCard";
import { getLatestPosts } from "@/lib/posts";

export default async function HomePage() {
  const latestPosts = await getLatestPosts(6);

  return (
    <>
      <Navbar />

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden">
        <div className="hero-grid absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 hero-glow" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/55" />
        <div className="absolute right-[-8rem] top-[-4rem] h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-[-4rem] h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:py-36">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 shadow-sm shadow-emerald-500/10 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-500/15 hover:shadow-md hover:shadow-emerald-500/20">
                <div className="relative">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  <div className="absolute inset-0 h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75" />
                </div>
                <span className="text-xs font-semibold tracking-wide text-emerald-400">
                  DevSecOps · Cloud · Life
                </span>
              </div>

              <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
                Hi, I&apos;m{" "}
                <span className="gradient-text inline-block animate-gradient bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-[length:200%_auto] bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-400">
                  EurusDevSec
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-xl leading-relaxed text-text-secondary sm:text-2xl sm:leading-relaxed">
                Sinh viên IT sắp ra trường, đam mê{" "}
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  DevSecOps
                </span>{" "}
                và{" "}
                <span className="font-semibold text-teal-600 dark:text-teal-400">
                  Cloud
                </span>
                . Blog này là nơi tôi chia sẻ kiến thức kỹ thuật, phân tích văn
                học, và những trải nghiệm cuộc sống.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/blog"
                  className="btn-primary group shadow-lg shadow-emerald-500/20 transition-shadow hover:shadow-xl hover:shadow-emerald-500/30"
                >
                  Đọc Blog
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <Link
                  href="/certifications"
                  className="btn-secondary shadow-md transition-shadow hover:shadow-lg"
                >
                  Certifications
                </Link>
                <Link
                  href="/about"
                  className="btn-secondary shadow-md transition-shadow hover:shadow-lg"
                >
                  Về tôi
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 blur-xl" />
              <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-surface/95 via-surface/80 to-emerald-500/5 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-emerald-400">
                      Portfolio highlights
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-text-primary">
                      What you can explore
                    </h2>
                  </div>
                  <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                    Verified
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
                    <p className="text-sm font-semibold text-text-primary">
                      Certifications
                    </p>
                    <p className="mt-1 text-sm leading-6 text-text-secondary">
                      Verified credentials with images and verification links.
                    </p>
                    <Link
                      href="/certifications"
                      className="mt-4 inline-flex text-sm font-semibold text-emerald-400 hover:text-emerald-300"
                    >
                      View certifications →
                    </Link>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
                    <p className="text-sm font-semibold text-text-primary">
                      Blog
                    </p>
                    <p className="mt-1 text-sm leading-6 text-text-secondary">
                      Technical guides, notes, and project write-ups.
                    </p>
                    <Link
                      href="/blog"
                      className="mt-4 inline-flex text-sm font-semibold text-emerald-400 hover:text-emerald-300"
                    >
                      Read latest posts →
                    </Link>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-border/60 bg-surface/80 px-3 py-4 text-center">
                    <p className="text-2xl font-bold text-emerald-400">9+</p>
                    <p className="mt-1 text-xs text-text-muted">Posts</p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-surface/80 px-3 py-4 text-center">
                    <p className="text-2xl font-bold text-emerald-400">1+</p>
                    <p className="mt-1 text-xs text-text-muted">Certs</p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-surface/80 px-3 py-4 text-center">
                    <p className="text-2xl font-bold text-emerald-400">5+</p>
                    <p className="mt-1 text-xs text-text-muted">Projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Latest Posts ── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="section-heading">Bài viết mới nhất</h2>
            <p className="mt-2 text-sm text-text-muted">
              Chia sẻ kiến thức và trải nghiệm
            </p>
          </div>
          <Link href="/blog" className="btn-secondary text-sm">
            Xem tất cả
          </Link>
        </div>

        {latestPosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-text-muted py-12">
            Chưa có bài viết nào.
          </p>
        )}
      </section>

      <Footer />
    </>
  );
}
