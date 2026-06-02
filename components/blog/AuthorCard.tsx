"use client";

import { useEffect, useState } from "react";

export default function AuthorCard() {
  const [followers, setFollowers] = useState<number | null>(null);

  useEffect(() => {
    const username = "EurusDevSec";
    const cacheKey = `github_followers_${username}`;
    const cacheTimeKey = `github_followers_time_${username}`;
    const ONE_HOUR = 60 * 60 * 1000;

    const cachedFollowers = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(cacheTimeKey);

    if (cachedFollowers && cachedTime && Date.now() - Number(cachedTime) < ONE_HOUR) {
      setFollowers(Number(cachedFollowers));
      return;
    }

    fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setFollowers(data.followers);
        localStorage.setItem(cacheKey, data.followers.toString());
        localStorage.setItem(cacheTimeKey, Date.now().toString());
      })
      .catch(() => {
        // Fallback
        setFollowers(15);
      });
  }, []);

  return (
    <div className="rounded-xl border border-border/60 bg-surface/60 p-4 transition-all duration-300 hover:border-emerald-500/20 hover:shadow-md">
      <div className="flex items-center gap-3">
        <a
          href="https://github.com/EurusDevSec"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative h-10 w-10 flex-none"
        >
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 opacity-0 blur transition duration-300 group-hover:opacity-100" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/avatar-eurusdevsec.png"
            alt="EurusDevSec"
            className="relative h-10 w-10 rounded-full border border-border bg-surface object-cover"
          />
        </a>
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
            Tác giả
          </p>
          <a
            href="https://github.com/EurusDevSec"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm font-bold text-text-primary hover:text-emerald-400 transition-colors truncate"
          >
            EurusDevSec
          </a>
        </div>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-text-secondary">
        Sinh viên IT đam mê DevSecOps, Cloud & Linux. Thích học hỏi công nghệ mới và viết blog chia sẻ.
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3">
        {followers !== null && (
          <span className="text-[11px] text-text-muted">
            <strong className="font-semibold text-text-secondary">{followers}</strong> followers
          </span>
        )}
        <a
          href="https://github.com/EurusDevSec"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 transition-colors hover:bg-emerald-500 hover:text-white"
        >
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          Follow
        </a>
      </div>
    </div>
  );
}
