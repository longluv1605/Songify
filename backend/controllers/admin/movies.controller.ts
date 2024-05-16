import Database from "../../database/database";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../interfaces/authenticatedRequest";

class AdminMovieController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public getMovieData = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const sql: string = `SELECT m.id, m.title, m.added_at, ROUND(AVG(r.value), 1) AS average_rating, (SELECT view FROM movie_view WHERE movie_id = m.id) AS views
                                    FROM movie m
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    GROUP BY m.id ORDER BY m.added_at desc LIMIT 100`;
            const movies = await this.db.query(sql);

            res.status(200).json({ movies });
        } catch (err) {
            res.status(500).json({ err });
        }
    };

    public updateMovieData = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {
        try {
            const movieId = parseInt(req.query.movieId as string);

            if (
                movieId == undefined ||
                movieId == null ||
                Number.isNaN(movieId)
            ) {
                throw new Error("Movie not found");
            }

            let sql: string = `SELECT * FROM movie WHERE id = ?`;
            let data = await this.db.query(sql, [movieId]);
            if (data.length === 0) {
                res.status(300).json({ message: "Movie not found" });
            } else {
                const title: string = req.body.title || data[0].title;
                const description: string =
                    req.body.description || data[0].description;
                const release_year: number =
                    req.body.release_year || data[0].release_year;
                const duration: number = req.body.duration || data[0].duration;
                const cover_img_url: string =
                    req.body.cover_img_url || data[0].cover_img_url;
                const trailer_url: string =
                    req.body.trailer_url || data[0].trailer_url;
                const film_url: string = req.body.film_url || data[0].film_url;
                const actors: string = req.body.actors || data[0].actors;
                const directors: string =
                    req.body.directors || data[0].directors;
                const label: string = req.body.labels || data[0].labels;
                const genres: string[] = req.body.genres || data[0].genres;

                if (
                    !title ||
                    !description ||
                    !release_year ||
                    !duration ||
                    !cover_img_url ||
                    !trailer_url ||
                    !film_url ||
                    !actors ||
                    !directors
                ) {
                    res.status(300).json({
                        message: "Invalid data. Please check again.",
                    });
                    return;
                }

                if (genres && genres.length > 0) {
                    await this.db.query(
                        "DELETE FROM movie_genre WHERE movie_id = ?",
                        [movieId]
                    );
                    for (let genre of genres) {
                        await this.db.query(
                            "INSERT INTO movie_genre (movie_id, genre_name) VALUES (?, ?)",
                            [movieId, genre]
                        );
                    }
                }

                if (label) {
                    await this.db.query(
                        "DELETE FROM movie_label WHERE movie_id = ?",
                        [movieId]
                    );
                    await this.db.query(
                        "INSERT INTO movie_label (movie_id, label_name) VALUES (?, ?)",
                        [movieId, label]
                    );
                }

                sql = `UPDATE movie SET title = ?, description = ?, release_year = ?, duration = ?, cover_img_url = ?, trailer_url = ?, film_url = ?, actors = ?, directors = ? WHERE id = ?`;

                await this.db.query(sql, [
                    title,
                    description,
                    release_year,
                    duration,
                    cover_img_url,
                    trailer_url,
                    film_url,
                    actors,
                    directors,
                    movieId,
                ]);

                res.status(200).json({ message: "Movie updated successfully" });
            }
        } catch (err) {
            res.status(500).json({ err });
        }
    };

    public addMovie = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const title = req.body.title;
            const description = req.body.description;
            const release_year = req.body.release_year;
            const duration = req.body.duration;
            const cover_img_url = req.body.cover_img_url;
            const trailer_url = req.body.trailer_url;
            const film_url = req.body.film_url;
            const labels = req.body.labels;
            const actors = req.body.actors;
            const directors = req.body.directors;
            const genres = req.body.genres;

            if (
                !title ||
                !description ||
                !release_year ||
                !duration ||
                !cover_img_url ||
                !trailer_url ||
                !film_url ||
                !actors ||
                !directors
            ) {
                res.status(300).json({
                    message: "Invalid data. Please check again.",
                });
                return;
            }

            let sql: string = `INSERT INTO movie (title, description, release_year, duration, directors, actors, cover_img_url, trailer_url, film_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            await this.db.query(sql, [
                title,
                description,
                release_year,
                duration,
                directors,
                actors,
                cover_img_url,
                trailer_url,
                film_url,
            ]);

            sql = `SELECT id FROM movie WHERE title = ? and description = ? and release_year = ? and duration = ? and directors = ? and actors = ? and cover_img_url = ? and trailer_url = ? and film_url = ?`;

            const data = await this.db.query(sql, [
                title,
                description,
                release_year,
                duration,
                directors,
                actors,
                cover_img_url,
                trailer_url,
                film_url,
            ]);

            const movieId = data[0].id;
            if (
                movieId == undefined ||
                movieId == null ||
                Number.isNaN(movieId)
            ) {
                throw new Error("Movie not found");
            }

            for (const genre of genres) {
                await this.db.query(
                    "INSERT INTO movie_genre (movie_id, genre_name) VALUES (?, ?)",
                    [movieId, genre]
                );
            }
            await this.db.query(
                "INSERT INTO movie_label (movie_id, label_name) VALUES (?, ?)",
                [movieId, labels]
            );

            res.status(200).json({ message: "Movie added successfully" });
        } catch (err) {
            res.status(500).json({ err });
        }
    };

    public deleteMovie = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {
        try {
            const movieId = parseInt(req.query.movieId as string);
            if (
                movieId == undefined ||
                movieId == null ||
                Number.isNaN(movieId)
            ) {
                throw new Error("Movie not found");
            }

            const sql: string = `DELETE FROM movie WHERE id = ?`;

            await this.db.query(sql, [movieId]);

            res.status(200).json({ message: "Movie deleted successfully" });
        } catch (err) {
            res.status(500).json({ err });
        }
    };

    // public changeMovieStatus = async (req: AuthenticatedRequest, res: Response) => {
    //     try {
    //         const movieId = parseInt(req.query.movieId as string);
    //         if (movieId == undefined || movieId == null || Number.isNaN(movieId)) {
    //             throw new Error("Movie not found");
    //         }

    //         const sql: string = `SELECT * FROM movie WHERE id = ?`;
    //         const data = await this.db.query(sql, [movieId]);
    //         if (data.length === 0) {
    //             res.status(300).json({ message: "Movie not found" });
    //         } else {
    //             const status = req.body.status || data[0].status;

    //             const sql: string = `UPDATE movie SET status = ? WHERE id = ?`;

    //             await this.db.query(sql, [status, movieId]);

    //             res.status(200).json({ message: "Movie status updated successfully" });
    //         }
    //     } catch (err) {
    //         res.status(500).json({ err });
    //     }
    // };
}

export default AdminMovieController;
