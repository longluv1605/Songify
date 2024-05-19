import { UserController } from "./user.controller";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../interfaces/interfaces";
import MovieManager from "../models/managers/movie.manager";
import GenreManager from "../models/managers/genre.manager";
import LabelManager from "../models/managers/label.manager";
import PlanManager from "../models/managers/plan.manager";
import CommentManager from "../models/managers/comment.manager";
import RatingManager from "../models/managers/rating.manager";
import UserManager from "../models/managers/user.manager";
import SaleManager from "../models/managers/sale.manager";

class AdminController extends UserController {
    public getUsers = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userRole = req.role;
            if (userRole !== "admin") {
                res.status(403).json({
                    message: "You are not allowed to access this resource",
                });
                return;
            }
            const users = await UserManager.getDatas({});
            res.status(200).json(users);
        } catch (err) {
            console.log("Error getting Users:", err);
            res.status(500).json({
                message: "Error getting Users",
                error: err,
            });
        }
    };

    public changeUserStatus = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {
        try {
            const userRole = req.role;
            if (userRole !== "admin") {
                res.status(403).json({
                    message: "You are not allowed to access this resource",
                });
                return;
            }
            const userId = req.params.userId;
            await UserManager.changeStatus({ userId });
            res.status(200).json({
                message: "Change User status successfully",
            });
        } catch (err) {
            console.log("Error changing User status:", err);
            res.status(500).json({
                message: "Error changing User status",
                error: err,
            });
        }
    };

    public deleteUser = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userRole = req.role;
            if (userRole !== "admin") {
                res.status(403).json({
                    message: "You are not allowed to access this resource",
                });
                return;
            }
            const userId = req.params.userId;
            await UserManager.deleteData({ userId });
            res.status(200).json({ message: "Delete User successfully" });
        } catch (err) {
            console.log("Error deleting User:", err);
            res.status(500).json({
                message: "Error deleting User",
                error: err,
            });
        }
    };

    public changeUserPlan = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {
        try {
            const userRole = req.role;
            if (userRole !== "admin") {
                res.status(403).json({
                    message: "You are not allowed to access this resource",
                });
                return;
            }
            const userId = req.params.userId;
            const planId = req.body.planId;

            await UserManager.changePlan({ userId, planId });

            res.status(200).json({ message: "Change User plan successfully" });
        } catch (err) {
            console.log("Error changing User plan:", err);
            res.status(500).json({
                message: "Error changing User plan",
                error: err,
            });
        }
    };

    public getMovies = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userRole = req.role;
            if (userRole !== "admin") {
                res.status(403).json({
                    message: "You are not allowed to access this resource",
                });
                return;
            }
            const movies = await MovieManager.getDatas({});
            res.status(200).json(movies);
        } catch (err) {
            console.log("Error getting Movies:", err);
            res.status(500).json({
                message: "Error getting Movies",
                error: err,
            });
        }
    };

    public changeMovieStatus = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {
        try {
            const userRole = req.role;
            if (userRole !== "admin") {
                res.status(403).json({
                    message: "You are not allowed to access this resource",
                });
                return;
            }
            const movieId = req.params.movieId;
            await MovieManager.changeStatus({ movieId });
            res.status(200).json({
                message: "Change movie status successfully",
            });
        } catch (err) {
            console.log("Error changing movie status:", err);
            res.status(500).json({
                message: "Error changing movie status",
                error: err,
            });
        }
    };

    public deleteMovie = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userRole = req.role;
            if (userRole !== "admin") {
                res.status(403).json({
                    message: "You are not allowed to access this resource",
                });
                return;
            }
            const movieId = req.params.movieId;
            await MovieManager.deleteData({ movieId });
            res.status(200).json({ message: "Delete movie successfully" });
        } catch (err) {
            console.log("Error deleting movie:", err);
            res.status(500).json({
                message: "Error deleting movie",
                error: err,
            });
        }
    };

    public changeMovieInfo = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {
        try {
            const userRole = req.role;
            if (userRole !== "admin") {
                res.status(403).json({
                    message: "You are not allowed to access this resource",
                });
                return;
            }
            const movieId = parseInt(req.params.movieId as string);

            if (!movieId) {
                throw new Error("Movie not found");
            }

            let data = await MovieManager.getDatas({ movieId });
            if (data.length === 0) {
                res.status(300).json({ message: "Movie not found" });
            } else {
                const title: string = req.body.title || data[0].title;
                const description: string =
                    req.body.description || data[0].description;
                const release_year: number =
                    req.body.release_year || data[0].release_year;
                const duration: number = req.body.duration || data[0].duration;
                const cover_img_url: string =
                    req.body.cover_img_url || data[0].cover_img_url;
                const trailer_url: string =
                    req.body.trailer_url || data[0].trailer_url;
                const film_url: string = req.body.film_url || data[0].film_url;
                const actors: string = req.body.actors || data[0].actors;
                const directors: string =
                    req.body.directors || data[0].directors;
                const label: string = req.body.label || data[0].label;
                const genres: any = req.body.genres || data[0].genres;

                if (
                    !title ||
                    !description ||
                    !release_year ||
                    !duration ||
                    !cover_img_url ||
                    !trailer_url ||
                    !film_url ||
                    !actors ||
                    !directors ||
                    !label ||
                    !genres ||
                    genres.length === 0
                ) {
                    throw new Error("Invalid data. Please check again.");
                }

                await MovieManager.updateData({
                    movieId,
                    title,
                    description,
                    release_year,
                    duration,
                    cover_img_url,
                    trailer_url,
                    film_url,
                    actors,
                    directors,
                    label,
                    genres,
                });
                res.status(200).json({ message: "Update movie successfully" });
            }
        } catch (err) {
            console.log("Error updating movie:", err);
            res.status(500).json({
                message: "Error updating movie",
                error: err,
            });
        }
    };

    public addMovie = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userRole = req.role;
            if (userRole !== "admin") {
                res.status(403).json({
                    message: "You are not allowed to access this resource",
                });
                return;
            }
            const title: string = req.body.title;
            const description: string = req.body.description;
            const release_year: number = req.body.release_year;
            const duration: number = req.body.duration;
            const cover_img_url: string = req.body.cover_img_url;
            const trailer_url: string = req.body.trailer_url;
            const film_url: string = req.body.film_url;
            const label: string = req.body.label;
            const genres: any = req.body.genres;

            if (
                !title ||
                !description ||
                !release_year ||
                !duration ||
                !cover_img_url ||
                !trailer_url ||
                !film_url ||
                !label ||
                !genres ||
                genres.length === 0
            ) {
                throw new Error("Invalid data. Please check again.");
            }

            await MovieManager.addData({
                title,
                description,
                release_year,
                duration,
                cover_img_url,
                trailer_url,
                film_url,
                label,
                genres,
            });

            res.status(200).json({ message: "Add movie successfully" });
        } catch (err) {
            console.log("Error adding movie:", err);
            res.status(500).json({
                message: "Error adding movie",
                error: err,
            });
        }
    };

    public addPlan = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userRole = req.role;
            if (userRole !== "admin") {
                res.status(403).json({
                    message: "You are not allowed to access this resource",
                });
                return;
            }
            const name: string = req.body.name;
            const price: number = req.body.price;
            const duration: number = req.body.duration;
            const maxQuality: string = req.body.maxQuality;
            const description: string = req.body.description;

            if (!name || !price || !duration || !maxQuality || !description) {
                throw new Error("Invalid data. Please check again.");
            }

            await PlanManager.addData({
                name,
                price,
                duration,
                maxQuality,
                description,
            });

            res.status(200).json({ message: "Add plan successfully" });
        } catch (err) {
            console.log("Error adding plan:", err);
            res.status(500).json({
                message: "Error adding plan",
                error: err,
            });
        }
    };

    public updatePlan = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userRole = req.role;
            if (userRole !== "admin") {
                res.status(403).json({
                    message: "You are not allowed to access this resource",
                });
                return;
            }
            const id: number = parseInt(req.params.planId as string);
            const name: string = req.body.name;
            const price: number = req.body.price;
            const duration: number = req.body.duration;
            const maxQuality: string = req.body.maxQuality;
            const description: string = req.body.description;

            if (
                !id ||
                !name ||
                !price ||
                !duration ||
                !maxQuality ||
                !description
            ) {
                throw new Error("Invalid data. Please check again.");
            }

            await PlanManager.updateData({
                id,
                name,
                price,
                duration,
                maxQuality,
                description,
            });

            res.status(200).json({ message: "Update plan successfully" });
        } catch (err) {
            console.log("Error updating plan:", err);
            res.status(500).json({
                message: "Error updating plan",
                error: err,
            });
        }
    };

    public deletePlan = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userRole = req.role;
            if (userRole !== "admin") {
                res.status(403).json({
                    message: "You are not allowed to access this resource",
                });
                return;
            }
            const planId: number = parseInt(req.params.planId as string);
            if (!planId) {
                throw new Error("No plan found");
            }

            await PlanManager.deleteData({planId});

            res.status(200).json({ message: "Delete plan successfully" });
        } catch (err) {
            console.log("Error deleting plan:", err);
            res.status(500).json({
                message: "Error deleting plan",
                error: err,
            });
        }
    };

    public getSales = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userRole = req.role;
            if (userRole !== "admin") {
                res.status(403).json({
                    message: "You are not allowed to access this resource",
                });
                return;
            }
            const sales = await SaleManager.getDatas({});
            res.status(200).json(sales);
        } catch (err) {
            console.log("Error getting Sales:", err);
            res.status(500).json({
                message: "Error getting Sales",
                error: err,
            });
        }
    };
}

export default new AdminController();

export { AdminController };
