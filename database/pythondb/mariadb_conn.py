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
        cur.execute(sql)
        conn.commit()
        
        
def create_trigger():
    with open("database/create_trigger.sql") as f:
        sql = f.read()
        cur.execute(sql)
        conn.commit()
        
def insert_data():
    with open("database/insert_data.sql") as f:
        sql = f.read()
        cur.execute(sql)
        conn.commit()
        
def select_data():
    cur.execute("SELECT * FROM pricing_plan")
    for _ in cur:
        print(_)

def close_conn():
    cur.close()
    conn.close()
    
def main():
    select_data()
    close_conn()
    
if __name__ == "__main__":
    main()
