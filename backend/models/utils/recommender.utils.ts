import Database from "../../database/database";

class Recommender {
    public getNewMovies = async () => {
        try {
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
                movie m
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
            ORDER BY 
                m.added_at DESC 
            LIMIT 10;
            `;
            const movies = await Database.query(sql);

            return movies;
        } catch (err) {
            console.log("Error recommending new movies:", err);
            throw {
                message: "Error recommending new movies",
                error: err,
            };
        }
    };

    public getRecentlyViewedMovies = async (input: { [key: string]: any }) => {
        try {
            const userId = input.userId;
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
                (SELECT * FROM movie WHERE id IN (SELECT movie_id FROM user_history WHERE user_id = 3 ORDER BY date DESC)) m
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
            LIMIT 10;
`;
            // console.log(sql);
            const movies = await Database.query(sql, [userId]);
            // console.log("Recently viewed moviesssss:", movies);
            return movies;
        } catch (err) {
            console.log("Error recommending recently viewed movies:", err);
            throw {
                message: "Error recommending recently viewed movies",
                error: err,
            };
        }
    };
}

export default Recommender;
