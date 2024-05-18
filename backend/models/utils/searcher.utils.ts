import Database from "../../database/database";

class Searcher {
    public getMovieByTitle = async (input: {[key: string]: any}) => {
        try {
            const searchQuery = input.searchQuery;
            const sql: string = `SELECT m.id, m.title, m.cover_img_url, GROUP_CONCAT(DISTINCT mg.genre_name ORDER BY mg.genre_name SEPARATOR ', ') AS genres, ROUND(AVG(r.value), 1) AS average_rating, ml.label_name as label, (SELECT view FROM movie_view WHERE movie_id = m.id) AS views
                                    FROM movie m
                                    LEFT JOIN movie_label ml ON m.id = ml.movie_id
                                    LEFT JOIN movie_genre mg ON m.id = mg.movie_id
                                    LEFT JOIN user_rating r ON m.id = r.movie_id
                                    GROUP BY m.id
                                    HAVING LOWER(m.title) LIKE LOWER('%${searchQuery}%')
                                    ORDER BY average_rating DESC LIMIT 10`;
            const movies = await Database.query(sql);
            return movies;
        } catch (err) {
            console.log("Error searching by title:", err);
            throw {
                message: "Error searching by title",
                error: err,
            };
        }
    }
}

export default Searcher;