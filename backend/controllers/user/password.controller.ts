import Database from "../../database/database";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../interfaces/authenticatedRequest";

class PasswordController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public changePassword = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {
        try {
            const userId: number = parseInt(req.userId as string);

            if (userId == undefined || userId == null || Number.isNaN(userId)) {
                throw new Error("User not found");
            }

            const oldPassword: string = req.body.oldPassword;
            const newPassword: string = req.body.newPassword;

            if (
                oldPassword == undefined ||
                null ||
                newPassword == undefined ||
                null
            ) {
                return res
                    .status(400)
                    .json({
                        message: "Old password and new password are required",
                    });
            }

            const user = await this.getUserData(userId);

            if (user[0].password !== oldPassword) {
                return res
                    .status(400)
                    .json({ message: "Old password is incorrect" });
            }

            const sql: string = `UPDATE user SET password = ? WHERE id = ?`;
            await this.db.query(sql, [newPassword, userId]);

            res.status(200).json({ message: "Password changed" });
        } catch (err) {
            res.status(500).json({ err });
        }
    };

    public getUserData = async (userId: number) => {
        try {
            const sql: string = `SELECT id, password FROM user WHERE id = ?`;
            const user = await this.db.query(sql, [userId]);

            return user;
        } catch (err) {
            throw err;
        }
    };
}

export default PasswordController;
