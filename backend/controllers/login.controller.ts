import Database from "../database/database";
import { Request, Response } from "express";
require('dotenv').config({ path: '../../.env' });
//TODO: add jsonwebtoken into packeage.json
import jwt from "jsonwebtoken";


class LoginController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public postLoginData = async (req: Request, res: Response) => {
        try {
            const email = req.body.email;
            const password = req.body.password;

            const sql: string = `SELECT * FROM user WHERE email = ? AND password = ?`;
            const data = await this.db.query(sql, [email, password]);
            const userId = data[0].id;
            if (data.length === 0) {
                res.status(300).json({ message: "User not found" });
            } else {

                //creat JWT
                const secret_key: string = process.env.SECRET_KEY || "";
                const token = jwt.sign({ userId }, secret_key, { expiresIn: '1h',algorithm: 'HS256' });
                res.status(200).json({ token }); // lưu token vào localstorage phía client
            }
        } catch (err) {
            res.status(500).json({ err });
        }
    };
}

export default LoginController;
