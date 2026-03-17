---
title: "Sổ tay vọc vạch Hugo & PaperMod (Best Practices)"
date: 2026-03-17
tags: ["hugo", "guide", "cheatsheet"]
categories: ["Tech"]
ShowToc: true
TocOpen: true
---

Chào mừng bạn đến với cuốn cẩm nang sử dụng Hugo. Bài viết này được đánh dấu là `draft: true` nên sẽ không hiển thị lên web thật (trừ khi bạn đổi thành `false`). Hãy giữ nó lại làm tài liệu tham khảo để tự vọc vạch, tự code và tuỳ biến blog của mình!

## 1. Cấu trúc thư mục (Cái gì để ở đâu?)

Để tự code và tuỳ biến Hugo, bạn phải nắm rõ ý nghĩa các thư mục trong `eurusdevsec.github.io/`:

- `hugo.toml`: File cấu hình "trái tim" của cả trang web. Mọi tuỳ biến tên, menu, tính năng theme đều ở đây.
- `content/`: Nơi chứa BÀI VIẾT (Markdown). Bạn tạo thư mục con thoải mái (ví dụ: `content/posts/`, `content/homelab/`).
- `static/`: Nơi chứa tài nguyên TĨNH (Ảnh, file PDF, file nén).
  - _Best Practice:_ Tạo thư mục `static/images/`. Khi viết bài, nhúng ảnh bằng cú pháp `![Tên ảnh](/images/anh-cua-toi.png)`.
- `themes/PaperMod/`: Mã nguồn gốc của giao diện. **TUYỆT ĐỐI KHÔNG SỬA CODE TRONG NÀY**, vì khi update theme sẽ mất hết.
- `layouts/`: Nơi bạn viết code HTML để **ghi đè (override)** lên theme.
- `assets/`: Nơi chứa Custom CSS hoặc JS của riêng bạn.

---

## 2. Frontmatter - Quyền năng của từng bài viết

Mỗi bài viết Markdown đều bắt đầu bằng một khối YAML (Frontmatter). Đối với theme PaperMod, bạn có thể thêm các thông số cực xịn sau để "độ" bài viết:

```yaml
---
title: "Tên bài viết"
date: 2026-03-17
draft: false
tags: ["linux", "security"]
categories: ["DevSecOps"]

# Các biến nâng cao của PaperMod:
ShowToc: true # Hiển thị Mục lục (Table of Contents)
TocOpen: true # Mở sẵn mục lục
cover:
  image: "/images/cover1.png" # Ảnh bìa siêu to ở đầu bài viết
  alt: "Mô tả ảnh bìa"
  caption: "Chú thích dưới ảnh bìa"
ShowCodeCopyButtons: true # Hiện nút copy cho các block code
---
```

---

## 3. Cách tự Code và Sửa Giao Diện (Override)

Nguyên tắc tối thượng của Hugo: **Thư mục gốc ưu tiên cao hơn thư mục themes**.

### A. Đổi màu sắc, chỉnh CSS (Custom CSS)

Nếu bạn thấy màu mặc định không đẹp và muốn viết CSS bằng tay:

1. Tạo thư mục/file theo đúng đường dẫn này: `assets/css/extended/custom.css`.
2. Viết CSS của bạn vào, ví dụ:

```css
/* Đổi màu chữ của tiêu đề */
.post-title {
  color: #ff6600;
}
```

PaperMod sẽ tự động nhận file này và gộp vào website mà không làm hỏng theme gốc.

### B. Can thiệp vào HTML (Override Layouts)

Giả sử bạn muốn sửa phần dưới cùng của trang web (Footer).

1. Vào `themes/PaperMod/layouts/partials/` tìm file `footer.html`.
2. **Copy** file đó ra và dán vào thư mục gốc của bạn: `layouts/partials/footer.html` (chưa có thư mục thì tự tạo).
3. Bây giờ bạn có thể thoải mái sửa HTML trong file ở ngoài thư mục gốc. Hugo sẽ tự động dùng file của bạn thay cho file của theme!

---

## 4. Quản lý Ảnh chuyên nghiệp (Page Bundles)

Thay vì ném mọi ảnh vào `/static/images/` làm nó thành một "bãi rác" sau 1 năm, bạn nên dùng **Page Bundles**.

Cách cấu trúc:

```text
content/
└── posts/
    └── hack-wifi-101/
        ├── index.md    <-- Nội dung bài viết
        ├── image1.png  <-- Ảnh của riêng bài này
        └── image2.jpg  <-- Ảnh của riêng bài này
```

Khi dùng Page Bundles, trong bài viết `index.md`, bạn gọi ảnh cực ngắn gọn:
`![Minh họa](image1.png)` (không cần dẫn đường dẫn dài thòng lọng nữa).

---

## 5. Cú pháp Shortcodes (Code HTML thẳng vào Markdown)

Đôi khi Markdown không đủ (ví dụ bạn muốn chèn Video YouTube, chèn link Tweet). Hugo có sẵn Shortcodes:

**Chèn YouTube:**

```text
{{< youtube id="dQw4w9WgXcQ" >}}
```

**Chèn Ảnh với Caption (Figure):**

```text
{{< figure src="/images/devsecops.png" caption="Mô hình DevSecOps" >}}
```

_Lưu ý: Bỏ dấu cách ở giữa `{ {` đi, trong tài liệu này viết liền nó bị render mất._

---

## 6. Lệnh Terminal cần nhớ

- **Tạo bài mới chuẩn Hugo:**
  ```bash
  hugo new posts/ten-bai-viet.md
  ```
- **Chạy Server test (hiện cả bài Draft):**
  ```bash
  hugo server -D
  ```
- **Build ra HTML tĩnh (tạo ra thư mục public):**
  ```bash
  hugo
  ```
  _(Thực ra trên Github Actions nó sẽ tự chạy lệnh này, bạn chỉ cần gõ lệnh `git push` là đủ!)_
