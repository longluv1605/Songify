import Database from "../../database/database";
import jwt from "jsonwebtoken";

class SessionManager {
    private static blackList: string[] = [];

    public verify = async (input: { [key: string]: any }) => {
        try {
            // Get data from input
            const username = input.username;
            const password = input.password;

            // console.log("username:", username);
            // console.log("password:", password);

            // Init sql
            const verifySql = `
                SELECT * FROM user
                WHERE (username = ? OR email = ?) AND password = ?;
            `;

            // Query
            const user = await Database.query(verifySql, [username, username, password]);

            // console.log("user:", user);

            if (user.length === 0) {
                throw {
                    message: "Username or password is incorrect",
                };
            }

            if (user[0].status === "banned") {
                throw {
                    message: "User is banned",
                };
            }

            return user[0];
        } catch (err) {
            console.log("Error verifying user:", err);
            throw {
                message: "Error verifying user",
                error: err,
            };
        }
    };

    public createSession = async (input: { [key: string]: any }) => {
        try {
            // Get data from input
            const username = input.username;
            const password = input.password;

            // console.log("username:", username);
            // console.log("password:", password);

            const user = await this.verify({ username, password });

            const userId = user.id; //TODO: xử lý lỗi
            const role = user.role; //TODO: xử lý lỗi

            //creat JWT
            const secret_key: string = process.env.SECRET_KEY || "";
            const token = jwt.sign({ userId, role }, secret_key, {
                expiresIn: "24h",
                algorithm: "HS256",
            }); // TODO: change expiresIn, add more payload to creat jwt (time, randomId)

            return { token, role };
        } catch (err) {
            console.log("Error creating session:", err);
            throw {
                message: "Error creating session",
                error: err,
            };
        }
    };

    public deleteSession = async (input: { [key: string]: any }) => {
        try {
            const token = input.token;

            this.addToBlacklist(token);

            return { message: "Delete session successfully" };
        } catch (err) {
            console.log("Error deleting session:", err);
            throw {
                message: "Error deleting session",
                error: err,
            };
        }
    };

    public isBlacklisted = (token: string): boolean => {
        return SessionManager.blackList.includes(token);
    }

    public addToBlacklist = (token: string) => {
        SessionManager.blackList.push(token);
    }
}

export default new SessionManager();
