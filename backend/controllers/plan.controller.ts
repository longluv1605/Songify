import Database from "../database/database";
import { Request, Response } from "express";
import { AuthenticatedRequest } from '../interfaces/authenticatedRequest'

class PlanController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public getPlansData = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const plans = await this.getPlans();
            const currPlan = await this.currentPlan(req);

            res.status(200).json({ plans, currPlan });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };

    private getPlans = async () => {
        try {
            const sql: string = "SELECT * FROM pricing_plan";
            const result = await this.db.query(sql);

            return result;
        } catch (err) {
            console.log(err);
        }
    };

    private currentPlan = async (req: AuthenticatedRequest) => {
        try {
            const userId = parseInt(req.userId as string);
            if (userId == undefined || userId == null || Number.isNaN(userId)) {
                return;
            }

            console.log("userId", userId);

            const sql: string = `SELECT * FROM user_plan WHERE user_id = ?`;

            const result = await this.db.query(sql, [userId]);

            return { userId, result };
        } catch (err) {
            console.log(err);
        }
    };
}

export default PlanController;
