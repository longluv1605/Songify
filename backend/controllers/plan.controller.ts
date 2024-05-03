import Database from "../database/database";
import { Request, Response } from "express";

class PlanController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public getPlansData = async (req: Request, res: Response) => {
        try {
            const plans = await this.getPlans(req, res);
            const currPlan = await this.currentPlan(req, res);

            res.status(200).json({ plans, currPlan });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    private getPlans = async (req: Request, res: Response) => {
        try {
            const sql: string = "SELECT * FROM plans";
            // const result = await this.db.query(sql);

            const result = [
                {
                    id: 1,
                    name: "Starter",
                    price: 0.0,
                    duration: 30,
                    film_quality: "720p",
                    description:
                        "- Limited Availability\n- Desktop Only\n- Limited Support",
                },
                {
                    id: 2,
                    name: "Premium",
                    price: 19.99,
                    duration: 90,
                    film_quality: "1080p",
                    description:
                        "- Lifetime Availability\n- TV & Desktop\n- 24/7 Support",
                },
                {
                    id: 3,
                    name: "Ultimate",
                    price: 29.99,
                    duration: 90,
                    film_quality: "2K",
                    description:
                        "- Lifetime Availability\n- Any Device\n- 24/7 Support",
                },
                {
                    id: 4,
                    name: "Cinematic",
                    price: 39.99,
                    duration: 180,
                    film_quality: "4K",
                    description:
                        "- Lifetime Availability\n- Any Device\n- 24/7 Support",
                },
            ];

            return result;
        } catch (err) {
            console.log(err);
        }
    };

    private currentPlan = (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const sql: string = `SELECT * FROM user_plan WHERE user_id = ?`;

            // const result = await this.db.query(sql, [userId]);

            const result = [
                {
                    user_id: 3,
                    plan_id: 4,
                    start_date: "2024-03-09",
                    exp_date: "2024-09-05",
                },
            ];

            return result;
        } catch (err) {
            console.log(err);
        }
    };
}

export default PlanController;
