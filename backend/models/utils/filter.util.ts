import Database from "../../database/database";

class Filter {

    public getMovieByGenre = async (input: {[key: string]: any}) => {
        try {
            const genre = input.genre;
            const sql: string = `
            SELECT 
                m.id, 
                m.title, 
                m.cover_img_url, 
                mg.genres, 
                r.average_rating, 
                ml.label, 
                mv.views
            FROM 
                (SELECT * FROM movie WHERE status = 'show') m
            LEFT JOIN 
                (SELECT movie_id, GROUP_CONCAT(DISTINCT genre_name ORDER BY genre_name SEPARATOR ', ') AS genres FROM movie_genre GROUP BY movie_id) mg ON m.id = mg.movie_id
            LEFT JOIN 
                (SELECT movie_id, ROUND(AVG(value), 1) AS average_rating FROM user_rating GROUP BY movie_id) r ON m.id = r.movie_id
            LEFT JOIN 
                (SELECT movie_id, label_name AS label FROM movie_label) ml ON m.id = ml.movie_id
            LEFT JOIN 
                (SELECT movie_id, view AS views FROM movie_view) mv ON m.id = mv.movie_id
            GROUP BY 
                m.id, m.title, m.cover_img_url, ml.label
            HAVING 
                genres LIKE '%${genre}%'
            ORDER BY 
                average_rating DESC 
            LIMIT 20;
        `;
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
            const sql: string = `
            SELECT 
                m.id, 
                m.title, 
                m.cover_img_url, 
                mg.genres, 
                r.average_rating, 
                ml.label, 
                mv.views
            FROM 
                (SELECT * FROM movie WHERE status = 'show') m
            LEFT JOIN 
                (SELECT movie_id, GROUP_CONCAT(DISTINCT genre_name ORDER BY genre_name SEPARATOR ', ') AS genres FROM movie_genre GROUP BY movie_id) mg ON m.id = mg.movie_id
            LEFT JOIN 
                (SELECT movie_id, ROUND(AVG(value), 1) AS average_rating FROM user_rating GROUP BY movie_id) r ON m.id = r.movie_id
            LEFT JOIN 
                (SELECT movie_id, label_name AS label FROM movie_label) ml ON m.id = ml.movie_id
            LEFT JOIN 
                (SELECT movie_id, view AS views FROM movie_view) mv ON m.id = mv.movie_id
            GROUP BY 
                m.id, m.title, m.cover_img_url, ml.label
            HAVING 
                label = ?
            ORDER BY 
                average_rating DESC 
            LIMIT 20;
        `;
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
            const sql: string = `
            SELECT 
                m.id, 
                m.title, 
                m.cover_img_url, 
                mg.genres, 
                r.average_rating, 
                ml.label, 
                mv.views
            FROM 
                (SELECT * FROM movie WHERE status = 'show') m
            LEFT JOIN 
                (SELECT movie_id, GROUP_CONCAT(DISTINCT genre_name ORDER BY genre_name SEPARATOR ', ') AS genres FROM movie_genre GROUP BY movie_id) mg ON m.id = mg.movie_id
            LEFT JOIN 
                (SELECT movie_id, ROUND(AVG(value), 1) AS average_rating FROM user_rating GROUP BY movie_id) r ON m.id = r.movie_id
            LEFT JOIN 
                (SELECT movie_id, label_name AS label FROM movie_label) ml ON m.id = ml.movie_id
            LEFT JOIN 
                (SELECT movie_id, view AS views FROM movie_view) mv ON m.id = mv.movie_id
            GROUP BY 
                m.id, m.title, m.cover_img_url, ml.label
            HAVING 
                label = ? AND genres LIKE '%${genre}%'
            ORDER BY 
                average_rating DESC 
            LIMIT 20;
        `;
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
