import Database from "../database/database";
import { Request, Response } from "express";

class MovieController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public getMovieData = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.query.userId as string);
            const movie = await this.getMovie(req);

            const results: {
                movie: any;
                userId: number | null;
            } = {
                movie,
                userId: null,
            };

            if (userId !== undefined || null || userId !== "") {
                results.userId = userId;
            }

            return res.status(200).json(results);
        } catch (err) {
            return res.status(500).json({ err });
        }
    };

    private getMovie = async (req: Request) => {
        try {
            const movieId: number = parseInt(req.query.movieId as string);

            const sql: string = `SELECT m.*, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating
                                    FROM movie m
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    GROUP BY m.id HAVING id = ?`;
            const data = await this.db.query(sql, [movieId]);

            return data;
        } catch (err) {
            console.log(err);
        }
    };

    public postHistory = async (req: Request, res: Response) => {
        try {
            const userId: number = parseInt(req.query.userId as string);
            const movieId: number = parseInt(req.query.movieId as string);

            const sql: string = `INSERT INTO user_history (user_id, movie_id)
                                    VALUES (?, ?)`;
                                    
            await this.db.query(sql, [userId, movieId]);

            res.status(200).json({ message: "History posted" });
        } catch (err) {
            res.status(500).json({ err });
        }
    }
}

export default MovieController;
