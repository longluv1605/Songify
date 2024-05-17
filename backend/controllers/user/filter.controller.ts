import Database from "../../database/database";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../interfaces/authenticatedRequest";

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

            const genre = req.query.genre as string;
            const label = req.query.label as string;
            let movies;
            if (
                (genre !== undefined || null) &&
                genre != "" &&
                (label !== undefined || null) &&
                label != ""
            ) {
                const sql: string = `SELECT m.id, m.title, m.cover_img_url, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating, ml.label_name as label
                                    FROM movie m
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    LEFT JOIN movie_label ml ON m.id = ml.movie_id
                                    GROUP BY m.id HAVING genres LIKE '%${genre}%' AND label = '${label}' ORDER BY average_rating DESC LIMIT 20`;
                // console.log(sql);
                movies = await this.db.query(sql);
                // console.log(movies);
            } else if ((genre !== undefined || null) && genre != "") {
                const sql: string = `SELECT m.id, m.title, m.cover_img_url, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating, ml.label_name as label
                                    FROM movie m
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    LEFT JOIN movie_label ml ON m.id = ml.movie_id
                                    GROUP BY m.id HAVING genres LIKE '%${genre}%' ORDER BY average_rating DESC LIMIT 20`;
                movies = await this.db.query(sql);
            } else if ((label !== undefined || null) && label != "") {
                const sql: string = `SELECT m.id, m.title, m.cover_img_url, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating, ml.label_name as label
                                    FROM movie m
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    LEFT JOIN movie_label ml ON m.id = ml.movie_id
                                    GROUP BY m.id HAVING label = ? ORDER BY average_rating DESC LIMIT 20`;
                movies = await this.db.query(sql, [label]);
            } else {
                throw new Error("Invalid query");
            }

            const genres = await this.getGenres();
            const labels = await this.getLabels();

            res.status(200).json({ movies, genres, labels });
        } catch (err) {
            res.status(500).json({ err });
        }
    };

    private getGenres = async (): Promise<any> => {
        try {
            const sql: string = `SELECT name FROM genre`;
            const genres = await this.db.query(sql);

            return genres;
        } catch (err) {
            throw err;
        }
    };

    private getLabels = async (): Promise<any> => {
        try {
            const sql: string = `SELECT name FROM label`;
            const labels = await this.db.query(sql);

            return labels;
        } catch (err) {
            throw err;
        }
    };
}

export default FilterController;