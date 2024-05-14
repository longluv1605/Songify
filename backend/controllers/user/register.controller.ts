import Database from "../../database/database";
import { Request, Response } from "express";

class RegisterController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public postRegisterData = async (req: Request, res: Response) => {
        try {
            const username = req.body.username;
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const email = req.body.email;
            const password = req.body.password;

            if (
                username == undefined ||
                firstName == undefined ||
                lastName == undefined ||
                email == undefined ||
                password == undefined
            ) {
                res.status(400).json({ message: "All fields are required" });
                return;
            }

            const sql: string = `SELECT * FROM user WHERE email = ? OR username = ?`;
            const checker = await this.db.query(sql, [email, username]);

            if (checker.length > 0) {
                res.status(300).json({ message: "User already exists!" });
                return;
            }

            const insertSql: string = `INSERT INTO user (username, password, first_name, last_name, email)
                                        VALUES (?, ?, ?, ?, ?)`;

            const data = await this.db.query(insertSql, [
                username,
                password,
                firstName,
                lastName,
                email,
            ]);

            console.log(data);

            console.log(parseInt(data.insertId));

            const userId = parseInt(data.insertId);

            res.status(200).json({ userId });
        } catch (err) {
            res.status(500).json({ err });
        }
    };
}

export default RegisterController;
