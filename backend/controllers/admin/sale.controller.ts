import Database from "../../database/database";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../interfaces/authenticatedRequest";

class AdminSaleController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public getSaleData = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const role = req.role;
            if (role == null || undefined || role !== "admin") {
                throw new Error("Invalid role");
            }
            const userId = parseInt(req.userId as string);
            if (userId == undefined || userId == null || Number.isNaN(userId)) {
                throw new Error("User not found");
            }

            const sql: string = `SELECT * FROM sale LIMIT 100`;
            const data = await this.db.query(sql);

            res.status(200).json({ data });
        } catch (err) {
            res.status(500).json({ err });
        }
    };
}

export default AdminSaleController;
