import Database from "../../database/database";

class GenreManager {
    public getGenres = async () => {
        try {
            const sql = "SELECT * FROM genre";
            const genres = await Database.query(sql);
            return genres;
        } catch (err) {
            console.log("Error getting genres:", err);
            throw err;
        }
    }

    public addGenre = async (input: { [key: string]: any }) => {
        try {
            const genreName = input.genreName;

            const insertGenreSql = `
                INSERT INTO genre (name)
                VALUES (?);
            `;
            await Database.query(insertGenreSql, [genreName]);
            return { message: "Add genre successfully" };
        } catch (err) {
            console.log("Error adding genre:", err);
            throw {
                message: "Error adding genre",
                error: err,
            };
        }
    };

    public updateGenre = async (input: { [key: string]: any }) => {
        try {
            const genreName = input.genreName;
            const newGenreName = input.newGenreName;

            const updateGenreSql = `
                UPDATE genre
                SET name = ?
                WHERE name = ?;
            `;
            await Database.query(updateGenreSql, [newGenreName, genreName]);
            return { message: "Update genre successfully" };
        } catch (err) {
            console.log("Error updating genre:", err);
            throw {
                message: "Error updating genre",
                error: err,
            };
        }
    };

    public deleteGenre = async (genreName: string) => {
        try {
            const deleteGenreSql = `
                DELETE FROM genre
                WHERE name = ?;
            `;
            await Database.query(deleteGenreSql, [genreName]);
            return { message: "Delete genre successfully" };
        } catch (err) {
            console.log("Error deleting genre:", err);
            throw {
                message: "Error deleting genre",
                error: err,
            };
        }
    };
}

export default new GenreManager();
