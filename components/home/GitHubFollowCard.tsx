"use client";

import { useEffect, useState } from "react";

interface GitHubUserData {
  name: string;
  login: string;
  bio: string;
  public_repos: number;
  followers: number;
  html_url: string;
}

export default function GitHubFollowCard() {
  const [user, setUser] = useState<GitHubUserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const username = "EurusDevSec";
    const cacheKey = `github_user_${username}`;
    const cacheTimeKey = `github_user_time_${username}`;
    const ONE_HOUR = 60 * 60 * 1000;

    const cachedData = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(cacheTimeKey);

    if (cachedData && cachedTime && Date.now() - Number(cachedTime) < ONE_HOUR) {
      setUser(JSON.parse(cachedData));
      setLoading(false);
      return;
    }

    fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error("API Limit or Network Error");
        return res.json();
      })
      .then((data) => {
        const userData: GitHubUserData = {
          name: data.name || "EurusDevSec",
          login: data.login,
          bio: data.bio || "DevSecOps & Cloud Enthusiast",
          public_repos: data.public_repos,
          followers: data.followers,
          html_url: data.html_url,
        };
        setUser(userData);
        localStorage.setItem(cacheKey, JSON.stringify(userData));
        localStorage.setItem(cacheTimeKey, Date.now().toString());
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Using default GitHub data due to API error:", err);
        setUser({
          name: "EurusDevSec",
          login: "EurusDevSec",
          bio: "DevSecOps & Cloud Enthusiast | Sinh viên IT đam mê Cloud & Security",
          public_repos: 47,
          followers: 12,
          html_url: `https://github.com/${username}`,
        });
        setLoading(false);
      });
  }, []);

  // Highlighted projects
  const projects = [
    {
      name: "eurusdevsec.github.io",
      desc: "Next.js 15 blog & portfolio with Supabase comments and secure authentication.",
      lang: "TypeScript",
      langColor: "bg-blue-500",
      stars: 8,
      url: "https://github.com/EurusDevSec/eurusdevsec.github.io",
    },
    {
      name: "devsecops-pipeline-labs",
      desc: "DevSecOps CI/CD pipelines incorporating SonarQube, Trivy, and Terraform.",
      lang: "HCL / Shell",
      langColor: "bg-purple-500",
      stars: 5,
      url: "https://github.com/EurusDevSec",
    },
  ];

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl animate-pulse rounded-2xl border border-border/60 bg-surface/60 p-6">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-border" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 rounded bg-border" />
            <div className="h-3 w-48 rounded bg-border" />
          </div>
        </div>
        <div className="mt-6 h-10 w-full rounded bg-border" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="mx-auto max-w-3xl relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-surface/95 via-surface/80 to-emerald-500/5 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      {/* Background radial glow */}
      <div className="absolute right-[-4rem] top-[-4rem] -z-10 h-40 w-40 rounded-full bg-emerald-500/5 blur-2xl" />
      <div className="absolute bottom-[-4rem] left-[-4rem] -z-10 h-40 w-40 rounded-full bg-teal-500/5 blur-2xl" />

      <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-8">
        {/* Profile info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex-none group"
            >
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 opacity-60 blur transition duration-300 group-hover:opacity-100" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/avatar-eurusdevsec.png"
                alt={user.name}
                className="relative h-14 w-14 rounded-full border border-border bg-surface object-cover"
              />
            </a>
            <div>
              <h3 className="text-lg font-bold text-text-primary">
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  {user.name}
                </a>
              </h3>
              <p className="text-xs text-text-muted">@{user.login}</p>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-text-secondary">
            {user.bio}
          </p>

          {/* GitHub Stats grid */}
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-border/40 bg-surface/50 p-2.5 text-center">
              <span className="block text-base font-bold text-emerald-400">
                {user.public_repos}
              </span>
              <span className="text-[10px] text-text-muted">Repositories</span>
            </div>
            <div className="rounded-lg border border-border/40 bg-surface/50 p-2.5 text-center">
              <span className="block text-base font-bold text-emerald-400">
                {user.followers}
              </span>
              <span className="text-[10px] text-text-muted">Followers</span>
            </div>
          </div>

          {/* Glowing Action Button */}
          <div className="space-y-1.5">
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow transition-all duration-300 hover:bg-emerald-500 hover:scale-[1.01] active:scale-[0.99]"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Ghé thăm &amp; Nhấn &quot;Follow&quot; trên GitHub
            </a>
            <p className="text-[10px] text-center text-text-muted leading-snug">
              💡 Nhấn nút <strong className="text-emerald-400">Follow</strong> dưới ảnh đại diện ở trang đích để nhận thông báo bài viết mới nhất.
            </p>
          </div>
        </div>

        {/* Feature Projects Column */}
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
            Dự án nổi bật
          </p>
          <div className="grid gap-2.5">
            {projects.map((proj) => (
              <a
                key={proj.name}
                href={proj.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-border/40 bg-surface/40 p-3.5 transition-all duration-300 hover:border-emerald-500/20 hover:bg-surface/80"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-text-primary group-hover:text-emerald-400 transition-colors">
                    {proj.name}
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] text-text-muted">
                    <svg
                      className="h-3 w-3 fill-yellow-500/80"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{proj.stars}</span>
                  </div>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-text-secondary">
                  {proj.desc}
                </p>
                <div className="mt-2.5 flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${proj.langColor}`} />
                  <span className="text-[10px] text-text-muted">{proj.lang}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
