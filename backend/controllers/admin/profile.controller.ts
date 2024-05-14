import Database from "../../database/database";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../interfaces/authenticatedRequest";

class AdminProfileController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public getAdminData = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const sql: string = `SELECT id, username, first_name, last_name, email FROM admin`;
            const data = await this.db.query(sql);

            res.status(200).json({ data });
        } catch (err) {
            res.status(500).json({ err });
        }
    };

    public updateAdminData = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {
        try {
            const userId = parseInt(req.userId as string);
            if (userId == undefined || userId == null || Number.isNaN(userId)) {
                throw new Error("User not found");
            }

            const data = await this.db.query(
                "SELECT * FROM admin WHERE id = ?",
                [userId]
            );
            if (data.length === 0) {
                return res.status(300).json({ message: "User not found" });
            }

            let first_name = req.body.first_name;
            let last_name = req.body.last_name;
            let email = req.body.email;

            if (
                (first_name == undefined ||
                    first_name == null ||
                    first_name == "") &&
                (last_name == undefined ||
                    last_name == null ||
                    last_name == "") &&
                (email == undefined || email == null || email == "")
            ) {
                return;
            }
            if (
                first_name == undefined ||
                first_name == null ||
                first_name == ""
            ) {
                first_name = data[0].first_name;
            }
            if (
                last_name == undefined ||
                last_name == null ||
                last_name == ""
            ) {
                last_name = data[0].last_name;
            }
            if (email == undefined || email == null || email == "") {
                email = data[0].email;
            }

            const sql: string = `UPDATE admin SET first_name = ?, last_name = ?, email = ? WHERE id = ?`;
            await this.db.query(sql, [first_name, last_name, email, userId]);

            res.status(200).json({ message: "Admin data updated" });
        } catch (err) {
            res.status(500).json({ err });
        }
    };

    public changePassword = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {
        try {
            const userId = parseInt(req.userId as string);

            if (userId == undefined || userId == null || Number.isNaN(userId)) {
                throw new Error("User not found");
            }

            const data = await this.db.query(
                `SELECT password FROM admin WHERE id = ?`,
                [userId]
            );
            if (data.length === 0) {
                return res.status(300).json({ message: "User not found" });
            }

            const { old_password, new_password } = req.body;
            if (data[0].password !== old_password) {
                return res
                    .status(300)
                    .json({ message: "Old password is incorrect" });
            }

            const sql: string = `UPDATE admin SET password = ? WHERE id = ?`;
            await this.db.query(sql, [new_password, userId]);

            res.status(200).json({ message: "Password changed" });
        } catch (err) {
            res.status(500).json({ err });
        }
    };
}

export default AdminProfileController;
