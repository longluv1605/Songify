import mariadb
import sys
import config

# Connect to MariaDB Platform
try:
    conn = mariadb.connect(
        user=config.USER,
        password=config.PASSWORD,
        host=config.HOST,
        port=config.PORT,
        database=config.DATABASE
    )
except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
    sys.exit(1)

# Get Cursor
cur = conn.cursor()

def create_table():
    with open("database/create_table.sql") as f:
        sql = f.read()
        print(sql)
        cur.execute(sql)
        conn.commit()
        
        
def create_trigger():
    with open("database/create_trigger.sql") as f:
        sql = f.read()
        cur.execute(sql)
        conn.commit()
        
def insert_1st_data():
    with open("database/insert1st/user.sql") as f:
        sql = f.read()
        cur.execute(sql)
        conn.commit()
        f.close()
    with open("database/insert1st/movie.sql") as f:
        sql = f.read()
        cur.execute(sql)
        conn.commit()
        f.close()
    with open("database/insert1st/genre.sql") as f:
        sql = f.read()
        cur.execute(sql)
        conn.commit()
        f.close()
    with open("database/insert1st/label.sql") as f:
        sql = f.read()
        cur.execute(sql)
        conn.commit()
        f.close()
    with open("database/insert1st/pricing_plan.sql") as f:
        sql = f.read()
        cur.execute(sql)
        conn.commit()
        f.close()
    with open("database/insert1st/admin.sql") as f:
        sql = f.read()
        cur.execute(sql)
        conn.commit()
        f.close()
        
def insert_2nd_data():
    with open("database/insert2nd/comment.sql") as f:
        sql = f.read()
        cur.execute(sql)
        conn.commit()
        f.close()
    with open("database/insert2nd/movie_genre.sql") as f:
        sql = f.read()
        cur.execute(sql)
        conn.commit()
        f.close()
    with open("database/insert2nd/movie_label.sql") as f:
        sql = f.read()
        cur.execute(sql)
        conn.commit()
        f.close()
    with open("database/insert2nd/movie_view.sql") as f:
        sql = f.read()
        cur.execute(sql)
        conn.commit()
        f.close()
    with open("database/insert2nd/user_history.sql") as f:
        sql = f.read()
        cur.execute(sql)
        conn.commit()
        f.close()
    with open("database/insert2nd/user_plan.sql") as f:
        sql = f.read()
        cur.execute(sql)
        conn.commit()
        f.close()
        
    for i in range(1, 12):
        with open(f"database/insert2nd/user_rating/user_rating_{i}.sql") as f:
            sql = f.read()
            cur.execute(sql)
            conn.commit()
            f.close()

    

def close_conn():
    cur.close()
    conn.close()
    
def main():
    create_table()
    create_trigger()
    insert_1st_data()
    insert_2nd_data()
    
    close_conn()
    
if __name__ == "__main__":
    main()
