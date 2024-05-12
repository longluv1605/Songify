import Database from "../database/database";
import { Response } from "express";
import { AuthenticatedRequest } from "../interfaces/authenticatedRequest";

class HomeController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public getHomeData = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = parseInt(req.userId as string);
            if (userId == undefined || userId == null || Number.isNaN(userId)) {
                throw new Error("User not found");
            }
            const newMovies = await this.getNewMovies();
            const recentMovies = await this.getRecentMovies(userId, 10);
            const genres = await this.getGenres();

            res.status(200).json({
                newMovies: newMovies,
                recentMovies: recentMovies,
                genres: genres,
            });
        } catch (err) {
            // console.log("error", err);
            res.status(500).json({ err });
        }
    };

    private getNewMovies = async (): Promise<any> => {
        try {
            const sql: string = `SELECT m.id, m.title, m.cover_img_url, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating
                                    FROM movie m
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    GROUP BY m.id ORDER BY m.added_at desc limit 10`;
            const movies = await this.db.query(sql);

            return movies;
        } catch (err) {
            throw err;
        }
    };

    public getRecentMovies = async (
        userId: number,
        limit: number
    ): Promise<any> => {
        try {
            const sql: string = `SELECT m.id, m.title, m.cover_img_url, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating
                                    FROM movie m
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    GROUP BY m.id HAVING m.id IN (SELECT movie_id FROM user_history WHERE user_id = ? ORDER BY date DESC) LIMIT ?`;
            const movies = await this.db.query(sql, [userId, limit]);
            return { userId, movies };
        } catch (err) {
            // console.log("error", err);
        }
    };

    private getGenres = async (): Promise<any> => {
        try {
            const sql: string = `SELECT name FROM genre`;
            const genres = await this.db.query(sql);

            return genres;
        } catch (err) {
            // console.log("error", err);
        }
    };
}

export default HomeController;
