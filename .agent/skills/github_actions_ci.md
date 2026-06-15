---
name: github_actions_ci
description: Cấu hình và vận hành hệ thống CI tự động chạy Type check (npx tsc) cho Next.js khi push/pull request
---

# GitHub Actions CI Skill

Quy trình tự động hóa kiểm tra mã nguồn (CI) giúp phát hiện sớm các lỗi cú pháp TypeScript, Next.js build errors trước khi code được đẩy lên Vercel để deploy tự động.

---

## 1. Cấu hình CI Workflow

File cấu hình chính nằm tại `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  typecheck:
    name: Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npx tsc --noEmit
```

## 2. Quy tắc vận hành

*   **Chạy thử local trước khi push:**
    *   Trước khi push code lên repo, luôn chạy `npx tsc --noEmit` ở máy cá nhân để phát hiện lỗi TypeScript trước khi CI báo đỏ.
*   **Vercel Auto-Deployment:**
    *   Hạ tầng Vercel sẽ tự động lắng nghe nhánh `main`. Khi CI pass và code được merge vào `main`, Vercel sẽ tự động kích hoạt deploy bản production.
