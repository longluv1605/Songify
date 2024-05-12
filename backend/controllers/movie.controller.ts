import Database from "../database/database";
import { Request, Response } from "express";
import { AuthenticatedRequest } from '../interfaces/authenticatedRequest'

class MovieController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public getMovieData = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = parseInt(req.userId as string);
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

    private getMovie = async (req: AuthenticatedRequest) => {
        try {
            const movieId: number = parseInt(req.query.movieId as string);

            const sql: string = `SELECT m.*, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating, (SELECT view FROM movie_view WHERE movie_id = m.id) AS views, (SELECT label_name FROM movie_label WHERE movie_id = m.id) AS label
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

    public postHistory = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = parseInt(req.userId as string);
            const movieId: number = parseInt(req.query.movieId as string);

            const sql: string = `INSERT INTO user_history (user_id, movie_id)
                                    VALUES (?, ?)`;
                                    
            await this.db.query(sql, [userId, movieId]);

            res.status(200).json({ message: "History posted" });
        } catch (err) {
            res.status(500).json({ err });
        }
    }

    public updateView = async (req: Request, res: Response) => {
        try {
            const movieId: number = parseInt(req.query.movieId as string);

            const sql: string = `UPDATE movie_view
                                    SET view = view + 1
                                    WHERE movie_id = ?`;

            await this.db.query(sql, [movieId]);
            res.status(200).json({ message: "View updated" });
        } catch (err) {
            console.log(err);
        }
    }
}

export default MovieController;
