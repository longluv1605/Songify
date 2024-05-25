import Database from "../../database/database";
import Searcher from "../utils/searcher.utils";
import Filter from "../utils/filter.util";
import Recommender from "../utils/recommender.utils";
import { Manager } from "../../interfaces/interfaces";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const ml_server_url = process.env.ML_SERVER_URL;
const ml_server_port = process.env.ML_SERVER_PORT;

class MovieManager implements Manager {
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
    public getDatas = async (input: { [key: string]: any } = {}) => {
        try {
            const userRole = input.userRole;
            const userId = input.userId;

            let sql: string;
            if (input.movieId && userRole === "admin") {
                sql = `
                SELECT 
                    m.*, 
                    (SELECT 
                        GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') 
                    FROM 
                        movie_genre mg 
                    WHERE 
                        mg.movie_id = m.id
                    ) AS genres, 
                    (SELECT 
                        ROUND(AVG(r.value), 1) 
                    FROM 
                        user_rating r 
                    WHERE 
                        r.movie_id = m.id
                    ) AS average_rating, 
                    (SELECT 
                        ml.label_name 
                    FROM 
                        movie_label ml 
                    WHERE 
                        ml.movie_id = m.id
                    ) AS label, 
                    (SELECT 
                        mv.view 
                    FROM 
                        movie_view mv 
                    WHERE 
                        mv.movie_id = m.id
                    ) AS views
                FROM 
                    movie m
                WHERE 
                    m.id = ${input.movieId}
                `;
            } else if (input.movieId && userRole !== "admin") {
                sql = `
                SELECT m.id, m.title, m.description, m.release_year, m.duration, m.cover_img_url, m.trailer_url, m.film_url, m.actors, m.directors,
                    (SELECT 
                        GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') 
                    FROM 
                        movie_genre mg 
                    WHERE 
                        mg.movie_id = m.id
                    ) AS genres, 
                    (SELECT 
                        ROUND(AVG(r.value), 1) 
                    FROM 
                        user_rating r 
                    WHERE 
                        r.movie_id = m.id
                    ) AS average_rating, 
                    (SELECT 
                        ml.label_name 
                    FROM 
                        movie_label ml 
                    WHERE 
                        ml.movie_id = m.id
                    ) AS label, 
                    (SELECT 
                        mv.view 
                    FROM 
                        movie_view mv 
                    WHERE 
                        mv.movie_id = m.id
                    ) AS views
                FROM 
                    movie m
                WHERE 
                    m.id = ${input.movieId}
                `;
            } else {
                sql = `
                SELECT 
                    m.id, 
                    m.title, 
                    m.added_at, 
                    m.status, 
                    (SELECT 
                        GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') 
                    FROM 
                        movie_genre mg 
                    WHERE 
                        mg.movie_id = m.id
                    ) AS genres, 
                    (SELECT 
                        ROUND(AVG(r.value), 1) 
                    FROM 
                        user_rating r 
                    WHERE 
                        r.movie_id = m.id
                    ) AS average_rating, 
                    (SELECT 
                        ml.label_name 
                    FROM 
                        movie_label ml 
                    WHERE 
                        ml.movie_id = m.id
                    ) AS label, 
                    (SELECT 
                        mv.view 
                    FROM 
                        movie_view mv 
                    WHERE 
                        mv.movie_id = m.id
                    ) AS views
                FROM 
                    movie m
                ORDER BY 
                    m.added_at DESC 
                LIMIT 30;
                `;
            }

            const movies = await Database.query(sql);
            return movies;
        } catch (err) {
            // console.log("Error getting movies:", err);
            throw {
                message: "Error getting movies",
                error: err,
            };
        }
    };

    public addData = async (input: { [key: string]: any }) => {
        try {
            const userRole = input.userRole;

            if (!userRole || userRole !== "admin") {
                throw {
                    message: "You are not authorized to add genre",
                };
            }

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

            const genrestring = genres.join(", ");

            const data = [
                [
                    movieId, genrestring
                ]
            ]

            await axios.post(`http://localhost:${ml_server_port}${ml_server_url}/addnewmovie/`, data);

            return { message: "Add movie successfully" };
        } catch (err) {
            // console.log("Error adding movie:", err);
            throw {
                message: "Error adding movie",
                error: err,
            };
        }
    };

    public updateData = async (input: { [key: string]: any }) => {
        try {
            const userRole = input.userRole;

            if (!userRole || userRole !== "admin") {
                throw {
                    message: "You are not authorized to add genre",
                };
            }

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
            // console.log("Error updating movie:", err);
            throw {
                message: "Error updating movie",
                error: err,
            };
        }
    };

    public deleteData = async (input: { [key: string]: any }) => {
        try {
            const userRole = input.userRole;

            if (!userRole || userRole !== "admin") {
                throw {
                    message: "You are not authorized to add genre",
                };
            }

            const movieId = input.movieId;

            // Init sql
            const deleteMovieSql = `DELETE FROM movie WHERE id = ?`;

            // Query
            await Database.query(deleteMovieSql, [movieId]);
            return { message: "Delete movie successfully" };
        } catch (err) {
            // console.log("Error deleting movie:", err);
            throw {
                message: "Error deleting movie",
                error: err,
            };
        }
    };

    public changeStatus = async (input: { [key: string]: any }) => {
        try {
            const userRole = input.userRole;

            if (!userRole || userRole !== "admin") {
                throw {
                    message: "You are not authorized to add genre",
                };
            }

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
            // console.log("Error changing movie status:", err);
            throw {
                message: "Error changing movie status",
                error: err,
            };
        }
    };
}

export default new MovieManager();
