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
                user_id, movie_id, value
            FROM user_rating
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
    rating = get_data()
    ratingDF = pd.DataFrame(rating, columns=["User ID", "Movie ID", "Rating"])
    
    ratingDF = ratingDF.sort_values(by=["User ID", "Movie ID"])
    
    ratingDF.to_csv("recommender_server/recommender/ratings.csv", index=False)
        

main()
