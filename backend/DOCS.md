# Các api và đường link cùng phương thức http phía KHÁCH HÀNG
|Task             | API             | Link                                 | Http method | Request Body|
|-----------------|-----------------|--------------------------------------|-------------|-------------|
| Đăng nhập | `login` | `http://localhost:8080/api/login` | `POST` | `JSON{"username": "?", "password": "?"}` |
| Đăng kí | `register` | `http://localhost:8080/api/register` | `POST` | `JSON{"username": "?", "firstName": "?", "lastName": "?", "email": "?", "password": "?"}` |
| Lấy data trang chủ | `home` | `http://localhost:8080/api/?userId=` | `GET` |  |
| Lấy data bộ phim | `movie` | `http://localhost:8080/api/movie?movieId=&userId=` | `GET` |  |
| Lấy data gói| `plan` | `http://localhost:8080/api/plans?userId=` | `GET` |  |
| Lấy kết quả tìm kiếm| `search` | `http://localhost:8080/api/search?string=&userId=` | `GET` |  |
| Lấy kết quả lọc theo danh mục | `filter` | `http://localhost:8080/api/movies?genre=&userId=` | `GET` |  |
| Lấy comment | `comment` | `http://localhost:8080/api/comment?movieId=&userId=` | `GET` |||
| Lấy thông tin về trang cá nhân | `profile` | `http://localhost:8080/api/profile?userId=` | `GET` |  |
| Thêm comment | `comment` | `http://localhost:8080/api/comment?movieId=&userId=` | `POST` | `JSON{"cmtText": "?"}`||
| Thêm rating | `rating` | `http://localhost:8080/api/rating?movieId=&userId=` | `POST` | `JSON{"rating": ?}`||
| Thêm lịch sử xem khi nhấn xem | `movie` | `http://localhost:8080/api/movie?movieId=&userId=` | `POST` |  |
| Thay đổi thông tin cá nhân | `profile` | `http://localhost:8080/api/profile?userId=` | `PUT` | `JSON{"firstName": "?", "lastName": "?", "email": "?"} - cái nào không có thì không cho vào` |
| Thay đổi password | `password` | `http://localhost:8080/api/password?userId=` | `PUT` | `JSON{"oldPassword": "?", "newPassword": "?"}` |
| Thay đổi lượng view của phim khi nhấn xem | `movie` | `http://localhost:8080/api/movie?movieId=&userId=` | `PUT` |  |