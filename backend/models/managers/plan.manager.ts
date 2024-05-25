import Database from "../../database/database";
import { Manager } from "../../interfaces/interfaces";

class PlanManager implements Manager {
    // TODO: Implement the GET method
    public getDatas = async (input: {[key: string]: any}) => {
        try {
            // Get by plan id
            const planId = input.planId;
            if (planId) {
                const sql = "SELECT * FROM pricing_plan WHERE id = ?";
                const plans = await Database.query(sql, [planId]);
                return plans;
            }

            // Get by user id
            const userId = input.userId;
            if (userId) {
                const sql = `
                    SELECT *, (SELECT exp_date FROM user_plan WHERE user_id = ?) as exp_date
                    FROM pricing_plan
                    WHERE id = (SELECT plan_id FROM user_plan WHERE user_id = ?)
                `;
                const plans = await Database.query(sql, [userId, userId]);
                return plans;
            }

            // Get all plans
            const sql = "SELECT * FROM pricing_plan";
            const plans = await Database.query(sql);
            return plans;
        } catch (err) {
            // console.log("Error getting plans:", err);
            throw {
                message: "Error getting plans",
                error: err,
            };
        }
    };

    public addData = async (input: { [key: string]: any }) => {
        try {
            const userRole = input.userRole;

            if (!userRole || userRole !== "admin") {
                throw {
                    message: "You are not authorized to add genre",
                };
            }

            const name = input.name;
            const price = input.price;
            const duration = input.duration;
            const maxQuality = input.maxQuality;
            const description = input.description;

            const insertPlanSql = `
                INSERT INTO pricing_plan (name, price, duration, film_quality, description)
                VALUES (?, ?, ?, ?, ?);
            `;
            await Database.query(insertPlanSql, [
                name,
                price,
                duration,
                maxQuality,
                description,
            ]);
            return { message: "Add plan successfully" };
        } catch (err) {
            // console.log("Error adding plan:", err);
            throw {
                message: "Error adding plan",
                error: err,
            };
        }
    };

    public updateData = async (input: { [key: string]: any }) => {
        try {
            const userRole = input.userRole;

            if (!userRole || userRole !== "admin") {
                throw {
                    message: "You are not authorized to add genre",
                };
            }

            const id = input.id;
            const planName = input.planName;
            const price = input.price;
            const duration = input.duration;
            const maxQuality = input.maxQuality;
            const description = input.description;

            const updatePlanSql = `
                UPDATE pricing_plan
                SET name = ?, price = ?, duration = ?, film_quality = ?, description = ?
                WHERE id = ?;
            `;
            await Database.query(updatePlanSql, [
                planName,
                price,
                duration,
                maxQuality,
                description,
                id,
            ]);
            return { message: "Update plan successfully" };
        } catch (err) {
            // console.log("Error updating plan:", err);
            throw {
                message: "Error updating plan",
                error: err,
            };
        }
    };

    public deleteData = async (input: { [key: string]: any }) => {
        try {
            const userRole = input.userRole;

            if (!userRole || userRole !== "admin") {
                throw {
                    message: "You are not authorized to add genre",
                };
            }

            const planId = input.planId;
            const deletePlanSql = `DELETE FROM pricing_plan WHERE id = ?`;
            await Database.query(deletePlanSql, [planId]);
            return { message: "Delete plan successfully" };
        } catch (err) {
            // console.log("Error deleting plan:", err);
            throw {
                message: "Error deleting plan",
                error: err,
            };
        }
    };
}

export default new PlanManager();
