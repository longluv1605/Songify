import Database from "../../database/database";
import { Manager } from "../../interfaces/interfaces"

class GenreManager implements Manager {
    public getDatas = async (input: { [key: string]: any }) => {
        try {
            const sql = "SELECT * FROM genre";
            const genres = await Database.query(sql);
            return genres;
        } catch (err) {
            // console.log("Error getting genres:", err);
            throw err;
        }
    }

    public addData = async (input: { [key: string]: any }) => {
        try {
            const userRole = input.userRole;

            if (!userRole || userRole !== "admin") {
                throw {
                    message: "You are not authorized to add genre",
                };
            }

            const genreName = input.genreName;

            const insertGenreSql = `
                INSERT INTO genre (name)
                VALUES (?);
            `;
            await Database.query(insertGenreSql, [genreName]);
            return { message: "Add genre successfully" };
        } catch (err) {
            // console.log("Error adding genre:", err);
            throw {
                message: "Error adding genre",
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
            // console.log("Error updating genre:", err);
            throw {
                message: "Error updating genre",
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

            const genreName = input.genreName;
            const deleteGenreSql = `
                DELETE FROM genre
                WHERE name = ?;
            `;
            await Database.query(deleteGenreSql, [genreName]);
            return { message: "Delete genre successfully" };
        } catch (err) {
            // console.log("Error deleting genre:", err);
            throw {
                message: "Error deleting genre",
                error: err,
            };
        }
    };
}

export default new GenreManager();
