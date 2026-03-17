---
title: Quy trình học 5 bước "Từ Hình ảnh đến Bản năng"
date: 2026-03-17
tags:
  - Learn
  - guide
  - workflow
categories:
  - Tech
ShowToc: true
TocOpen: true
---

![](/images/Learning_method.gif)

### 🗺️ Quy trình học 5 bước: "Từ Hình ảnh đến Bản năng"

#### Bước 1: Quét (Scan) & Hình dung (Visualizing)

- **Hành động:** Xem qua Video/Tutorial để nắm tên các dịch vụ, nhưng **trọng tâm là tìm Diagram (Sơ đồ kiến trúc)**.
- **Mục tiêu:** Trả lời được câu hỏi: _"Cái này nằm ở đâu trong bức tranh tổng thể và nó nối với cái gì?"_
- **Ghi chú:** Đừng cố nhớ thông số kỹ thuật ở bước này, chỉ cần nhớ "hình dáng" của nó.

#### Bước 2: Phản biện & Đào sâu (Questioning)

- **Hành động:** Đặt câu hỏi cho Gemini về các mối quan hệ. Ví dụ: _"Tại sao phải cần IGW khi đã có Route Table?"_ hay _"Nếu không có NACL thì chuyện gì xảy ra?"_.
- **Mục tiêu:** Hiểu **Core Logic** (Tại sao nó lại tồn tại? Nó giải quyết vấn đề gì?).
- **Mẹo:** Tự vẽ lại sơ đồ bằng tay (hoặc công cụ vẽ) theo cách bạn hiểu.

#### Bước 3: Thực hành "Xây và Phá" (Hands-on & Destroy)

- **Hành động:** Lao vào AWS Console làm Lab.
- **Nguyên tắc:** 1. Làm theo hướng dẫn. 2. Làm xong thì **Xoá hết**. 3. Thử tự làm lại mà không nhìn hướng dẫn.
- **Mục tiêu:** Tạo **Muscle Memory** (Phản xạ cơ bắp). Khi tay bạn quen với các thao tác, não bạn sẽ rảnh rang để tư duy về kiến trúc.

#### Bước 4: Lưu trữ "Bộ não thứ hai" (Obsidian Documentation)

- **Hành động:** Note lại vào Obsidian.
- **Cách viết:** Viết cho "bạn của tương lai". Sử dụng ngôn ngữ bình dân, ví dụ: _"NACL là anh bảo vệ mất trí nhớ, SG là anh lễ tân thông minh"_.
- **Mục tiêu:** Biến kiến thức của AWS thành kiến thức của mình. Không cần hoàn hảo, chỉ cần đủ để "nhắc bài" cho mình sau này.

#### Bước 5: Kiểm tra "Mạnh tay" (Quiz & Stress Test)

- **Hành động:** Nhờ Gemini tạo Quiz khó (Jon Bonso style) để kiểm tra các trường hợp "bẫy".
- **Mục tiêu:** Khám phá ra những "lỗ hổng" trong logic mà mình cứ tưởng là đã hiểu.

---

### 💡 Tại sao Workflow này lại hiệu quả với bạn?

- Nó đi từ **Tổng thể (Top-down)** xuống **Chi tiết (Bottom-up)**.
- Nó biến việc học từ **Thụ động (Nghe)** sang **Chủ động (Vẽ - Làm - Giải thích)**.
- Nó giúp bạn thoát khỏi cái bẫy "Biết nhưng không hiểu" (biết tên dịch vụ nhưng không biết dùng làm gì).
