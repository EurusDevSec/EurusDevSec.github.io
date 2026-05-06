# Hướng dẫn Migration Hugo PaperMod → Next.js 15 + Supabase

> Tài liệu chi tiết toàn bộ quá trình từ A-Z, giúp bạn tái tạo lại dự án này nhanh chóng.

---

## Tổng quan kiến trúc

```
┌─────────────────────────────────────────────────────────────┐
│                        Namecheap                            │
│                    (DNS → Vercel)                            │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                      Vercel                                  │
│              (Next.js 15 hosting)                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │ SSG Blog │  │ SSR Auth │  │Community │  │ Dashboard  │  │
│  │  (files) │  │(Supabase)│  │(Supabase)│  │(protected) │  │
│  └──────────┘  └──────────┘  └──────────┘  └────────────┘  │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                    Supabase (Free)                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │   Auth   │  │ profiles │  │  posts   │  │  comments  │  │
│  │  (email) │  │  (RLS)   │  │  (RLS)   │  │   (RLS)    │  │
│  └──────────┘  └──────────┘  └──────────┘  └────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Mục lục

1. [Prerequisites](#1-prerequisites)
2. [Phase 1: Init Next.js](#2-phase-1-init-nextjs)
3. [Phase 2: Supabase Auth](#3-phase-2-supabase-auth)
4. [Phase 3: Community Features](#4-phase-3-community-features)
5. [Phase 4: Deploy](#5-phase-4-deploy)
6. [Phase 5: UI Polish](#6-phase-5-ui-polish)
7. [Cấu trúc thư mục cuối cùng](#7-cau-truc-thu-muc)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Prerequisites

- **Node.js** ≥ 22
- **Git** + GitHub account
- **Supabase** account (free tier)
- **Vercel** account (free tier)
- **Namecheap** domain (optional)

---

## 2. Phase 1: Init Next.js

### 2.1 Tạo project

```bash
npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

### 2.2 Cài dependencies

```bash
npm install @supabase/ssr @supabase/supabase-js clsx date-fns gray-matter next-mdx-remote react-markdown reading-time rehype-autolink-headings rehype-pretty-code rehype-slug remark-gfm shiki tailwind-merge
npm install -D @tailwindcss/typography
```

### 2.3 Cấu hình file chính

- **`tailwind.config.ts`** — Custom colors (emerald theme), typography plugin
- **`app/globals.css`** — Design tokens CSS variables, prose styles
- **`app/layout.tsx`** — Root layout với Inter + JetBrains Mono fonts
- **`tsconfig.json`** — Path alias `@/*`

### 2.4 Tạo blog từ Markdown files

```
content/
└── posts/
    ├── ten-bai-viet/
    │   ├── index.md          ← bài viết (frontmatter + content)
    │   └── hinh-anh.jpg      ← ảnh đính kèm
    └── bai-don-le.md          ← bài đơn file
```

**Files cần tạo:**
- `lib/types.ts` — TypeScript interfaces
- `lib/utils.ts` — Utility functions (formatDate, slugify, cn, etc.)
- `lib/posts.ts` — Read markdown files, parse frontmatter, rewrite image paths
- `components/blog/PostContent.tsx` — MDXRemote renderer
- `components/blog/PostCard.tsx` — Card component
- `components/blog/TOC.tsx` — Table of Contents
- `components/layout/Navbar.tsx` — Navigation
- `components/layout/Footer.tsx` — Footer
- `app/page.tsx` — Homepage
- `app/blog/page.tsx` — Blog listing
- `app/blog/[slug]/page.tsx` — Blog detail
- `app/about/page.tsx` — About page

**Copy ảnh từ content/ sang public/:**
```bash
# Script PowerShell — copy ảnh blog vào public/blog-images/[slug]/
Get-ChildItem "content\posts" -Directory | ForEach-Object {
    $indexFile = Join-Path $_.FullName "index.md"
    if (Test-Path $indexFile) {
        $content = Get-Content $indexFile -Raw -Encoding UTF8
        $slug = if ($content -match 'slug:\s*(.+)') { $matches[1].Trim() } else { $_.Name }
        $images = Get-ChildItem $_.FullName -Include "*.jpg","*.png","*.gif","*.webp" -Recurse
        if ($images.Count -gt 0) {
            $target = "public\blog-images\$slug"
            New-Item -ItemType Directory -Force -Path $target | Out-Null
            $images | Copy-Item -Destination $target -Force
        }
    }
}
```

---

## 3. Phase 2: Supabase Auth

### 3.1 Tạo Supabase project

1. Đăng nhập [supabase.com](https://supabase.com) → New Project
2. Tắt **Email Confirmation** (Settings → Auth → Email → Confirm email = OFF)
3. Copy **API URL** và **anon key** từ Settings → API

### 3.2 Tạo `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3.3 Chạy SQL tạo bảng

```sql
-- profiles
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  bio TEXT,
  role TEXT DEFAULT 'writer',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- posts (community)
CREATE TABLE public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  tags TEXT[] DEFAULT '{}',
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- comments
CREATE TABLE public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  blog_slug TEXT,           -- for file-based blog posts
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies (xem file supabase_schema.sql đầy đủ)
```

### 3.4 Files Auth

- `lib/supabase/server.ts` — Server-side Supabase client (cookies)
- `lib/supabase/client.ts` — Browser client
- `lib/actions/auth.ts` — Login, Register, Logout server actions
- `middleware.ts` — Auth route protection
- `components/auth/LoginForm.tsx`, `RegisterForm.tsx`, `UserMenu.tsx`
- `app/(auth)/login/page.tsx`, `register/page.tsx`, `auth/callback/route.ts`
- `app/dashboard/` — Protected dashboard pages

---

## 4. Phase 3: Community Features

### 4.1 Community Post System

- `lib/actions/posts.ts` — Create/delete post, add/delete comment
- `components/community/WriteEditor.tsx` — Markdown editor với toolbar
- `components/community/CommunityPostCard.tsx` — Card cho community posts
- `components/community/CommentSection.tsx` — Comments (client component)
- `app/community/page.tsx` — Listing
- `app/community/write/page.tsx` — Protected write page
- `app/community/[slug]/page.tsx` — Detail + comments

### 4.2 Lưu ý Server Actions trong Client Components

> **KHÔNG** dùng inline `'use server'` trong Client Components.
> Tách thành file riêng với `'use server'` ở đầu file:
> - `lib/actions/comment-delete.ts`
> - `lib/actions/post-delete.ts`

---

## 5. Phase 4: Deploy

### 5.1 Production build test

```bash
npm run build
```

Fix lỗi thường gặp:
- `ReactNode` import từ `'react'` KHÔNG phải `'next'`
- `cookiesToSet` cần type annotation explicit
- `next-mdx-remote` phải dùng v6+ (Vercel chặn v5)

### 5.2 Push to GitHub

```bash
git add .
git commit -m "feat: Next.js migration"
git push origin main
```

### 5.3 Vercel Setup

1. Import repo trên Vercel
2. Set 3 environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`
3. Deploy

### 5.4 Custom Domain (Namecheap)

1. Vercel → Settings → Domains → Add domain
2. Namecheap → Advanced DNS:
   - A Record: `@` → `76.76.21.21`
   - CNAME: `www` → `cname.vercel-dns.com`
3. Update Supabase Site URL + Redirect URLs

---

## 6. Phase 5: UI Polish

### Theme: Emerald Minimal Elegant

- **Primary color**: Emerald `#10b981`
- **Secondary**: Teal `#2dd4bf`
- **Background**: Deep dark `#0b0f14`
- **Style**: Glassmorphism navbar, clean cards, emerald accents
- **Inspiration**: milet (Japanese singer) aesthetic — thanh lịch, tối giản

### Fix Image Paths

Hugo resolve ảnh tương đối tự động. Next.js cần rewrite:

```typescript
// lib/posts.ts
function rewriteImagePaths(content: string, slug: string): string {
  return content.replace(
    /!\[([^\]]*)\]\((?!https?:\/\/)(?!\/)([^)]+)\)/g,
    (_, alt, path) => `![${alt}](/blog-images/${slug}/${path.replace(/^\.\//, '')})`
  )
}
```

### Fix Inline Code (backticks)

```css
/* globals.css */
.prose-blog code::before,
.prose-blog code::after {
  content: '' !important;
}
```

---

## 7. Cấu trúc thư mục

```
eurusdevsec.github.io/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Login, Register, Callback
│   ├── blog/                   # Blog listing + [slug]
│   ├── community/              # Community listing + write + [slug]
│   ├── dashboard/              # Dashboard (protected)
│   ├── about/page.tsx
│   ├── globals.css             # Design tokens
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── components/
│   ├── auth/                   # LoginForm, RegisterForm, UserMenu
│   ├── blog/                   # PostCard, PostContent, TOC, BlogCommentSection
│   ├── community/              # WriteEditor, CommunityPostCard, CommentSection
│   ├── dashboard/              # DashboardSidebar, SettingsForm
│   └── layout/                 # Navbar, Footer
├── lib/
│   ├── actions/                # Server actions (auth, posts, comments)
│   ├── supabase/               # Server + Client Supabase helpers
│   ├── posts.ts                # File-based blog post reader
│   ├── types.ts                # TypeScript interfaces
│   └── utils.ts                # Utility functions
├── content/posts/              # Markdown blog posts
├── public/blog-images/         # Blog post images (served statically)
├── middleware.ts                # Auth route protection
├── next.config.mjs             # Security headers, redirects
├── tailwind.config.ts          # Theme configuration
└── vercel.json                 # Vercel deploy config
```

---

## 8. Troubleshooting

| Vấn đề | Giải pháp |
|---|---|
| Ảnh blog hiện alt text | Chạy script copy ảnh vào `public/blog-images/[slug]/` + rewrite paths trong `lib/posts.ts` |
| Backtick hiển thị raw | Thêm `.prose-blog code::before/after { content: '' }` |
| Build fail: `use server` inline | Tách server actions ra file riêng, KHÔNG inline trong client components |
| Build fail: `next-mdx-remote` v5 | Upgrade lên v6: `npm install next-mdx-remote@latest` |
| Auth không hoạt động | Check env vars + Supabase Site URL + Redirect URLs |
| 500 khi register | Tắt Email Confirmation trong Supabase Auth settings |

---

*Tài liệu này được tạo ngày 06/05/2026 — EurusDevSec Blog Migration.*
