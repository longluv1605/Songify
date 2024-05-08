# Các api và đường link cùng phương thức http
| API             | Link                                 | Http method | Request Body|
|-----------------|--------------------------------------|-------------|-------------|
| `login` | `http://localhost:8080/api/login` | `POST` | `JSON{"username": "?", "password": "?"}` |
| `register` | `http://localhost:8080/api/register` | `POST` | `JSON{"username": "?", "firstName": "?", "lastName": "?", "email": "?", "password": "?"}` |
| `home` | `http://localhost:8080/api/?userId=` | `GET` |  |
| `movie` | `http://localhost:8080/api/movie?movieId=&userId=` | `GET` |  |
| `plan` | `http://localhost:8080/api/plans?userId=` | `GET` |  |
| `search` | `http://localhost:8080/api/search?string=&userId=` | `GET` |  |
| `filter` | `http://localhost:8080/api/movies?genre=&userId=` | `GET` |  |
| `profile` | `` | `` |  |