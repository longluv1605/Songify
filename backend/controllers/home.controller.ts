import Database from "../database/database";
import { Request, Response } from "express";

class HomeController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public async getHomeData(req: Request, res: Response) {
        try {
            // const newMovies = await this.getNewMovies(req, res);
            // const recentMovies = await this.getRecentMovies(req, res);
            // const genres = await this.getGenres(req, res);
            const newMovies = [
                {
                    id: 1,
                    title: "Toy Story",
                    cover_img_url: null,
                    genres: "Adventure, Animation, Comedy, Family",
                    average_rating: 3.8,
                },
                {
                    id: 2,
                    title: "Jumanji",
                    cover_img_url: null,
                    genres: "Adventure, Family, Fantasy",
                    average_rating: 3.2,
                },
                {
                    id: 3,
                    title: "Grumpier Old Men",
                    cover_img_url: null,
                    genres: "Comedy, Romance",
                    average_rating: 3.1,
                },
                {
                    id: 4,
                    title: "Waiting to Exhale",
                    cover_img_url: null,
                    genres: "Comedy, Drama, Romance",
                    average_rating: 3.0,
                },
                {
                    id: 5,
                    title: "Father of the Bride Part II",
                    cover_img_url: null,
                    genres: "Comedy, Family",
                    average_rating: 3.1,
                },
                {
                    id: 6,
                    title: "Heat",
                    cover_img_url: null,
                    genres: "Action, Crime, Drama",
                    average_rating: 3.8,
                },
                {
                    id: 7,
                    title: "Sabrina",
                    cover_img_url: null,
                    genres: "Comedy, Romance",
                    average_rating: 3.3,
                },
                {
                    id: 8,
                    title: "Tom and Huck",
                    cover_img_url: null,
                    genres: "Action, Adventure, Drama, Family",
                    average_rating: 3.2,
                },
                {
                    id: 9,
                    title: "Sudden Death",
                    cover_img_url: null,
                    genres: "Action, Drama",
                    average_rating: 3.0,
                },
                {
                    id: 10,
                    title: "GoldenEye",
                    cover_img_url: null,
                    genres: "Action, Adventure, Thriller",
                    average_rating: 3.4,
                },
            ];

            const recentMovies = [
                {
                    id: 1026,
                    title: "So Dear to My Heart",
                    cover_img_url: null,
                    genres: "Animation, Drama, Family",
                    average_rating: 3.3,
                },
                {
                    id: 1060,
                    title: "Swingers",
                    cover_img_url: null,
                    genres: "Comedy",
                    average_rating: 3.8,
                },
                {
                    id: 1662,
                    title: "Gang Related",
                    cover_img_url: null,
                    genres: "Action, Crime, Thriller",
                    average_rating: 2.8,
                },
                {
                    id: 2205,
                    title: "Mr. & Mrs. Smith",
                    cover_img_url: null,
                    genres: "Comedy, Romance",
                    average_rating: 3.2,
                },
            ];

            const genres = [
                {
                    name: "Action",
                },
                {
                    name: "Adventure",
                },
                {
                    name: "Animation",
                },
                {
                    name: "Comedy",
                },
                {
                    name: "Crime",
                },
                {
                    name: "Documentary",
                },
                {
                    name: "Drama",
                },
                {
                    name: "Family",
                },
                {
                    name: "Fantasy",
                },
                {
                    name: "History",
                },
                {
                    name: "Horror",
                },
                {
                    name: "Music",
                },
                {
                    name: "Mystery",
                },
                {
                    name: "Romance",
                },
                {
                    name: "Science Fiction",
                },
                {
                    name: "Thriller",
                },
                {
                    name: "TV Movie",
                },
                {
                    name: "War",
                },
                {
                    name: "Western",
                },
            ];

            res.status(200).json({
                newMovies: newMovies,
                recentMovies: recentMovies,
                genres: genres,
            });
        } catch (err) {
            console.log("error", err);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    private async getNewMovies(req: Request, res: Response): Promise<any> {
        try {
            const sql: string = `SELECT m.id, m.title, m.cover_img_url, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating
                                    FROM movie m
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    GROUP BY m.id ORDER BY m.added_at desc limit 10`;
            const movies = await this.db.query(sql);

            return movies;
        } catch (err) {
            console.log("error", err);
        }
    }

    private async getRecentMovies(req: Request, res: Response): Promise<any> {
        try {
            const userId = req.query.userId;
            const sql: string = `SELECT m.id, m.title, m.cover_img_url, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating
                                    FROM movie m
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    GROUP BY m.id HAVING m.id IN (SELECT movie_id FROM user_history WHERE user_id = ? ORDER BY date DESC) LIMIT 10`;
            const movies = await this.db.query(sql, [userId]);
            return movies;
        } catch (err) {
            console.log("error", err);
        }
    }

    private async getGenres(req: Request, res: Response): Promise<any> {
        try {
            const sql: string = `SELECT name FROM genre`;
            const genres = await this.db.query(sql);

            return genres;
        } catch (err) {
            console.log("error", err);
        }
    }
}

export default HomeController;
