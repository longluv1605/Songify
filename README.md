# [Moflix - Nền tảng xem phim online.](https://github.com/longluv1605/Moflix)
[Repository](https://github.com/longluv1605/Moflix)

## Tài liệu.
[Bản báo cáo sản phẩm](https://github.com/longluv1605/Moflix/blob/main/B%C3%A1o%20c%C3%A1o.pdf)

## DEMO
1. Video đemo sản phẩm tại [đây](https://youtu.be/Mqgsmuj0PNk?si=t6pUTKKYlrAq9J65).

## Thông tin nhóm: Nhóm 99.

| `Họ và tên`       | `Mã sinh viên` | `Khóa`             |
| ----------------- | -------------- | ------------------ |
| `Phạm Thành Long` | `22022604`     | `QH-2022-I/CQ-AI2` |
| `Trần Tiến Nam`   | `22022594`     | `QH-2022-I/CQ-AI2` |
| `Phan Văn Hiếu`   | `22022527`     | `QH-2022-I/CQ-AI2` |
| `Nguyễn Đức Minh` | `22022533`     | `QH-2022-I/CQ-AI2` |

# I - Cài database

1. Tải và cài đặt mariadb
2. Mở query
3. Chạy truy vấn của file `/database/create_table.sql`
4. Chạy truy vấn của file `/database/create_trigger.sql`
5. Chạy truy vấn của các file trong thư mục `/database/insert1nd`
6. Chạy truy vấn của các file trong thư mục `/database/insert2nd`

# II - Config môi trường

1. Tạo file `.env` theo mẫu `.env.example`
2. Chỉnh sửa file config.py trong các app của recommender

# II - Chạy server

1. Mở cửa sổ dòng lệnh tại thư mục của project recommender trong recommender_server
   -> Chạy lệnh `python manage.py runserver 127.0.0.0:2000`
2. Mở cửa sổ dòng lệnh tại thư mục frontend
   -> Chạy lệnh `npm i`
   -> Chạy lệnh `npm run frontend`
3. Mở cửa sổ dòng lệnh tại thư mục frontend
   -> Chạy lệnh `npm i`
   -> Chạy lệnh `npm run backend`

## Sử dụng docker-compose
1. Tải và cài đặt docker desktop
2. Chỉnh sửa các biến trong environment của từng services trong file `docker-compose.yaml`
3. Mở dự án, truy cập vào cửa sổ dòng lệnh, nhập `docker-compose up --build`

# III - Sử dụng
1. Truy cập `http://localhost:3000/` để truy cập vào web xem phim.
2. Để truy cập vào mục quản trị dành riêng cho admin, truy cập `http://localhost:3000/admin/`
