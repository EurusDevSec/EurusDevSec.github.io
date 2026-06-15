# PLAN.md — EurusDevSec Blog & Portfolio Roadmap
> *Last updated: 2026-06-15 | Goal: Production-ready Portfolio on Next.js + Vercel*

---

## 🎯 Primary Objective

Build **EurusDevSec Portfolio & Blog** — a premium developer portfolio showcasing DevOps/Cloud skills, containing interactive components, dynamic blog articles, and high-fidelity styling.

---

## ✅ IMPLEMENTATION STATUS

### Frontend & UI Features
- [x] Sticky Header (shrinks on scroll)
- [x] Slow-floating background neon orbs (Hero section)
- [x] Staggered scroll entrance animations for cards
- [x] Interactive Cursor-Tracking Card Glow (optimized targeted tracking)
- [x] Interactive Infrastructure Pipeline Map (dynamic tag-based related post recommender)
- [x] Sticky blog sidebar with scrollable Table of Contents (TOC)
- [x] Transparent edge-to-edge favicon icon integration
- [x] Content Security Policy (CSP) headers inside root layout

### Backend & Database (Supabase)
- [x] Comments schema and database structure
- [x] Blog Likes system with increment RLS policies
- [x] Dynamic Likes fetching/writing API integration

### DevOps & Content
- [x] Automated copy-images asset synchronization script
- [x] Next.js production builds verified compile-clean
- [x] CI Typecheck pipeline setup via GitHub Actions
- [x] Vercel hosting integration with auto-deploy
- [x] Detailed DevOps content roadmap written to `docs/DEVOPS_BLOG_ROADMAP.md`

---

## 🔜 NEXT STEPS

### Content Backlog
- [ ] Write DevOps post 1: "Docker Optimization & Multi-stage building with Trivy Scan"
- [ ] Write DevOps post 2: "Enterprise CI/CD with AWS IAM OIDC (No Static Keys)"
- [ ] Write DevOps post 3: "Multi-AZ Terraform VPC with remote lock (S3 + DynamoDB)"

### Infrastructure & Cloud Lab
- [ ] Build public Grafana dashboard for cloud metrics visualization
- [ ] Set up ArgoCD GitOps playground on local minikube/K3s