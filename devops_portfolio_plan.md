# 🚀 EurusDevSec — DevOps/Cloud Portfolio Website Plan
> *Tối ưu 2026, sử dụng được nhiều năm sau*

---

## 🎯 Tầm nhìn tổng thể

Website này **không phải CV online** — mà là **bằng chứng sống** rằng bạn đang vận hành DevOps thực tế.  
Người xem (nhà tuyển dụng, client, cộng đồng) nên cảm nhận ngay: *"Người này đang chạy hệ thống thật."*

---

## 📐 Cấu trúc tổng thể (7 Section chính)

```
eurusdevsec.github.io/
├── 🏠 Trang chủ       → Live Dashboard + Hero
├── 🗂️  /projects       → Case Study kỹ thuật
├── 📊 /skills          → Skills map + Certifications
├── 📝 /blog            → Lab notes + Deep dives
├── 🔬 /lab             → Experiments đang chạy thật
├── 📅 /journey         → Timeline cá nhân
└── 📬 /contact         → Liên hệ + Open Source
```

---

## 1. 🏠 Trang Chủ — "Live Dashboard"

### Mục tiêu
Ai nhìn vào trong **5 giây đầu** phải hiểu ngay: bạn là ai, bạn làm gì, và bạn đang **đang làm nó**.

### Hero Section
```
[Avatar]  EurusDevSec
          DevOps & Cloud Engineer
          "Biến hạ tầng phức tạp thành pipeline tự động"

          [Xem Projects]  [Đọc Blog]
```

### Live Status Widgets (quan trọng nhất)

| Widget | Nguồn dữ liệu | Hiển thị |
|--------|--------------|---------|
| **Site Uptime** | UptimeRobot API / Vercel | 🟢 99.98% uptime 30 ngày |
| **CI/CD Status** | GitHub Actions badge | ✅ Build passing |
| **Last Deploy** | Vercel API | 🚀 Deploy 2h trước — `fix: update blog layout` |
| **Commits (30 ngày)** | GitHub API | Heatmap activity |
| **SSL Certificate** | Fetch header tự check | 🔒 Còn 89 ngày |

> **Tại sao mạnh?** Không ai hardcode được những thứ này. Nó thật 100%.

### Quick Stats Bar
```
📝 12 Bài blog  |  🗂️ 8 Projects  |  🏆 3 Certs AWS  |  ⭐ 47 GitHub Stars
```
*(Fetch từ GitHub API + đếm file markdown — tự động cập nhật)*

---

## 2. 🗂️ /projects — Case Study Kỹ Thuật

### Format chuẩn cho từng project

Mỗi project **không phải list link GitHub** — mà là một bài phân tích ngắn:

```
┌─────────────────────────────────────────────┐
│  [Logo/Screenshot]                          │
│                                             │
│  📌 Vấn đề                                  │
│  Deploy thủ công mất 45 phút, lỗi thường   │
│  xuyên do human error                       │
│                                             │
│  🏗️ Architecture                            │
│  [Diagram Mermaid/draw.io nhúng vào]        │
│                                             │
│  🛠️ Tech Stack                              │
│  AWS ECS · GitHub Actions · Terraform       │
│  · Docker · CloudWatch                      │
│                                             │
│  📊 Kết quả thực tế                         │
│  Deploy time: 45 phút → 4 phút (-91%)      │
│  Uptime: 94% → 99.9%                        │
│  Cost: $320 → $180/tháng (-44%)            │
│                                             │
│  [GitHub] [Live Demo] [Đọc chi tiết →]     │
└─────────────────────────────────────────────┘
```

### Danh sách project nên có (gợi ý theo roadmap 2026)

| Project | Core Skill | Impact |
|---------|-----------|--------|
| **GitOps Pipeline** | ArgoCD + GitHub Actions + K8s | CI/CD automation |
| **AWS Cost Dashboard** | Lambda + CloudWatch + Grafana | FinOps |
| **IaC Starter Template** | Terraform + Terragrunt | Reusable modules |
| **Observability Stack** | Prometheus + Loki + Grafana | Monitoring |
| **Self-hosted Blog** | Docker + Nginx + GitHub Pages | Present project |
| **Disaster Recovery Lab** | AWS Backup + RDS snapshots | Reliability |
| **Zero-downtime Deploy** | Blue/Green hoặc Canary | Deployment strategy |
| **Security Baseline** | AWS Config + GuardDuty + WAF | Security posture |

> **Nguyên tắc:** Ít nhất **3 project có số liệu thật** quan trọng hơn 10 project chỉ có link.

---

## 3. 📊 /skills — Skills Map thực chiến

### Không dùng progress bar — Dùng Cloud Map

**Tier 1 — Core (Đang dùng hàng ngày):**
```
☁️ AWS (EC2, ECS, RDS, S3, IAM, VPC, CloudWatch)
🐳 Docker & Docker Compose
🔄 GitHub Actions
📝 Terraform
🐧 Linux (Ubuntu, Amazon Linux)
```

**Tier 2 — Proficient (Dùng được, cần ôn thêm):**
```
☸️ Kubernetes (EKS cơ bản)
📦 Helm Charts
🔍 Prometheus + Grafana
🌐 Nginx / Traefik
🔑 Vault (HashiCorp)
```

**Tier 3 — Learning (Đang học 2026):**
```
🚀 ArgoCD / FluxCD (GitOps)
☁️ AWS CDK (Infrastructure as real code)
🤖 Platform Engineering concepts
📊 OpenTelemetry
```

### Certification Wall
```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   AWS CLF-C02   │  │   AWS SAA-C03   │  │  [Coming 2026]  │
│   ✅ Verified   │  │   🎯 Target Q3  │  │  AWS DevOps Pro │
│   [Verify link] │  │                 │  │                  │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

### "Currently Focused On" — Cập nhật hàng quý
> Dạng frontmatter trong 1 file config — sửa là tự cập nhật

```yaml
# data/focus.yml
current_quarter: Q3 2026
learning:
  - "AWS Solutions Architect Associate"
  - "GitOps với ArgoCD trên EKS"
building:
  - "Internal Developer Platform concept"
reading:
  - "Team Topologies — Matthew Skelton"
```

---

## 4. 📝 /blog — Lab Notes & Deep Dives

### Format bài viết nên có

**Đừng viết lý thuyết** — format hiệu quả nhất là:

> *"Tôi làm X — đây là những gì xảy ra, tại sao, và fix thế nào"*

### Các bài có sức nặng cao nhất cho DevOps blog:

**Loại 1 — Postmortem / Incident Report:**
```
"Tại sao production down lúc 2AM và tôi học được gì"
→ Timeline sự kiện → Root cause → Fix → Prevention
```

**Loại 2 — Cost Breakdown thật:**
```
"AWS bill của tôi từ $0 → $50 → tôi optimize còn $12/tháng"
→ Từng dịch vụ → Tip cụ thể → Screenshot bill thật
```

**Loại 3 — Step-by-step Lab:**
```
"Dựng Grafana + Prometheus monitoring trên EC2 free tier"
→ Từng lệnh thật → Screenshot thật → Kết quả thật
```

**Loại 4 — Architecture Decision:**
```
"Tại sao tôi chọn ECS thay vì EKS cho side project"
→ So sánh trade-off → Decision matrix → Kết luận
```

**Loại 5 — Chia sẻ cá nhân (bạn đang làm rất tốt):**
```
"Hành trình chinh phục AWS CLF-C02 — 3 lần thi mới đỗ"
→ Kết nối cảm xúc → Bài học thật → Giúp người đọc
```

### Tags nên chuẩn hóa
```
#aws #devops #terraform #kubernetes #cicd 
#monitoring #security #cost-optimization #career #lab
```

---

## 5. 🔬 /lab — Experiments Đang Chạy Thật

> Đây là section **hiếm nhất và ấn tượng nhất** — hầu như không portfolio nào có.

### Concept: "Open Lab"

Một trang liệt kê các **experiment nhỏ bạn đang chạy thật** với status live:

```
┌─────────────────────────────────────────────────┐
│ 🧪 Lab #001 — Terraform Module Registry        │
│ Status: 🟢 Active | Started: 2026-03-01        │
│ Goal: Build reusable Terraform modules         │
│ Progress: 3/5 modules done                     │
│ [Xem code] [Đọc notes]                         │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ 🧪 Lab #002 — Self-healing Infrastructure      │
│ Status: 🟡 In Progress | Started: 2026-05-15   │
│ Goal: Auto-restart failed containers với K8s   │
│ Progress: Setup xong, testing phase            │
│ [Xem code] [Đọc notes]                         │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ 🧪 Lab #003 — AWS Free Tier Monitoring         │
│ Status: ✅ Done | Completed: 2026-04-20        │
│ Result: Dashboard public nhúng vào đây         │
│ [Xem Grafana dashboard] [Đọc bài blog]         │
└─────────────────────────────────────────────────┘
```

### Một số Lab ideas cụ thể:
- **Uptime monitor** của chính trang web này — nhúng public Grafana
- **GitHub Actions benchmark** — so sánh build time qua các versions
- **AWS Cost tracker** — Lambda chạy daily, lưu vào DynamoDB, hiển thị chart
- **SSL cert monitor** — script check và alert trước 30 ngày

---

## 6. 📅 /journey — Timeline Cá Nhân

> Đây là thứ **connect cảm xúc** — người đọc thấy bạn là con người thật, không phải robot.

### Format timeline đề xuất:

```
2022 ───────────────────────────────────────────── 2026

📚 2022        🎓 2023           🔬 2024-2025        🚀 2026
Bắt đầu IT    Thực tập lần đầu  Tự học DevOps       DevOps Engineer
               Biết Docker       AWS CLF-C02          Blog 1000 views/tháng
               Viết blog đầu     Side projects        Open source contrib
```

### Nội dung mỗi mốc nên có:
- **Sự kiện chính** (1 câu)
- **Bài học rút ra** (2-3 câu ngắn)
- **Link liên quan** (cert, project, blog post)

> **Không cần dài** — 5-7 mốc quan trọng là đủ, viết thật và sâu hơn là viết nhiều.

---

## 7. 📬 /contact & Open Source

### Contact section đơn giản, hiệu quả:
```
Tôi mở cho:
✅ Hợp tác dự án DevOps/Cloud
✅ Mentoring sinh viên IT
✅ Góp ý blog / kỹ thuật
✅ Câu hỏi về AWS / Infrastructure

[GitHub]  [LinkedIn]  [Email]
```

### Open Source Contributions (nếu có):
- List các PR bạn đã merge vào project khác
- List các GitHub repos của bạn có star/fork
- Terraform modules bạn publish lên registry

---

## 🏗️ Technical Stack đề xuất

> Bạn đang dùng Next.js + GitHub Pages — hoàn toàn phù hợp, không cần đổi.

| Thành phần | Tool | Lý do |
|-----------|------|--------|
| **Framework** | Next.js (hiện tại) | SEO tốt, static export được |
| **Content** | Markdown + Frontmatter | Viết nhanh, version control |
| **Hosting** | GitHub Pages / Vercel | Free, CI/CD tích hợp sẵn |
| **API động** | GitHub API + Vercel Edge | Fetch live data không cần backend |
| **Monitoring** | UptimeRobot (free) | Badge public dễ nhúng |
| **Analytics** | Umami self-hosted / Vercel Analytics | Privacy-first, miễn phí |
| **Diagrams** | Mermaid (nhúng trong MD) | Version control được, không cần tool ngoài |
| **Images** | Cloudinary / GitHub LFS | Tối ưu tự động |

---

## 📈 Lộ trình triển khai (theo phase)

### Phase 1 — Foundation (Tháng 1-2)
- [ ] Thêm Live Status widgets vào trang chủ (GitHub API + Vercel API)
- [ ] Chuẩn hóa format Projects với Architecture diagram
- [ ] Tạo page /skills với Certification wall
- [ ] Setup Umami analytics

### Phase 2 — Content (Tháng 3-4)
- [ ] Viết 3 bài blog dạng Lab Notes thực chiến
- [ ] Hoàn thiện /journey timeline
- [ ] Tạo 3 project case study có số liệu thật
- [ ] Mở /lab page với 2 experiment đầu tiên

### Phase 3 — Scale (Tháng 5-6)
- [ ] GitHub Actions tự động cập nhật quick stats
- [ ] Nhúng Grafana dashboard public vào /lab
- [ ] Thêm RSS feed cho blog
- [ ] Submit lên các nền tảng (daily.dev, Hashnode, dev.to)

---

## 💡 Nguyên tắc "Dùng được nhiều năm"

### ✅ Nên làm:
1. **Content-driven** — mọi dữ liệu từ file markdown/YAML, không hardcode HTML
2. **Modular** — mỗi section là component độc lập, thêm/xóa không ảnh hưởng phần còn lại
3. **Real metrics** — chỉ hiển thị số liệu có thể verify được
4. **Progressive enhancement** — website hoạt động tốt kể cả khi API fail
5. **Version controlled** — mọi thứ trong Git, kể cả data

### ❌ Tránh:
1. **Hardcode số liệu** — "5 năm kinh nghiệm" sẽ lỗi thời sau 6 tháng
2. **Screenshot diagram** — dùng Mermaid code, chỉnh sửa được
3. **Ảnh nặng không tối ưu** — dùng WebP, lazy load
4. **Dependency vào service trả phí** — ưu tiên free tier hoặc self-hosted
5. **Design quá fancy** — content > design, người ta nhớ bài viết, không nhớ màu nền

---

## 🎯 KPI đo lường thành công

| Chỉ số | Mục tiêu 6 tháng | Mục tiêu 1 năm |
|--------|-----------------|----------------|
| Blog views/tháng | 500 | 2,000 |
| GitHub followers | 50 | 150 |
| LinkedIn profile views | +100% | +300% |
| Project GitHub stars | 10 | 50 |
| Inbound opportunities (job/collab) | 2 | 8 |

---

> **Kết luận:** Website của bạn nên là *living proof* — bằng chứng sống rằng bạn đang làm DevOps thật sự, không phải một bản CV đẹp. Sự khác biệt lớn nhất so với 99% portfolio còn lại là: **dữ liệu real-time, diagram thật, số liệu thật, và blog giải quyết đúng vấn đề người đọc đang gặp.**
