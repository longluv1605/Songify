import Database from "../../database/database";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
//TODO: add jsonwebtoken into packeage.json
import jwt from "jsonwebtoken";

class AdminLoginController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public postLoginData = async (req: Request, res: Response) => {
        try {
            const username = req.body.username;
            const password = req.body.password;

            const sql: string = `SELECT * FROM admin WHERE (username = ? OR email = ?) AND password = ?`;
            const data = await this.db.query(sql, [username, username, password]);
            if (data.length === 0) {
                res.status(300).json({ message: "User not found" });
            } else {
                const userId = data[0].id; //TODO: xử lý lỗi

                //creat JWT
                const secret_key: string = process.env.SECRET_KEY || "";
                const token = jwt.sign({ userId }, secret_key, {
                    expiresIn: "30m",
                    algorithm: "HS256",
                }); // TODO: change expiresIn, add more payload to creat jwt (time, randomId)
                res.status(200).json({ token }); // TODO: nhắc frontend lưu token vào localstorage phía client và sau đó gửi vào headers.Authorization: Beared ${token} cùng request
            }
        } catch (err) {
            res.status(500).json({ err });
        }
    };
}

export default AdminLoginController;
