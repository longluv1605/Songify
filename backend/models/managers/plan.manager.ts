import Database from "../../database/database";

class PlanManager {
    // TODO: Implement the GET method
    public getPlans = async (input: {[key: string]: any}) => {
        try {
            const id = input.id;
            if (id !== "all") {
                const sql = "SELECT * FROM pricing_plan WHERE id = ?";
                const plans = await Database.query(sql, [id]);
                return plans;
            }
            const sql = "SELECT * FROM pricing_plan";
            const plans = await Database.query(sql);
            return plans;
        } catch (err) {
            console.log("Error getting plans:", err);
            throw err;
        }
    };

    public getUserPlan = async (input: {[key: string]: any}) => {
        try {
            const userId = input.userId;

            const sql = "SELECT * FROM pricing_plan WHERE id = (SELECT plan_id FROM user_plan WHERE user_id = ?)";
            const plans = await Database.query(sql, [userId]);

            return plans;
        } catch (err) {
            console.log("Error getting user plan:", err);
            throw err;
        }
    };

    public addPlan = async (input: { [key: string]: any }) => {
        try {
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
            console.log("Error adding plan:", err);
            throw {
                message: "Error adding plan",
                error: err,
            };
        }
    };

    public updatePlan = async (input: { [key: string]: any }) => {
        try {
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
            console.log("Error updating plan:", err);
            throw {
                message: "Error updating plan",
                error: err,
            };
        }
    };

    public deletePlan = async (id: number) => {
        try {
            const deletePlanSql = `DELETE FROM pricing_plan WHERE id = ?`;
            await Database.query(deletePlanSql, [id]);
            return { message: "Delete plan successfully" };
        } catch (err) {
            console.log("Error deleting plan:", err);
            throw {
                message: "Error deleting plan",
                error: err,
            };
        }
    };
}

export default new PlanManager();
