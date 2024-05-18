import Database from "../../database/database";

class Recommender {
    public getNewMovies = async () => {
        try {
            const sql: string = `SELECT m.id, m.title, m.cover_img_url, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating, ml.label_name as label, (SELECT view FROM movie_view WHERE movie_id = m.id) AS views
                                    FROM movie m
                                    LEFT JOIN movie_label ml ON m.id = ml.movie_id
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    GROUP BY m.id ORDER BY m.added_at DESC LIMIT 10`;
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

    public getRecentlyViewedMovies = async (input: {[key: string]: any}) => {
        try {
            const userId = input.userId;
            const sql: string = `SELECT m.id, m.title, m.cover_img_url, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating, ml.label_name as label, (SELECT view FROM movie_view WHERE movie_id = m.id) AS views
                                    FROM movie m
                                    LEFT JOIN movie_label ml ON m.id = ml.movie_id
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    GROUP BY m.id HAVING m.id IN (SELECT movie_id FROM user_history WHERE user_id = ? ORDER BY date DESC) LIMIT 10`;
            const movies = await Database.query(sql, [userId]);
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
