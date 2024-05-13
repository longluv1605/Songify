import Database from "../../database/database";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../interfaces/authenticatedRequest";

class SearchController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public getSearchData = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = parseInt(req.userId as string);

            if (userId == undefined || userId == null || Number.isNaN(userId)) {
                throw new Error("User not found");
            }

            const str: string | undefined = req.query.string as string; // Explicitly cast to string
            const sql: string = `SELECT m.id, m.title, m.cover_img_url, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating
                                    FROM movie m
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    GROUP BY m.id
                                    HAVING LOWER(m.title) LIKE LOWER('%${str}%')
                                    ORDER BY average_rating DESC`;
            // console.log(str);
            const movies = await this.db.query(sql, [str]);

            const results: {
                movies: any;
                userId: number | null;
            } = {
                movies,
                userId: null,
            };

            if (userId !== undefined || null || userId !== "") {
                results.userId = userId;
            }

            res.status(200).json(results);
        } catch (err) {
            res.status(500).json({ err });
        }
    };
}

export default SearchController;
