import Database from "../../database/database";
import { Manager } from "../../interfaces/interfaces"

class CommentManager implements Manager {
    public getDatas = async (input: { [key: string]: any }) => {
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
                const sql = `
                    SELECT 
                        cmt.date, 
                        cmt.detail, 
                        u.first_name, 
                        u.last_name
                    FROM 
                        comment cmt
                    LEFT JOIN 
                        user u ON cmt.user_id = u.id
                    WHERE 
                        cmt.id = ?
                    ORDER BY 
                        cmt.date DESC 
                    LIMIT 10;
                    `;
                const comments = await Database.query(sql, [commentId]);
                return comments;
            }

            // Get comments by commentId and userId
            if (commentId && userId) {
                const sql = `
                    SELECT 
                        cmt.date, 
                        cmt.detail, 
                        u.first_name, 
                        u.last_name
                    FROM 
                        comment cmt
                    LEFT JOIN 
                        user u ON cmt.user_id = u.id
                    WHERE 
                        cmt.id = ? AND cmt.user_id = ?
                    ORDER BY 
                        cmt.date DESC 
                    LIMIT 10;
                    `;
                const comments = await Database.query(sql, [commentId, userId]);
                return comments;
            }

            // Get comments by movieId
            if (movieId && !userId) {
                const sql = `
                    SELECT 
                        cmt.date, 
                        cmt.detail, 
                        u.first_name, 
                        u.last_name
                    FROM 
                        comment cmt
                    LEFT JOIN 
                        user u ON cmt.user_id = u.id
                    WHERE 
                        cmt.movie_id = ?
                    ORDER BY 
                        cmt.date DESC 
                    LIMIT 10;
                    `;
                const comments = await Database.query(sql, [movieId]);
                return comments;
            }

            // Get comments by user_id
            if (!movieId && userId) {
                const sql = `
                    SELECT 
                        cmt.date, 
                        cmt.detail, 
                        u.first_name, 
                        u.last_name
                    FROM 
                        comment cmt
                    LEFT JOIN 
                        user u ON cmt.user_id = u.id
                    WHERE 
                        cmt.user_id = ?
                    ORDER BY 
                        cmt.date DESC 
                    LIMIT 10;
                    `;
                const comments = await Database.query(sql, [userId]);
                return comments;
            }

            // Get comments by movieId and user_id
            const sql = `
                SELECT 
                    cmt.date, 
                    cmt.detail, 
                    u.first_name, 
                    u.last_name
                FROM 
                    comment cmt
                LEFT JOIN 
                    user u ON cmt.user_id = u.id
                WHERE 
                    cmt.movie_id = ? AND cmt.user_id = ?
                ORDER BY 
                    cmt.date DESC 
                LIMIT 10;
                `;
                const comments = await Database.query(sql, [movieId, userId]);
            return comments;
        } catch (err) {
            // console.log("Error getting comments:", err);
            throw err;
        }
    };

    public addData = async (input: { [key: string]: any }) => {
        try {
            const movieId = input.movieId;
            const userId = input.userId;
            const detail = input.detail;

            const insertCommentSql = `
                INSERT INTO comment (movie_id, user_id, detail)
                VALUES (?, ?, ?);
            `;
            await Database.query(insertCommentSql, [movieId, userId, detail]);
            return { message: "Add comment successfully" };
        } catch (err) {
            // console.log("Error adding comment:", err);
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
                UPDATE comment
                SET detail = ?
                WHERE id = ?;
            `;
            await Database.query(updateCommentSql, [detail, commentId]);
            return { message: "Update comment successfully" };
        } catch (err) {
            // console.log("Error updating comment:", err);
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
            // console.log("Error deleting comment:", err);
            throw {
                message: "Error deleting comment",
                error: err,
            };
        }
    };
}

export default new CommentManager();
