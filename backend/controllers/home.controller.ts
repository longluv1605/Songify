import Database from "../database/database";
import { Request, Response } from "express";

class HomeController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public getHomeData = async (req: Request, res: Response) => {
        try {
            // console.log("getHomeData");
            const newMovies = await this.getNewMovies();
            const recentMovies = await this.getRecentMovies(req);
            const genres = await this.getGenres();

            // console.log(newMovies);
            // console.log(recentMovies);
            // console.log(genres);

            res.status(200).json({
                newMovies: newMovies,
                recentMovies: recentMovies,
                genres: genres,
            });
        } catch (err) {
            console.log("error", err);
            res.status(500).json({err});
        }
    }

    private getNewMovies = async (): Promise<any> => {
        try {
            // console.log("getNewMovies");
            const sql:string = `SELECT m.id, m.title, m.cover_img_url, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating
                                    FROM movie m
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    GROUP BY m.id ORDER BY m.added_at desc limit 10`;
            // console.log(sql);
            const movies = await this.db.query(sql);
            // const movies = [1,2,3,4];
            console.log("===================================================================\n", movies);
            // console.log(movies);
            return movies;
        } catch (err) {
            // console.log("error", err);
        }
    }

    private getRecentMovies = async (req: Request): Promise<any> => {
        try {
            const userId = req.query.userId;
            console.log("userid: ",userId);
            if (userId == undefined || null) {
                return
            }
            const checker = this.db.query('SELECT * FROM user WHERE id = ?', [userId])

            const sql: string = `SELECT m.id, m.title, m.cover_img_url, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating
                                    FROM movie m
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    GROUP BY m.id HAVING m.id IN (SELECT movie_id FROM user_history WHERE user_id = ? ORDER BY date DESC) LIMIT 10`;
            const movies = await this.db.query(sql, [userId]);
            return movies;
        } catch (err) {
            // console.log("error", err);
        }
    }

    private getGenres = async (): Promise<any> => {
        try {
            const sql: string = `SELECT name FROM genre`;
            const genres = await this.db.query(sql);

            return genres;
        } catch (err) {
            // console.log("error", err);
        }
    }
}

export default HomeController;
