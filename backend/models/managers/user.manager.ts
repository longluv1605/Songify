import e from "express";
import Database from "../../database/database";

class UserManager {
    // TODO: Implement the GET method
    public getUsers = async (input: { [key: string]: any }) => {
        try {
            // Get data from input
            const userId = input.userId;

            if (!userId) {
                let sql =
                    "SELECT id, username, first_name, last_name, email, status FROM user LIMIT 20";
                const users = await Database.query(sql);
                return users;
            }

            // Init sql
            let sql =
                "SELECT id, username, first_name, last_name, email FROM user WHERE id = ?";

            // Query
            const user = await Database.query(sql, [userId]);
            return user;
        } catch (err) {
            console.log("Error getting User by id:", err);
            throw {
                message: "Error getting User by id",
                error: err,
            };
        }
    };

    public addUser = async (input: { [key: string]: any }) => {
        try {
            // Get data from input
            const username = input.username;
            const password = input.password;
            const email = input.email;
            const firstName = input.firstName;
            const lastName = input.lastName;

            // Init sql
            const insertUserSql = `
                INSERT INTO user (username, password, email, first_name, last_name)
                VALUES (?, ?, ?, ?, ?);
            `;

            // Query
            await Database.query(insertUserSql, [
                username,
                password,
                email,
                firstName,
                lastName,
            ]);

            return { message: "Add User successfully" };
        } catch (err) {
            console.log("Error adding User:", err);
            throw {
                message: "Error adding User",
                error: err,
            };
        }
    };

    public updateUser = async (input: { [key: string]: any }) => {
        try {
            // Get data from input
            const userId = input.userId;

            const email = input.email;
            const firstName = input.firstName;
            const lastName = input.lastName;

            // Init sql
            const updateUserSql = `
                UPDATE user
                SET email = ?, first_name = ?, last_name = ?
                WHERE id = ?;
            `;

            // Query
            await Database.query(updateUserSql, [
                email,
                firstName,
                lastName,
                userId,
            ]);
            return { message: "Update User successfully" };
        } catch (err) {
            console.log("Error updating User:", err);
            throw {
                message: "Error updating User",
                error: err,
            };
        }
    };

    public changeStatus = async (input: { [key: string]: any }) => {
        try {
            // Get data from input
            const userId = input.userId;

            let status = await Database.query(
                "SELECT status FROM user WHERE id = ?",
                [userId]
            );
            if (status.length === 0) {
                throw new Error("User not found");
            }

            status = status[0].status === "accepted" ? "banned" : "accepted";

            // Init sql
            const changeStatusSql = `
                UPDATE user
                SET status = ?
                WHERE id = ?;
            `;

            // Query
            await Database.query(changeStatusSql, [status, userId]);
            return { message: "Change status successfully" };
        } catch (err) {
            console.log("Error changing status:", err);
            throw {
                message: "Error changing status",
                error: err,
            };
        }
    };

    public changePlan = async (input: { [key: string]: any }) => {
        try {
            const userId = input.userId;
            const planId = input.planId;

            await Database.query(
                "UPDATE user_plan SET plan_id = ? WHERE user_id = ?",
                [planId, userId]
            );

            return { message: "Change User plan successfully" };
        } catch (err) {
            console.log("Error changing User plan:", err);
            throw {
                message: "Error changing User plan",
                error: err,
            };
        }
    };

    public deleteUser = async (input: { [key: string]: any }) => {
        try {
            // Get data from input
            const userId = input.userId;

            // Init sql
            const deleteUserSql = `
                DELETE FROM user
                WHERE id = ?;
            `;

            // Query
            await Database.query(deleteUserSql, [userId]);
            return { message: "Delete User successfully" };
        } catch (err) {
            console.log("Error deleting User:", err);
            throw {
                message: "Error deleting User",
                error: err,
            };
        }
    };

    public changePassword = async (input: { [key: string]: any }) => {
        try {
            // Get data from input
            const userId = input.userId;
            const oldPassword = input.oldPassword;
            const newPassword = input.newPassword;

            // Check old password
            const checkOldPasswordSql = `
                SELECT * FROM user
                WHERE id = ? AND password = ?;
            `;
            const user = await Database.query(checkOldPasswordSql, [
                userId,
                oldPassword,
            ]);
            if (user.length === 0) {
                throw new Error("Old password is incorrect");
            }

            // Change password
            const changePasswordSql = `
                UPDATE user
                SET password = ?
                WHERE id = ?;
            `;

            // Query
            await Database.query(changePasswordSql, [newPassword, userId]);
            return { message: "Change password successfully" };
        } catch (err) {
            console.log("Error changing password:", err);
            throw {
                message: "Error changing password",
                error: err,
            };
        }
    };

    public addMovieToHistory = async (input: { [key: string]: any }) => {
        try {
            // Get data from input
            const userId = input.userId;
            const movieId = input.movieId;

            if (!userId || !movieId) {
                throw new Error("Missing userId or movieId");
            }

            await Database.query(
                "DELETE FROM user_history WHERE user_id = ? AND movie_id = ?",
                [userId, movieId]
            );

            // Init sql
            const insertHistorySql = `
                INSERT INTO user_history (user_id, movie_id)
                VALUES (?, ?);
            `;

            // Query
            await Database.query(insertHistorySql, [userId, movieId]);
            return { message: "Add movie to history successfully" };
        } catch (err) {
            console.log("Error adding movie to history:", err);
            throw {
                message: "Error adding movie to history",
                error: err,
            };
        }
    };

    public purchase = async (input: { [key: string]: any }) => {
        try {
            const userId = input.userId;
            const planId = input.planId;
            const paymentMethod = input.paymentMethod;

            // Init sql
            const purchasePlanSql = `INSERT INTO user_purchase (user_id, pricing_plan_id, purchase_method) VALUES (?, ?, ?);`;

            // Query
            await Database.query(purchasePlanSql, [
                userId,
                planId,
                paymentMethod,
            ]);

            return { message: "Buy plan successfully" };
        } catch (err) {
            console.log("Error buying plan:", err);
            throw {
                message: "Error buying plan",
                error: err,
            };
        }
    };
}
export default new UserManager();
