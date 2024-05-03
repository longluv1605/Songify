import { createPool, Pool, PoolConnection } from "mariadb";
import dotenv from "dotenv";

class Database {
    private pool: Pool;
    
    constructor() {
        dotenv.config();
        // console.log(process.env.DB_HOST);
        // console.log(process.env.DB_USER);
        // console.log(process.env.DB_PASS);
        // console.log(process.env.DB_NAME);   
        this.pool = createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        });
        // console.log("Database created")
    }

    async query(sql: string, params?: any[]): Promise<any[]> {
        let conn: PoolConnection | undefined;
        console.log("sql", sql); //
        try {
            conn = await this.pool.getConnection();
            // console.log("conn", conn); //
            const rows = await conn.query(sql, params);
            // console.log("rows", rows); //
            return rows;
        } catch (err) { 
            console.log(err); //
            throw err;
        } finally {
            // console.log("finally"); //
            if (conn) conn.release();
        }
    }
}

export default Database;
