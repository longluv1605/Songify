import Database from "../../database/database";
import { Manager } from "../../interfaces/interfaces";

class SaleManager implements Manager {
    public getDatas = async (input: { [key: string]: any }) => {
        try {
            const userId = input.userId;
            if (userId) {
                const sql = "SELECT * FROM sale WHERE username = (SELECT username FROM user WHERE id = ?)";
                const sales = await Database.query(sql, [userId]);
                return sales;
            }

            const userRole = input.userRole;

            if (!userRole || userRole !== "admin") {
                throw {
                    message: "You are not authorized to get all genre",
                };
            }

            const sql = "SELECT * FROM sale ORDER BY purchase_date, id DESC LIMIT 10";
            const sales = await Database.query(sql);
            return sales;
        } catch (err) {
            console.log("Error getting sales:", err);
            throw err;
        }
    };

    public addData = async (input: { [key: string]: any }) => {
        try {
            const userId = input.userId;
            const planId = input.planId;
            const purchaseMethod = input.purchaseMethod;

            const insertSaleSql = `
                INSERT INTO user_purchase (user_id, pricing_plan_id, purchase_method)
                VALUES (?, ?, ?);
            `;

            await Database.query(insertSaleSql, [
                userId,
                planId,
                purchaseMethod,
            ]);
            return { message: "Add sale successfully" };
        } catch (err) {
            console.log("Error adding sale:", err);
            throw {
                message: "Error adding sale",
                error: err,
            };
        }
    };
}

export default new SaleManager();
