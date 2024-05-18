import Database from "../../database/database";

class Filter {

    public getMovieByGenre = async (input: {[key: string]: any}) => {
        try {
            const genre = input.genre;
            const sql: string = `SELECT m.id, m.title, m.cover_img_url, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating, ml.label_name as label, (SELECT view FROM movie_view WHERE movie_id = m.id) AS views
                                    FROM movie m
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    LEFT JOIN movie_label ml ON m.id = ml.movie_id
                                    GROUP BY m.id HAVING genres LIKE '%${genre}%' ORDER BY average_rating DESC LIMIT 20`;
            const movies = await Database.query(sql);
            return movies;
        } catch (err) {
            console.log("Error filtering by genre:", err);
            throw {
                message: "Error filtering by genre",
                error: err,
            };
        }
    };

    public getMovieByLabel = async (input: {[key: string]: any}) => {
        try {
            const label = input.label;
            const sql: string = `SELECT m.id, m.title, m.cover_img_url, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating, ml.label_name as label, (SELECT view FROM movie_view WHERE movie_id = m.id) AS views
                                    FROM movie m
                                    LEFT JOIN movie_label ml ON m.id = ml.movie_id
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    GROUP BY m.id HAVING label = ? ORDER BY average_rating DESC LIMIT 20`;
            const movies = await Database.query(sql, [label]);
            return movies;
        } catch (err) {
            console.log("Error filtering by label:", err);
            throw {
                message: "Error filtering by label",
                error: err,
            };
        }
    };

    public getMovieByGenreAndLabel = async (input: {[key: string]: any}) => {
        try {
            const genre = input.genre;
            const label = input.label;
            const sql: string = `SELECT m.id, m.title, m.cover_img_url, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating, ml.label_name as label, (SELECT view FROM movie_view WHERE movie_id = m.id) AS views
                                    FROM movie m
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    LEFT JOIN movie_label ml ON m.id = ml.movie_id
                                    GROUP BY m.id HAVING genres LIKE '%${genre}%' AND label = ? ORDER BY average_rating DESC LIMIT 20`;
            const movies = await Database.query(sql, [label]);
            return movies;
        } catch (err) {
            console.log("Error filtering by genre and label:", err);
            throw {
                message: "Error filtering by genre and label",
                error: err,
            };
        }
    };
}

export default Filter;
