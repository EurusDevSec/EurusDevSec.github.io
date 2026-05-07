import requests
import threading

# CẢNH BÁO: Chỉ sử dụng script này trên website mà bạn sở hữu/có quyền kiểm thử.
target_url = "http://localhost:3000" # Thay thế bằng URL của bạn
threads_count = 100  # Số lượng luồng đồng thời

def send_requests():
    while True:
        try:
            response = requests.get(target_url)
            print(f"Status: {response.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"Lỗi kết nối: {e}")

# Tạo và chạy các luồng (threads)
for i in range(threads_count):
    thread = threading.Thread(target=send_requests)
    thread.start()
