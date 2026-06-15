# CONTEXT.md — EurusDevSec Portfolio & Blog
> *Last updated: 2026-06-15 | Environment: Local Dev + Vercel Production*

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router, static generation) |
| Styling | Tailwind CSS & Vanilla CSS (`app/globals.css`) |
| Database | Supabase (PostgreSQL) — for comments & likes |
| Content | Markdown (.md) with YAML Frontmatter |
| Image Asset Sync | Custom Node script (`scripts/copy-images.mjs`) |
| CI Pipeline | GitHub Actions (`.github/workflows/ci.yml` for typecheck) |
| Deployment | Vercel (Auto-deploy on push to `main`) |

---

## 📁 Key Folder Structure

```
eurusdevsec.github.io/
├── .agent/                      # Agent instructions & session checkpoints
├── .github/workflows/           # CI pipelines (ci.yml)
├── app/                         # Next.js App Router (blog, community, etc.)
│   ├── blog/                    # Blog routes
│   │   ├── page.tsx             # Blog listing
│   │   └── [slug]/              # Blog details (TOC & Infra Pipeline)
│   ├── layout.tsx               # Root layout & CSP meta headers
│   └── globals.css              # Global styles & neon animations
├── components/                  # React components
│   ├── blog/                    # TOC, InfraPipeline, PostCard, AuthorCard
│   ├── layout/                  # Navbar, Footer
│   └── home/                    # CursorGlowProvider, Hero animations
├── content/posts/               # Markdown posts with relative image folders
├── docs/                        # Architecture & roadmap docs
├── lib/                         # Shared utilities, Supabase client, post parser
├── public/                      # Static assets (favicons, blog-images)
└── scripts/                     # Utility scripts (copy-images.mjs)
```

---

## 📏 Coding Rules & Conventions

- **Component Structure:** Clean, modular functional React components using Tailwind CSS.
- **Markdown Image Sync:** Every time a markdown post adds a relative image, run `node scripts/copy-images.mjs` to sync it to `public/blog-images/<slug>/`.
- **SEO & Accessibility:**
  - Standard heading hierarchy: Only one `<h1>` per page. Detail headings inside markdown should be `##` or `###`.
  - Include descriptive `alt` tags on all images.
  - Proper OpenGraph metadata for dynamic sharing.
- **Clean Execution:** Stage and commit modifications to Git periodically. Run `npm run build` to verify Next.js builds before committing.
