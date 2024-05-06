import mariadb from "mariadb";
import dotenv from "dotenv";

class Database {
    private pool: mariadb.Pool;

    constructor() {
        dotenv.config();
        // console.log(process.env.DB_HOST);
        // console.log(process.env.DB_USER);
        // console.log(process.env.DB_PASS);
        // console.log(process.env.DB_NAME);
        const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 2021;
        // console.log(port);

        this.pool = mariadb.createPool({
            host: process.env.DB_HOST,
            port: port,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        });
        // console.log(this.pool)
    }

    public query = async (sql: string, params?: any[]) => {
        let conn: mariadb.PoolConnection | undefined;

        try {
            conn = await this.pool.getConnection();
            const rows = await conn.query(sql, params);
            return rows;
        } catch (err) {
            console.log("Error executing query:", err);
            throw err; // Ném lại lỗi để xử lý ở nơi gọi phương thức này
        } finally {
            if (conn) {
                conn.end(); // Đảm bảo trả lại kết nối vào pool sau khi sử dụng xong
            }
        }
    };
}

export default Database;
