import Database from "../database/database";
import { Request, Response } from "express";

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
                res.status(200).json({ userId });
            }
        } catch (err) {
            res.status(500).json({ err });
        }
    };
}

export default LoginController;
