import Database from "../../database/database";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../interfaces/authenticatedRequest";

class CommentController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public getComments = async (req: Request, res: Response) => {
        try {
            const movieId: number = parseInt(req.query.movieId as string);

            if (movieId == undefined || null) {
                throw new Error("Movie not found");
            }

            const sql: string = `SELECT cmt.date, cmt.detail, u.first_name, u.last_name
                                    FROM comment cmt
                                    LEFT JOIN user u ON cmt.user_id = u.id
                                    WHERE cmt.movie_id = ?
                                    ORDER BY cmt.date DESC limit 10`;
            const comments = await this.db.query(sql, [movieId]);

            res.status(200).json({ comments });
        } catch (err) {
            res.status(500).json({ err });
        }
    };

    public postComment = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId: number = parseInt(req.userId as string);
            const movieId: number = parseInt(req.query.movieId as string);
            const comment: string = req.body.cmtText;

            if (comment == undefined || null || comment == "") {
                return res.status(400).json({ message: "Comment is required" });
            }

            const sql: string = `INSERT INTO comment (user_id, movie_id, detail)
                                    VALUES (?, ?, ?)`;
            await this.db.query(sql, [userId, movieId, comment]);

            res.status(200).json({ message: "Comment posted" });
        } catch (err) {
            res.status(500).json({ err });
        }
    };
}

export default CommentController;
