import Database from "../database/database";
import { Request, Response } from "express";
import { AuthenticatedRequest } from '../interfaces/authenticatedRequest'

class ProfileController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public getProfileData = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = parseInt(req.userId as string);

            if (userId == undefined || userId == null || Number.isNaN(userId)) {
                throw new Error("User not found");
            }

            const user = await this.getUserData(userId);
            const numberOfComments = await this.getNumberofComments(userId);
            const numberOfRatings = await this.getNumberofRatings(userId);
            const recentMovies = await this.getRecentMovies(userId);
            const plan = await this.getCurrPlan(userId);
            const recentRatings = await this.getRecentRatings(userId);

            const profile = {
                user,
                numberOfComments,
                numberOfRatings,
                recentMovies,
                plan,
                recentRatings,
            };

            res.status(200).json({ profile });
        } catch (err) {
            // console.log(err);
            res.status(500).json({ err });
        }
    };

    public getUserData = async (userId: number) => {
        try {
            const sql: string = `SELECT id, first_name, last_name, email FROM user WHERE id = ?`;
            const user = await this.db.query(sql, [userId]);

            return user;
        } catch (err) {
            console.log(err);
        }
    };

    public getNumberofComments = async (userId: number) => {
        try {
            const sql: string = `SELECT COUNT(*) as count FROM comment WHERE user_id = ?`;

            const comments = await this.db.query(sql, [userId]);

            // console.log(comments);

            return parseInt(comments[0].count);
        } catch (err) {
            console.log(err);
        }
    };

    public getNumberofRatings = async (userId: number) => {
        try {
            const sql: string = `SELECT COUNT(*) as count FROM user_rating WHERE user_id = ?`;

            const ratings = await this.db.query(sql, [userId]);

            // console.log(ratings);

            return parseInt(ratings[0].count);
        } catch (err) {
            console.log(err);
        }
    };

    public getRecentMovies = async (userId: number) => {
        try {
            const sql: string = `SELECT m.id, m.title, m.cover_img_url, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating
                                    FROM movie m
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    GROUP BY m.id HAVING m.id IN (SELECT movie_id FROM user_history WHERE user_id = ? ORDER BY date DESC)`;
            const movies = await this.db.query(sql, [userId]);
            return { userId, movies };
        } catch (err) {
            console.log(err);
        }
    };

    public getCurrPlan = async (userId: number) => {
        try {
            const sql: string = `SELECT * FROM user_plan WHERE user_id = ?`;
            const plan = await this.db.query(sql, [userId]);

            return plan;
        } catch (err) {
            console.log(err);
        }
    };

    public getRecentRatings = async (userId: number) => {
        try {
            const sql: string = `SELECT m.id, m.title, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating, (SELECT VALUE FROM user_rating WHERE user_id = 1 AND movie_id = m.id) AS user_rating
            FROM movie m
            LEFT JOIN movie_genre mg ON m.id = mg.movie_id
            LEFT JOIN user_rating r ON m.id = r.movie_id
            GROUP BY m.id HAVING m.id IN (SELECT movie_id FROM user_rating WHERE user_id = ? ORDER BY time DESC) LIMIT 50`;

            const ratings = await this.db.query(sql, [userId]);

            return ratings;
        } catch (err) {
            console.log(err);
        }
    };

    public changeUserInfo = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = parseInt(req.userId as string);
            if (userId == undefined || userId == null || Number.isNaN(userId)) {
                throw new Error("User not found");
            }

            const oldInfo = await this.db.query(`SELECT * FROM user WHERE id = ?`, [userId]);

            const firstName = req.body.firstName || oldInfo[0].first_name;
            const lastName = req.body.lastName || oldInfo[0].last_name;
            const email = req.body.email || oldInfo[0].email;
            
            const sql: string = `UPDATE user SET first_name = ?, last_name = ?, email = ? WHERE id = ?`;

            await this.db.query(sql, [firstName, lastName, email, userId]);

            res.status(200).json({ message: "User info updated" });
        } catch (err) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    } 
}

export default ProfileController;
