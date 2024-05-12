import Database from "../database/database";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../interfaces/authenticatedRequest";

class FilterController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public getFilteredMovies = async (
        req: AuthenticatedRequest,
        res: Response
    ): Promise<void> => {
        try {
            const userId = parseInt(req.userId as string);

            if (userId == undefined || userId == null || Number.isNaN(userId)) {
                throw new Error("User not found");
            }

            const genre = req.query.genre;
            const label = req.query.label;
            let movies;
            if (genre !== undefined || null) {
                const sql: string = `SELECT m.id, m.title, m.cover_img_url, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating
                                    FROM movie m
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    GROUP BY m.id HAVING genres ILIKE '%${genre}%' ORDER BY average_rating DESC`;
                movies = await this.db.query(sql, [genre]);
            } else if (label !== undefined || null) {
                const sql: string = `SELECT m.id, m.title, m.cover_img_url, GROUP_CONCAT(DISTINCT ml.label_name ORDER BY ml.label_name SEPARATOR ', ') AS labels, ROUND(AVG(r.value), 1) AS average_rating
                                    FROM movie m
                                    LEFT JOIN movie_label ml ON m.id = ml.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    GROUP BY m.id HAVING labels ILIKE '%${label}%' ORDER BY average_rating DESC`;
                movies = await this.db.query(sql, [label]);
            }

            res.status(200).json(movies);
        } catch (err) {
            res.status(500).json({ err });
        }
    };
}

export default FilterController;
