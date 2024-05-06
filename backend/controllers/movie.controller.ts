import Database from "../database/database";
import { Request, Response } from "express";

class MovieController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public getMovieData = async (req: Request, res: Response) => {
        try {
            const movie = await this.getMovie(req);
            const comments = await this.getComments(req);

            return res.status(200).json({ movie, comments });
        } catch (err) {
            return res.status(500).json({ err });
        }
    }

    private getMovie = async (req: Request) => {
        try {
            const movieId: number = parseInt(req.query.id as string);
            console.log(movieId);
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


    private getComments = async (req: Request) => {
        try {
            const movieId: number = parseInt(req.query.id as string);
            const sql: string = `SELECT cmt.date, cmt.detail, u.first_name, u.last_name
                                    FROM comment cmt
                                    LEFT JOIN user u ON cmt.user_id = u.id
                                    WHERE cmt.movie_id = ?
                                    ORDER BY cmt.date DESC`;
            const data = await this.db.query(sql, [movieId]);


            return data;
        } catch (err) {
            console.log(err);
        }
    };



}

export default MovieController;
