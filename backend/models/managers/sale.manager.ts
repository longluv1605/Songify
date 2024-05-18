import Database from "../../database/database";

class SaleManager {
    public getSales = async (input: { [key: string]: any }) => {
        try {
            const sql = "SELECT * FROM sale ORDER BY purchase_date, id DESC LIMIT 10";
            const sales = await Database.query(sql);
            return sales;
        } catch (err) {
            console.log("Error getting sales:", err);
            throw err;
        }
    };

    public addSale = async (input: { [key: string]: any }) => {
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

    public updateSale = async (input: { [key: string]: any }) => {};

    public deleteSale = async (input: { [key: string]: any }) => {};
}

export default new SaleManager();
