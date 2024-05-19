import Database from "../../database/database";
import { Manager } from "../../interfaces/interfaces"

class CommentManager implements Manager {
    public getDatas = async (input: {[key: string]: any}) => {
        try {
            const commentId = input.commentId;
            const movieId = input.movieId;
            const userId = input.userId;
            // console.log("movieId", movieId);
            // console.log("userId", userId);
            // Get all comments
            if (!movieId && !userId && !commentId) {
                const sql = "SELECT * FROM comment LIMIT 10";
                const comments = await Database.query(sql);
                return comments;
            }

            // Get comments by commentId
            if (commentId) {
                const sql = "SELECT * FROM comment WHERE id = ?";
                const comments = await Database.query(sql, [commentId]);
                return comments;
            }

            // Get comments by commentId and userId
            if (commentId && userId) {
                const sql = "SELECT * FROM comment WHERE id = ? AND user_id = ?";
                const comments = await Database.query(sql, [commentId, userId]);
                return comments;
            }

            // Get comments by movieId
            if (movieId && !userId) {
                const sql = "SELECT * FROM comment WHERE movie_id = ? LIMIT 10";
                const comments = await Database.query(sql, [movieId]);
                return comments;
            }

            // Get comments by user_id
            if (!movieId && userId) {
                const sql = "SELECT * FROM comment WHERE user_id = ? LIMIT 10";
                const comments = await Database.query(sql, [userId]);
                return comments;
            }

            // Get comments by movieId and user_id
            const sql =
                "SELECT * FROM comment WHERE movie_id = ? AND user_id = ? LIMIT 10";
            const comments = await Database.query(sql, [movieId, userId]);
            return comments;
        } catch (err) {
            console.log("Error getting comments:", err);
            throw err;
        }
    };

    public addData = async (input: { [key: string]: any }) => {
        try {
            const movieId = input.movieId;
            const user_id = input.user_id;
            const detail = input.detail;

            const insertCommentSql = `
                INSERT INTO comments (movieId, user_id, detail)
                VALUES (?, ?, ?, ?);
            `;
            await Database.query(insertCommentSql, [movieId, user_id, detail]);
            return { message: "Add comment successfully" };
        } catch (err) {
            console.log("Error adding comment:", err);
            throw {
                message: "Error adding comment",
                error: err,
            };
        }
    };

    public updateData = async (input: { [key: string]: any }) => {
        try {
            const commentId = input.commentId;
            const userId = input.userId;
            const detail = input.detail;

            const data = await this.getDatas({ commentId: commentId, userId: userId });
            if (data.length === 0) {
                throw {
                    message: "Not be your comment",
                };
            }

            const updateCommentSql = `
                UPDATE comments
                SET detail = ?
                WHERE id = ?;
            `;
            await Database.query(updateCommentSql, [detail, commentId]);
            return { message: "Update comment successfully" };
        } catch (err) {
            console.log("Error updating comment:", err);
            throw {
                message: "Error updating comment",
                error: err,
            };
        }
    };

    public deleteData = async (input: { [key: string]: any }) => {
        try {
            const commentId = input.commentId;
            const deleteCommentSql = `
                DELETE FROM comment
                WHERE id = ?;
            `;
            await Database.query(deleteCommentSql, [commentId]);
            return { message: "Delete comment successfully" };
        } catch (err) {
            console.log("Error deleting comment:", err);
            throw {
                message: "Error deleting comment",
                error: err,
            };
        }
    };
}

export default new CommentManager();
