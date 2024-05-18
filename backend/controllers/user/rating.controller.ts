import Database from "../../database/database";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../interfaces/authenticatedRequest";

class RatingController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public postRating = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId: number = parseInt(req.userId as string);
            const movieId: number = parseInt(req.query.movieId as string);

            if (userId == undefined || userId == null || Number.isNaN(userId)) {
                throw new Error("User not found");
            }

            if (
                movieId == undefined ||
                movieId == null ||
                Number.isNaN(movieId)
            ) {
                throw new Error("User not found");
            }

            const rating: number = parseInt(req.body.rating as string);

            if (rating == undefined || null) {
                return res.status(400).json({ message: "Rating is required" });
            }
            
            await this.db.query("DELETE FROM user_rating WHERE user_id = ? AND movie_id = ?", [userId, movieId])

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
