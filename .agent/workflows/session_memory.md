# 💾 SESSION MEMORY — EurusDevSec
> Last Checkpoint: 2026-06-15 | Status: Interactive Infra Pipeline Map & Sticky Sidebar Implemented

---

## ⚡ Active Task Completed (Những việc ĐÃ HOÀN THÀNH trong session)
*   **[Interactive Infra Pipeline Map]:**
    *   Tạo mới component [InfraPipeline.tsx](file:///r:/_Dev_tools/obsidian/oBsidianFolder/Eurus_Vault/01_Projects/eurusdevsec.github.io/components/blog/InfraPipeline.tsx) hiển thị sơ đồ SVG 5-phase DevOps/Cloud Pipeline, hỗ trợ luồng sáng động, hover hologram tooltip gợi ý bài viết liên quan dựa trên tag matching và responsive grid view trên di động.
    *   Tích hợp vào cuối trang bài viết [page.tsx](file:///r:/_Dev_tools/obsidian/oBsidianFolder/Eurus_Vault/01_Projects/eurusdevsec.github.io/app/blog/[slug]/page.tsx).
*   **[Sticky Sidebar & TOC]:**
    *   Chuyển cấu trúc `sticky` lên thẻ cha bao quát cả tác giả và mục lục, đồng thời giới hạn chiều cao tối đa của mục lục `max-h-[calc(100vh-280px)] overflow-y-auto` trong [TOC.tsx](file:///r:/_Dev_tools/obsidian/oBsidianFolder/Eurus_Vault/01_Projects/eurusdevsec.github.io/components/blog/TOC.tsx).
*   **[DevOps Content Roadmap]:**
    *   Tạo mới cẩm nang lộ trình bài viết thực chiến tăng cường **2 bài/tuần** với các dự án production-grade tại [DEVOPS_BLOG_ROADMAP.md](file:///r:/_Dev_tools/obsidian/oBsidianFolder/Eurus_Vault/01_Projects/eurusdevsec.github.io/docs/DEVOPS_BLOG_ROADMAP.md).
*   **[Meetup Blog Post]:**
    *   Cấu trúc lại, sửa lỗi chính tả và format bài viết [Sự thật về DevOps không như tôi nghĩ](file:///r:/_Dev_tools/obsidian/oBsidianFolder/Eurus_Vault/01_Projects/eurusdevsec.github.io/content/posts/Sự thật về DevOps không như tôi nghĩ/index.md).

## 🧠 Semantic Context Essence (Tinh túy kiến thức & Quyết định thiết kế)
*   **Sticky Sidebar Constraint:** Khi làm element sticky, nếu parent wrapper của nó có chiều cao bằng đúng chiều cao của chính nó, element sẽ không trượt được. Việc chuyển sticky lên khối bao quát `AuthorCard` + `TOC` giải quyết triệt để lỗi này.
*   **Next.js Image Sync:** Ảnh mới trong bài viết luôn cần đồng bộ qua script `scripts/copy-images.mjs` trước khi build.

## 🔜 Next Steps (3 hành động kỹ thuật trực tiếp kế tiếp)
- [ ] **Step 1:** Thực hiện dọn dẹp các file kỹ năng WordPress cũ không dùng trong thư mục `.agent/skills/`.
- [ ] **Step 2:** Viết bài viết DevOps đầu tiên theo lộ trình: "Docker Security & Multi-stage building with Trivy Scan".
- [ ] **Step 3:** Đồng bộ và cập nhật danh sách kỹ năng dự án vào [skills.md](file:///r:/_Dev_tools/obsidian/oBsidianFolder/Eurus_Vault/01_Projects/eurusdevsec.github.io/.agent/skills/skills.md).
