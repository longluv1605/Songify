import Database from "../database/database";
import { Request, Response } from "express";

class FilterController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public getFilteredMovies = async (req: Request, res: Response): Promise<void> => {
        try {
            const genre = req.query.genre;
            const sql: string = `SELECT m.id, m.title, m.cover_img_url, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating
                                    FROM movie m
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    GROUP BY m.id HAVING genres LIKE '%${genre}%' ORDER BY average_rating DESC`;
            const movies = await this.db.query(sql, [genre]);


            res.status(200).json(movies);
        } catch (err) {
            console.log("error", err);
        }
    }
}

export default FilterController;
