import Database from "../../database/database";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../interfaces/authenticatedRequest";

class AdminUserController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public getUserData = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const role = req.role;
            if (role == null || undefined || role !== "admin") {
                throw new Error("Invalid role");
            }
            const sql: string = `
                SELECT u.id, u.username, u.status, (SELECT name FROM pricing_plan WHERE id = (SELECT plan_id FROM user_plan WHERE user_id = u.id)) AS plan_name, c.comment_count, r.rating_count
                FROM user u
                LEFT JOIN (SELECT user_id, COUNT(*) AS comment_count FROM comment GROUP BY user_id) c ON u.id = c.user_id
                LEFT JOIN (SELECT user_id, COUNT(*) AS rating_count FROM user_rating GROUP BY user_id) r ON u.id = r.user_id LIMIT 100
            `;
            // console.log(sql);

            const users = await this.db.query(sql);

            for (let user of users) {
                user.comment_count =
                    parseInt(user.comment_count as string) || 0;
                user.rating_count = parseInt(user.rating_count as string) || 0;
            }

            // console.log(users);

            res.status(200).json({ users });
        } catch (err) {
            res.status(500).json({ err });
        }
    };

    public changeUserStatus = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {
        try {
            const role = req.role;
            if (role == null || undefined || role !== "admin") {
                throw new Error("Invalid role");
            }
            const userId = parseInt(req.query.userId as string);
            if (userId == undefined || userId == null || Number.isNaN(userId)) {
                throw new Error("User not found");
            }

            const data = await this.db.query(
                `SELECT status FROM user WHERE id = ?`,
                [userId]
            );

            if (data.length === 0) {
                res.status(300).json({ message: "User not found" });
            } else {
                let status =
                    data[0].status === "accepted" ? "banned" : "accepted";
                await this.db.query(`UPDATE user SET status = ? WHERE id = ?`, [
                    status,
                    userId,
                ]);
                res.status(200).json({ message: "User status updated" });
            }
        } catch (err) {
            res.status(500).json({ err });
        }
    };

    public deleteUser = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const role = req.role;
            if (role == null || undefined || role !== "admin") {
                throw new Error("Invalid role");
            }
            const userId = parseInt(req.query.userId as string);
            if (userId == undefined || userId == null || Number.isNaN(userId)) {
                throw new Error("User not found");
            }

            let sql = `DELETE FROM user WHERE id = ?`;
            await this.db.query(sql, [userId]);

            res.status(200).json({ message: "User deleted successfully" });
        } catch (err) {}
    };
}

export default AdminUserController;
