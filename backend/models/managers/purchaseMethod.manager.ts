import Database from "../../database/database";
import { Manager } from "../../interfaces/interfaces";

class PurchaseMethodManager implements Manager {
    public getDatas = async (input: { [key: string]: any }) => {
        try {
            const sql = "SELECT name FROM purchase_method";
            const purchaseMethods = await Database.query(sql);
            return purchaseMethods;
        } catch (err) {
            console.log("Error getting Purchase methods:", err);
            throw err;
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
            const insertPurchaseMethodSql = `
                INSERT INTO purchase_method (name)
                VALUES (?);
            `;
            await Database.query(insertPurchaseMethodSql, [name]);
            return { message: "Add purchase method successfully" };
        } catch (err) {
            console.log("Error adding purchase method:", err);
            throw {
                message: "Error adding purchase method",
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

            const name = input.name;
            const description = input.description;

            const updatePurchaseMethodSql = `
                UPDATE purchase_method
                SET name = ?, description = ?
                WHERE name = ?;
            `;
            await Database.query(updatePurchaseMethodSql, [name, description]);
            return { message: "Update purchase method successfully" };
        } catch (err) {
            console.log("Error updating purchase method:", err);
            throw {
                message: "Error updating purchase method",
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

            const name = input.name;

            const deletePurchaseMethodSql = `
                DELETE FROM purchase_method
                WHERE name = ?;
            `;
            await Database.query(deletePurchaseMethodSql, [name]);
            return { message: "Delete purchase method successfully" };
        } catch (err) {
            console.log("Error deleting purchase method:", err);
            throw {
                message: "Error deleting purchase method",
                error: err,
            };
        }
    };
}

export default new PurchaseMethodManager();
