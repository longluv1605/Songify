import Database from "../../database/database";
import { Manager } from "../../interfaces/interfaces";

class UserManager implements Manager {
    // TODO: Implement the GET method
    public getDatas = async (input: { [key: string]: any }) => {
        try {
            const userRole = input.userRole;

            // Get data from input
            const userId = input.userId;

            // console.log("userId", userId);
            // console.log("userRole", userRole);

            if (!userId && userRole === "admin") {
                const sql: string = `
                SELECT u.id, u.username, u.status, u.email, u.created_at, 
                (SELECT name FROM pricing_plan WHERE id = (SELECT plan_id FROM user_plan WHERE user_id = u.id)) AS plan_name, 
                c.comment_count, r.rating_count
                FROM user u
                LEFT JOIN (SELECT user_id, COUNT(*) AS comment_count FROM comment GROUP BY user_id) c ON u.id = c.user_id
                LEFT JOIN (SELECT user_id, COUNT(*) AS rating_count FROM user_rating GROUP BY user_id) r ON u.id = r.user_id LIMIT 30
            `;
                const users = await Database.query(sql);
                return users;
            }

            // Init sql
            let sql: string;
            // if (userRole === "admin") {
            //     sql = "SELECT * FROM user WHERE id = ?";
            //     const user = await Database.query(sql, [userId]);
            //     return user;
            // }
            sql = "SELECT id, username, first_name, last_name, email, created_at FROM user WHERE id = ?";
            // console.log("sql", sql);
            // Query
            const user = await Database.query(sql, [userId]);

            // console.log("user", user);
            return user;
        } catch (err) {
            console.log("Error getting User by id:", err);
            throw {
                message: "Error getting User by id",
                error: err,
            };
        }
    };

    public addData = async (input: { [key: string]: any }) => {
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

    public updateData = async (input: { [key: string]: any }) => {
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

    public deleteData = async (input: { [key: string]: any }) => {
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

    public changePlan = async (input: { [key: string]: any }) => {
        try {
            const userRole = input.userRole;

            if (!userRole || userRole !== "admin") {
                throw {
                    message: "You are not authorized to change other user's plan",
                };
            }

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

    public changeStatus = async (input: { [key: string]: any }) => {
        try {
            
            const userRole = input.userRole;

            if (!userRole || userRole !== "admin") {
                throw {
                    message: "You are not authorized to change other user's status",};
            }

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

    // TODO: Implement the DELETE method for user history, user_favorite, user_watchlist
    public deleteMovieFromHistory = async (input: { [key: string]: any }) => {
        try {
            // Get data from input
            const userId = input.userId;
            const movieId = input.movieId;

            // Init sql
            const deleteHistorySql = `
                DELETE FROM user_history
                WHERE user_id = ? AND movie_id = ?;
            `;

            // Query
            await Database.query(deleteHistorySql, [userId, movieId]);
            return { message: "Delete movie from history successfully" };
        } catch (err) {
            console.log("Error deleting movie from history:", err);
            throw {
                message: "Error deleting movie from history",
                error: err,
            };
        }
    }

    public addMovieToFavorite = async (input: { [key: string]: any }) => {
        try {
            // Get data from input
            const userId = input.userId;
            const movieId = input.movieId;

            if (!userId || !movieId) {
                throw new Error("Missing userId or movieId");
            }

            await Database.query(
                "DELETE FROM user_favorite WHERE user_id = ? AND movie_id = ?",
                [userId, movieId]
            );

            // Init sql
            const insertFavoriteSql = `
                INSERT INTO user_favorite (user_id, movie_id)
                VALUES (?, ?);
            `;

            // Query
            await Database.query(insertFavoriteSql, [userId, movieId]);
            return { message: "Add movie to favorite successfully" };
        } catch (err) {
            console.log("Error adding movie to favorite:", err);
            throw {
                message: "Error adding movie to favorite",
                error: err,
            };
        }
    };

    public deleteMovieFromFavorite = async (input: { [key: string]: any }) => {
        try {
            // Get data from input
            const userId = input.userId;
            const movieId = input.movieId;

            // Init sql
            const deleteFavoriteSql = `
                DELETE FROM user_favorite
                WHERE user_id = ? AND movie_id = ?;
            `;

            // Query
            await Database.query(deleteFavoriteSql, [userId, movieId]);
            return { message: "Delete movie from favorite successfully" };
        } catch (err) {
            console.log("Error deleting movie from favorite:", err);
            throw {
                message: "Error deleting movie from favorite",
                error: err,
            };
        }
    };

    public addMovieToWatchlist = async (input: { [key: string]: any }) => {
        try {
            // Get data from input
            const userId = input.userId;
            const movieId = input.movieId;

            if (!userId || !movieId) {
                throw new Error("Missing userId or movieId");
            }

            await Database.query(
                "DELETE FROM user_watchlist WHERE user_id = ? AND movie_id = ?",
                [userId, movieId]
            );

            // Init sql
            const insertWatchlistSql = `
                INSERT INTO user_watchlist (user_id, movie_id)
                VALUES (?, ?);
            `;

            // Query
            await Database.query(insertWatchlistSql, [userId, movieId]);
            return { message: "Add movie to watchlist successfully" };
        } catch (err) {
            console.log("Error adding movie to watchlist:", err);
            throw {
                message: "Error adding movie to watchlist",
                error: err,
            };
        }
    };

    public deleteMovieFromWatchlist = async (input: { [key: string]: any }) => {
        try {
            // Get data from input
            const userId = input.userId;
            const movieId = input.movieId;

            // Init sql
            const deleteWatchlistSql = `
                DELETE FROM user_watchlist
                WHERE user_id = ? AND movie_id = ?;
            `;

            // Query
            await Database.query(deleteWatchlistSql, [userId, movieId]);
            return { message: "Delete movie from watchlist successfully" };
        } catch (err) {
            console.log("Error deleting movie from watchlist:", err);
            throw {
                message: "Error deleting movie from watchlist",
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
