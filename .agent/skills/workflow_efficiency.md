---
name: workflow_efficiency
description: Quy tắc tối ưu hóa tốc độ làm việc, tiết kiệm token và tránh lặp lại lỗi cho dự án Next.js
---

# Cẩm Nang Rút Kinh Nghiệm & Tối Ưu Hóa Quy Trình (Next.js & Git)

Tài liệu này ghi lại các bài học kinh nghiệm và quy tắc làm việc tối ưu nhằm tránh lặp lại lỗi, giảm thời gian xử lý và tiết kiệm token tối đa cho dự án EurusDevSec.

---

## 1. Tối ưu hóa Token qua việc đọc/tìm kiếm thông tin (Context Budget)
*   **Bài học:** Đọc toàn bộ thư mục lớn hoặc gọi quá nhiều tool nhỏ nhặt (như đọc file, grep search liên tục) gây lãng phí ngân sách Token của phiên chat.
*   **Quy tắc:**
    *   Sử dụng `list_dir` có mục tiêu trước khi đi sâu vào đọc code.
    *   Hạn chế chèn toàn bộ nội dung file lớn vào chat nếu chỉ cần chỉnh sửa một đoạn nhỏ. Sử dụng `view_file` với tham số `StartLine` và `EndLine`.
    *   Gộp các chỉnh sửa không liên tiếp trong cùng một file vào một cuộc gọi `multi_replace_file_content` duy nhất thay vì gọi `replace_file_content` nhiều lần liên tục.

## 2. Xác thực cấu trúc trước khi code (Layout Verification)
*   **Bài học:** Viết code ngay khi chưa kiểm tra cấu trúc layout hiện tại dẫn đến việc đặt sai component, sai import hoặc làm vỡ CSS.
*   **Quy tắc:**
    *   Luôn kiểm tra file parent layout (như `app/layout.tsx` hoặc page wrapper) để xem các component đang kế thừa cấu trúc CSS và context như thế nào.
    *   Trước khi sửa CSS, tìm kiếm xem các class tương ứng đã được định nghĩa ở đâu trong `globals.css` chưa để tránh viết đè (overriding) vô ích.

## 3. Quy trình build kiểm tra (Build-First Validation)
*   **Bài học:** Thực hiện nhiều thay đổi lớn mà không build thử, đến cuối cùng phát hiện lỗi gãy static path hoặc lỗi TypeScript rất khó debug.
*   **Quy tắc:**
    *   Sau mỗi tính năng lớn (như thêm bài viết mới, thêm component, sửa route), chạy lệnh `npm run build` để kiểm tra khả năng tương thích biên dịch tĩnh.
    *   Với hình ảnh trong bài viết markdown, luôn chạy `node scripts/copy-images.mjs` trước khi build.
