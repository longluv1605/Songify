import mariadb
import pandas as pd

def get_data():
    # Cấu hình kết nối
    config = {
        "host": "localhost",
        "user": "root",
        "password": "ducminh0985978867",
        "database": "moflix",
        "port": 8000,  # Port mặc định của MariaDB là 3306
    }

    try:
        # Tạo kết nối
        conn = mariadb.connect(**config)
        print("Kết nối thành công đến MariaDB")

        # Tạo con trỏ để thực hiện truy vấn
        cursor = conn.cursor()

        sql = """
            SELECT 
                m.id,
                mg.genres
            FROM 
                movie m
            LEFT JOIN 
                (SELECT movie_id, GROUP_CONCAT(DISTINCT genre_name ORDER BY genre_name SEPARATOR ', ') AS genres FROM movie_genre GROUP BY movie_id) mg ON m.id = mg.movie_id
            GROUP BY 
                m.id
        """

        # Ví dụ về một truy vấn SQL
        cursor.execute(sql)

        # Lấy kết quả truy vấn
        # for row in cursor:
        #     print(row)

        return cursor.fetchall()

    except mariadb.Error as e:
        print(f"Error connecting to MariaDB Platform: {e}")

    finally:
        # Đóng kết nối
        if conn:
            conn.close()
            print("Đã đóng kết nối đến MariaDB")



def main():
    movies = get_data()
    cols = ["Movie ID", "Action", "Adventure", "Animation","Comedy","Crime","Documentary","Drama",
              "Family","Fantasy","History","Horror","Music","Mystery","Romance","Science Fiction",
              "Thriller","TV Movie","War","Western"]
    movieDF = pd.DataFrame([], columns=cols)
    for movie in movies:
        id = movie[0]
        genres = movie[1].split(", ")
        row = [0]*20
        row[0] = id
        for genre in genres:
            index = cols.index(genre)
            row[index] = 1
        movieDF = pd.concat([movieDF, pd.DataFrame([row], columns=cols)], ignore_index=True)
    movieDF.to_csv("recommender_server/recommender/movies.csv", index=False)
        

main()
