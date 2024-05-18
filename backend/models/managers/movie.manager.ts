import Database from "../../database/database";
import Searcher from "../utils/searcher.utils";
import Filter from "../utils/filter.util";
import Recommender from "../utils/recommender.utils";

class MovieManager {
    private seacher: any;
    private filter: any;
    private recommneder: any;

    constructor() {
        this.seacher = new Searcher();
        this.filter = new Filter();
        this.recommneder = new Recommender();
    }

    public getFilter = () => {
        return this.filter;
    };

    public getSearcher = () => {
        return this.seacher;
    };

    public getRecommender = () => {
        return this.recommneder;
    };

    // TODO: Implement the GET metho
    public getMovies = async (input: { [key: string]: any } = {}) => {
        try {
            let sql: string;
            if (input.movieId) {
                sql = `SELECT m.*, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating, ml.label_name as label, (SELECT view FROM movie_view WHERE movie_id = m.id) AS views
                FROM movie m
                LEFT JOIN movie_label ml ON m.id = ml.movie_id
                LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                LEFT JOIN user_rating r ON m.id = r.movie_id
                GROUP BY m.id HAVING m.id = ${input.movieId}`;
            } else {
                sql = `SELECT m.id, m.title, m.added_at, m.status, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating, ml.label_name as label, (SELECT view FROM movie_view WHERE movie_id = m.id) AS views
                FROM movie m
                LEFT JOIN movie_label ml ON m.id = ml.movie_id
                LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                LEFT JOIN user_rating r ON m.id = r.movie_id
                GROUP BY m.id ORDER BY m.added_at desc LIMIT 30`;
            }

            const movies = await Database.query(sql);
            return movies;
        } catch (err) {
            console.log("Error getting movies:", err);
            throw {
                message: "Error getting movies",
                error: err,
            };
        }
    };

    public addMovie = async (input: { [key: string]: any }) => {
        try {
            // Get data from input
            const title = input.title;
            const description = input.description;
            const release_year = input.release_year;
            const duration = input.duration;
            const cover_img_url = input.cover_img_url;
            const trailer_url = input.trailer_url;
            const film_url = input.film_url;
            const label = input.label;
            const actors = input.actors;
            const directors = input.directors;
            const genres = input.genres; // Array

            // Get connection
            const conn = await Database.getConnection();
            await conn.beginTransaction();

            // Init sql
            const insertMovieSql = `
                INSERT INTO movie (title, description, release_year, duration, cover_img_url, trailer_url, film_url, actors, directors)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;
            const insertMovieGenreSql = `INSERT INTO movie_genre (movie_id, genre_name) VALUES (?, ?)`;
            const insertMovieLabelSql = `INSERT INTO movie_label (movie_id, label_name) VALUES (?, ?)`;

            // Query
            const result = await conn.query(insertMovieSql, [
                title,
                description,
                release_year,
                duration,
                cover_img_url,
                trailer_url,
                film_url,
                actors,
                directors,
            ]);
            const movieId = result.insertId;

            // Insert genres
            for (let genre of genres) {
                await conn.query(insertMovieGenreSql, [movieId, genre]);
            }

            // Insert label
            await conn.query(insertMovieLabelSql, [movieId, label]);

            // Commit
            await conn.commit();

            // Release connection
            conn.release();

            return { message: "Add movie successfully" };
        } catch (err) {
            console.log("Error adding movie:", err);
            throw {
                message: "Error adding movie",
                error: err,
            };
        }
    };

    public updateMovie = async (input: { [key: string]: any }) => {
        try {
            // Get data from input
            const movieId = input.movieId;
            const title = input.title;
            const description = input.description;
            const release_year = input.release_year;
            const duration = input.duration;
            const cover_img_url = input.cover_img_url;
            const trailer_url = input.trailer_url;
            const film_url = input.film_url;
            const label = input.label;
            const actors = input.actors;
            const directors = input.directors;
            const genres = input.genres; // Array

            // Get connection
            const conn = await Database.getConnection();
            await conn.beginTransaction();

            // Init sql
            const updateMovieSql = `
                UPDATE movie
                SET title = ?, description = ?, release_year = ?, duration = ?, cover_img_url = ?, trailer_url = ?, film_url = ?, actors = ?, directors = ?
                WHERE id = ?;
            `;
            const deleteMovieGenreSql = `DELETE FROM movie_genre WHERE movie_id = ?`;
            const insertMovieGenreSql = `INSERT INTO movie_genre (movie_id, genre_name) VALUES (?, ?)`;
            const updateMovieLabelSql = `UPDATE movie_label SET label_name = ? WHERE movie_id = ?`;

            // Query
            await conn.query(updateMovieSql, [
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
            await conn.query(deleteMovieGenreSql, [movieId]);

            // Insert genres
            for (let genre of genres) {
                await conn.query(insertMovieGenreSql, [movieId, genre]);
            }

            // Update label
            await conn.query(updateMovieLabelSql, [label, movieId]);

            // Commit
            await conn.commit();

            // Release connection
            conn.release();

            return { message: "Update movie successfully" };
        } catch (err) {
            console.log("Error updating movie:", err);
            throw {
                message: "Error updating movie",
                error: err,
            };
        }
    };

    public deleteMovie = async (input: { [key: string]: any }) => {
        try {
            const movieId = input.movieId;

            // Init sql
            const deleteMovieSql = `DELETE FROM movie WHERE id = ?`;

            // Query
            await Database.query(deleteMovieSql, [movieId]);
            return { message: "Delete movie successfully" };
        } catch (err) {
            console.log("Error deleting movie:", err);
            throw {
                message: "Error deleting movie",
                error: err,
            };
        }
    };

    public changeStatus = async (input: { [key: string]: any }) => {
        try {
            const movieId = input.movieId;

            // Get current status
            const currentStatusSql = `SELECT status FROM movie WHERE id = ?`;
            let status = await Database.query(currentStatusSql, [movieId]);
            if (status.length === 0) {
                throw new Error("Movie not found");
            }

            status = status[0].status === "show" ? "hide" : "show";

            // Init sql
            const changeStatusSql = `UPDATE movie SET status = ? WHERE id = ?`;

            // Query
            await Database.query(changeStatusSql, [status, movieId]);
            return { message: "Change movie status successfully" };
        } catch (err) {
            console.log("Error changing movie status:", err);
            throw {
                message: "Error changing movie status",
                error: err,
            };
        }
    }
}

export default new MovieManager();
