---
title: "Hướng dẫn Build Blog Cá Nhân 0 Đồng: Từ Namecheap đến GitHub Actions"
date: 2024-05-20
tags: ["DevOps", "Github Actions", "Hugo", "Tutorial"]
categories: ["Hành trình DevSecOps"]
author: "EurusDevSec"
description: "Quy trình chi tiết xây dựng hệ thống Blog tự động hóa hoàn toàn với chi phí 0đ dành cho sinh viên."
---

Chào mọi người, mình là **EurusDevSec**. Là một sinh viên năm 4 đang theo đuổi lộ trình **DevSecOps**, mình luôn tìm cách tối ưu hóa công cụ làm việc với chi phí thấp nhất. 

Bài viết này tổng hợp lại toàn bộ quá trình mình xây dựng Blog [eurusdev.me](https://eurusdev.me) từ con số 0, sử dụng các công cụ chuyên nghiệp như **Hugo**, **GitHub Actions**, và tên miền miễn phí từ **GitHub Student Developer Pack**.

---

## 🚀 1. Chuẩn bị "Vũ khí" (Cấp độ Sinh viên)

Để bắt đầu, bạn cần sở hữu các tài khoản sau:
*   **GitHub Student Developer Pack**: "Kho báu" cho sinh viên. Đăng ký bằng email trường tại [education.github.com](https://education.github.com).
*   **Tên miền miễn phí**: Truy cập [nc.me](https://nc.me) (Namecheap for Students), kết nối tài khoản GitHub và "claim" ngay một tên miền `.me` (Ví dụ của mình là `eurusdev.me`).

---

## 🛠 2. Thiết lập hạ tầng (Infrastructure Setup)

### Cấu hình DNS trên Namecheap
Để tên miền trỏ về GitHub, bạn vào mục **Advanced DNS** trên Namecheap và thêm 5 bản ghi sau:

1.  **4 bản ghi A Records** (Host: `@`) trỏ về IP của GitHub:
    *   `185.199.108.153`
    *   `185.199.109.153`
    *   `185.199.110.153`
    *   `185.199.111.153`
2.  **1 bản ghi CNAME Record** (Host: `www`) trỏ về: `[username].github.io`.

### Khởi tạo Repo trên GitHub
Tạo một Repository mới tên là `[username].github.io`. Đây là nơi chứa toàn bộ mã nguồn của bạn.

---

## 🏗 3. Xây dựng "Động cơ" Hugo (Local Setup)

Mình sử dụng **Hugo** vì nó cực nhanh và bảo mật (Static Site).

1.  **Cài đặt Hugo Extended**: 
    *   Dùng lệnh: `choco install hugo-extended -y` (trên Windows với quyền Admin).
2.  **Tạo Site mới trong Obsidian**: 
    *   Di chuyển vào Vault Obsidian của bạn và gõ: `hugo new site eurusdev-blog`.
3.  **Mặc "áo" (Theme) cho Blog**:
    *   Dùng PaperMod: `git submodule add https://github.com themes/PaperMod`.
    *   Sửa file `hugo.toml`: thêm dòng `theme = "PaperMod"` và `baseURL = "https://yourdomain.me"`.

---

## 🤖 4. Tự động hóa CI/CD với GitHub Actions

Đây là phần "linh hồn" của DevOps. Chúng ta thiết lập để mỗi khi viết bài trong Obsidian và `Push`, web sẽ tự cập nhật.

Tạo file `.github/workflows/hugo.yml` với nội dung script tự động build Hugo (nhớ sử dụng bản `peaceiris/actions-hugo@v3`). 

> **Kinh nghiệm xương máu**: Hãy kiểm tra kỹ từng ký tự, thiếu một chữ 's' trong tên action cũng khiến pipeline của bạn "toang" ngay lập tức!

---

## ✍️ 5. Quy trình làm việc hàng ngày (Workflow)

Từ giờ, mình không cần đụng vào code hay Terminal nữa:
1.  **Mở Obsidian**: Viết bài bằng Markdown trong thư mục `content/posts/`.
2.  **Đẩy bài**: Sử dụng plugin **Obsidian Git** để `Commit` và `Push`.
3.  **Tận hưởng**: GitHub Actions sẽ tự động "nấu" bài viết và đẩy lên `eurusdev.me` sau 30 giây.

---

## 💡 Tổng kết

Việc xây dựng Blog này không chỉ giúp mình có một nơi lưu trữ kiến thức, mà còn là bài thực hành thực tế về:
*   Quản lý **DNS** và tên miền.
*   Sử dụng **Git** và **Submodule**.
*   Thiết lập luồng **CI/CD** chuyên nghiệp.
*   Tư duy **Troubleshooting** khi gặp lỗi hệ thống.

Hy vọng hướng dẫn này giúp ích cho các bạn sinh viên đang muốn xây dựng Portfolio cá nhân với chi phí 0đ!

---
**EurusDevSec** - *Hành trình trở thành kỹ sư DevSecOps.*
