import Database from "../database/database";
import { Request, Response } from "express";
import { AuthenticatedRequest } from '../interfaces/authenticatedRequest'

class RatingController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public postRating = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId: number = parseInt(req.userId as string);
            const movieId: number = parseInt(req.query.movieId as string);

            const rating: number = parseInt(req.body.rating as string);

            if (rating == undefined || null) {
                return res.status(400).json({ message: "Rating is required" });
            }

            const sql: string = `INSERT INTO user_rating (user_id, movie_id, value)
                                    VALUES (?, ?, ?)`;
            await this.db.query(sql, [userId, movieId, rating]);

            res.status(200).json({ message: "Rating posted" });
        } catch (err) {
            res.status(500).json({ err });
        }
    };
}

export default RatingController;
