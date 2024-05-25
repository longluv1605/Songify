import { Request, Response } from "express";
import { AuthenticatedRequest } from "../interfaces/interfaces";
import SessionManager from "../models/systems/session.manager";
import PasswordRestorer from "../models/systems/verifier.manager";
import MovieManager from "../models/managers/movie.manager";
import GenreManager from "../models/managers/genre.manager";
import LabelManager from "../models/managers/label.manager";
import PlanManager from "../models/managers/plan.manager";
import CommentManager from "../models/managers/comment.manager";
import RatingManager from "../models/managers/rating.manager";
import UserManager from "../models/managers/user.manager";
import PurchaseMethodManager from "../models/managers/purchaseMethod.manager";

class UserController {
    public signIn = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                res.status(400).json({
                    message: "Missing username or password",
                });
                return;
            }

            const { token, role } = await SessionManager.createSession({
                username,
                password,
            });

            res.status(200).json({ token, role });
        } catch (err) {
            console.log("Error signing in:", err);
            res.status(500).json({
                message: "Error signing in",
                error: err,
            });
        }
    };

    public signOut = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const token: string =
                req.headers["authorization"]?.split(" ")[1] || "";
            if (!token) {
                res.status(400).json({
                    message: "Missing token",
                });
                return;
            }

            // console.log("Signing out token:", token);

            const result = await SessionManager.deleteSession({ token });
            res.status(200).json(result);
        } catch (err) {
            console.log("Error signing out:", err);
            res.status(500).json({
                message: "Error signing out",
                error: err,
            });
        }
    };

    public signUp = async (req: Request, res: Response) => {
        try {
            const { username, password, email, firstName, lastName } = req.body;

            if (!username || !password || !email || !firstName || !lastName) {
                res.status(400).json({
                    message: "Missing information",
                });
                return;
            }

            const result = await UserManager.addData({
                username,
                password,
                email,
                firstName,
                lastName,
            });

            res.status(200).json(result);
        } catch (err) {
            console.log("Error signing up:", err);
            res.status(500).json({
                message: "Error signing up",
                error: err,
            });
        }
    };

    public getHomeData = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = parseInt(req.userId as string);

            if (!userId) {
                res.status(400).json({
                    message: "Missing userId",
                });
                return;
            }

            // console.log("Getting home data for user:", userId);
            const forYou = await MovieManager.getRecommender().getContentBasedRecommendation({userId})
            const newMovies =
                await MovieManager.getRecommender().getNewMovies();
            const recentMovies =
                await MovieManager.getRecommender().getRecentlyViewedMovies(
                    userId
                );

            const genres = await GenreManager.getDatas({});
            const labels = await LabelManager.getDatas({});
            res.status(200).json({ newMovies, recentMovies, genres, labels, forYou});
        } catch (err) {
            res.status(500).json({
                message: "Error getting home data",
                error: err,
            });
        }
    };

    public getPlanData = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = parseInt(req.userId as string);

            if (!userId) {
                res.status(400).json({
                    message: "Missing userId",
                });
                return;
            }

            // console.log("Getting plan data for user:", userId);
            const paymentMethods = await PurchaseMethodManager.getDatas({
                userId,
            });
            const planDatas = await PlanManager.getDatas({});
            const userPlan = await PlanManager.getDatas({ userId });
            res.status(200).json({ planDatas, userPlan, paymentMethods });
        } catch (err) {
            res.status(500).json({
                message: "Error getting plan data",
                error: err,
            });
        }
    };

    public getMovieData = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = parseInt(req.userId as string);
            const userRole = req.role;
            const movieId = parseInt(req.params.movieId as string);

            if (!userId) {
                res.status(400).json({
                    message: "Missing userId",
                });
                return;
            }

            if (!userRole) {
                res.status(400).json({
                    message: "Missing userRole",
                });
                return;
            }

            if (!movieId) {
                res.status(400).json({
                    message: "Missing movieId1",
                });
                return;
            }

            const movieData = await MovieManager.getDatas({
                movieId,
                userRole,
            });
            const comments = await CommentManager.getDatas({ movieId });
            const your_rating = await RatingManager.getDatas({
                userId,
                movieId,
            });

			const isFavorite = (await MovieManager.getRecommender().getFavoriteMovies({ userId, movieId })).length > 0;

            // console.log("Movie data:", movieData);
            // console.log("Comments:", comments);
            res.status(200).json({ movieData, comments, your_rating, isFavorite });
        } catch (err) {
            console.log("Error getting movie data:", err);
            res.status(500).json({
                message: "Error getting movie data",
                error: err,
            });
        }
    };

    public searchMovie = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = parseInt(req.userId as string);
            const searchQuery = req.params.searchQuery;

            if (!userId) {
                res.status(400).json({
                    message: "Missing userId",
                });
                return;
            }

            if (!searchQuery) {
                res.status(400).json({
                    message: "Missing query",
                });
                return;
            }

            const searchResults =
                await MovieManager.getSearcher().getMovieByTitle({
                    searchQuery,
                });
            res.status(200).json(searchResults);
        } catch (err) {
            console.log("Error searching movie:", err);
            res.status(500).json({
                message: "Error searching movie",
                error: err,
            });
        }
    };

    public filterMovie = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = parseInt(req.userId as string);
            const label = req.query.label;
            const genre = req.query.genre;

            // console.log("Filtering movie:", userId, label, genre);

            if (!userId) {
                res.status(400).json({
                    message: "Missing userId",
                });
                return;
            }

            if (!label && !genre) {
                res.status(400).json({
                    message: "Missing filter query",
                });
                return;
            }

            let filterResults;

            if (label && genre) {
                filterResults =
                    await MovieManager.getFilter().getMovieByGenreAndLabel({
                        genre,
                        label,
                    });
            } else if (label) {
                filterResults = await MovieManager.getFilter().getMovieByLabel({
                    label,
                });
            } else {
                filterResults = await MovieManager.getFilter().getMovieByGenre({
                    genre,
                });
            }

            res.status(200).json(filterResults);
        } catch (err) {
            console.log("Error filtering movie:", err);
            res.status(500).json({
                message: "Error filtering movie",
                error: err,
            });
        }
    };

    public watchMovie = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = parseInt(req.userId as string);
            const movieId = parseInt(req.params.movieId as string);

            if (!userId) {
                res.status(400).json({
                    message: "Missing userId",
                });
                return;
            }

            if (!movieId) {
                res.status(400).json({
                    message: "Missing movieId2",
                });
                return;
            }

            await UserManager.addMovieToHistory({ userId, movieId });
            res.status(200).json({ message: "Watch movie successfully" });
        } catch (err) {
            console.log("Error watching movie:", err);
            res.status(500).json({
                message: "Error watching movie",
                error: err,
            });
        }
    };

    public addMovieToFavorite = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {
        try {
            const userId = parseInt(req.userId as string);
            const movieId = parseInt(req.params.movieId as string);

            if (!userId) {
                res.status(400).json({
                    message: "Missing userId",
                });
                return;
            }

            if (!movieId) {
                res.status(400).json({
                    message: "Missing movieId3",
                });
                return;
            }

            await UserManager.addMovieToFavorite({ userId, movieId });
            res.status(200).json({
                message: "Add movie to favorite successfully",
            });
        } catch (err) {
            console.log("Error adding movie to favorite:", err);
            res.status(500).json({
                message: "Error adding movie to favorite",
                error: err,
            });
        }
    };

    public deleteMovieFromFavorite = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {
        try {
            const userId = parseInt(req.userId as string);
            const movieId = parseInt(req.params.movieId as string);

            if (!userId) {
                res.status(400).json({
                    message: "Missing userId",
                });
                return;
            }

            if (!movieId) {
                res.status(400).json({
                    message: "Missing movieId4",
                });
                return;
            }

            await UserManager.deleteMovieFromFavorite({ userId, movieId });
            res.status(200).json({
                message: "Remove movie from favorite successfully",
            });
        } catch (err) {
            console.log("Error removing movie from favorite:", err);
            res.status(500).json({
                message: "Error removing movie from favorite",
                error: err,
            });
        }
    };

    public getFavoriteMovies = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {
        try {
            const userId = parseInt(req.userId as string);

            if (!userId) {
                res.status(400).json({
                    message: "Missing userId",
                });
                return;
            }

            const favoriteMovies =
                await MovieManager.getRecommender().getFavoriteMovies({
                    userId,
                });
            res.status(200).json(favoriteMovies);
        } catch (err) {
            console.log("Error getting favorite movies:", err);
            res.status(500).json({
                message: "Error getting favorite movies",
                error: err,
            });
        }
    };

    public getRecentlyViewedMovies = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {
        try {
            const userId = parseInt(req.userId as string);

            if (!userId) {
                res.status(400).json({
                    message: "Missing userId",
                });
                return;
            }

            const recentlyViewedMovies =
                await MovieManager.getRecommender().getRecentlyViewedMovies({
                    userId,
                });
            res.status(200).json(recentlyViewedMovies);
        } catch (err) {
            console.log("Error getting recently viewed movies:", err);
            res.status(500).json({
                message: "Error getting recently viewed movies",
                error: err,
            });
        }
    };

    public deleteRecentlyViewedMovie = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {
        try {
            const userId = parseInt(req.userId as string);
            const movieId = parseInt(req.params.movieId as string);

            if (!userId) {
                res.status(400).json({
                    message: "Missing userId",
                });
                return;
            }

            if (!movieId) {
                res.status(400).json({
                    message: "Missing movieId5",
                });
                return;
            }

            await UserManager.deleteMovieFromHistory({ userId, movieId });
            res.status(200).json({
                message: "Remove movie from history successfully",
            });
        } catch (err) {
            console.log("Error removing movie from history:", err);
            res.status(500).json({
                message: "Error removing movie from history",
                error: err,
            });
        }
    };

    public addMovieToWatchlist = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {
        try {
            const userId = parseInt(req.userId as string);
            const movieId = parseInt(req.params.movieId as string);

            if (!userId) {
                res.status(400).json({
                    message: "Missing userId",
                });
                return;
            }

            if (!movieId) {
                res.status(400).json({
                    message: "Missing movieId6",
                });
                return;
            }

            await UserManager.addMovieToWatchlist({ userId, movieId });
            res.status(200).json({
                message: "Add movie to watchlist successfully",
            });
        } catch (err) {
            console.log("Error adding movie to watchlist:", err);
            res.status(500).json({
                message: "Error adding movie to watchlist",
                error: err,
            });
        }
    };

    public deleteMovieFromWatchlist = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {
        try {
            const userId = parseInt(req.userId as string);
            const movieId = parseInt(req.params.movieId as string);

            if (!userId) {
                res.status(400).json({
                    message: "Missing userId",
                });
                return;
            }

            if (!movieId) {
                res.status(400).json({
                    message: "Missing movieId7",
                });
                return;
            }

            await UserManager.deleteMovieFromWatchlist({ userId, movieId });
            res.status(200).json({
                message: "Remove movie from watchlist successfully",
            });
        } catch (err) {
            console.log("Error removing movie from watchlist:", err);
            res.status(500).json({
                message: "Error removing movie from watchlist",
                error: err,
            });
        }
    };

    public getWatchlist = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = parseInt(req.userId as string);

            if (!userId) {
                res.status(400).json({
                    message: "Missing userId",
                });
                return;
            }

            const watchlist = await MovieManager.getRecommender().getWatchlist({
                userId,
            });
            res.status(200).json(watchlist);
        } catch (err) {
            console.log("Error getting watchlist:", err);
            res.status(500).json({
                message: "Error getting watchlist",
                error: err,
            });
        }
    };

    public writeComment = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = parseInt(req.userId as string);
            const movieId = parseInt(req.params.movieId as string);
            const detail = req.body.detail;

            if (!userId) {
                res.status(400).json({
                    message: "Missing userId",
                });
                return;
            }

            if (!movieId) {
                res.status(400).json({
                    message: "Missing movieId8",
                });
                return;
            }

            if (!detail || detail === "") {
                res.status(400).json({
                    message: "Missing detail",
                });
                return;
            }

            await CommentManager.addData({ userId, movieId, detail });
            res.status(200).json({ message: "Write comment successfully" });
        } catch (err) {
            console.log("Error writing comment:", err);
            res.status(500).json({
                message: "Error writing comment",
                error: err,
            });
        }
    };

    public rateMovie = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = parseInt(req.userId as string);
            const movieId = parseInt(req.params.movieId as string);
            const rating = req.body.rating;

            // console.log("Rating movie:", userId, movieId, rating);

            if (!userId) {
                res.status(400).json({
                    message: "Missing userId",
                });
                return;
            }

            if (!movieId) {
                res.status(400).json({
                    message: "Missing movieId9",
                });
                return;
            }

            if (!rating) {
                res.status(400).json({
                    message: "Missing rating",
                });
                return;
            }

            await RatingManager.addData({ userId, movieId, rating });
            res.status(200).json({ message: "Rate movie successfully" });
        } catch (err) {
            console.log("Error rating movie:", err);
            res.status(500).json({
                message: "Error rating movie",
                error: err,
            });
        }
    };

    public buyPlan = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = parseInt(req.userId as string);
            const planId = parseInt(req.params.planId as string);
            const paymentMethod = req.body.paymentMethod;

            if (!userId) {
                res.status(400).json({
                    message: "Missing userId",
                });
                return;
            }

            if (!planId) {
                res.status(400).json({
                    message: "Missing planId",
                });
                return;
            }

            if (!paymentMethod) {
                res.status(400).json({
                    message: "Missing paymentMethod",
                });
                return;
            }

            await UserManager.purchase({ userId, planId, paymentMethod });
            res.status(200).json({ message: "Buy plan successfully" });
        } catch (err) {
            console.log("Error buying plan:", err);
            res.status(500).json({
                message: "Error buying plan",
                error: err,
            });
        }
    };

    public changePassword = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {
        try {
            const userId = parseInt(req.userId as string);
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;

            if (!userId) {
                res.status(400).json({
                    message: "Missing userId",
                });
                return;
            }

            if (!oldPassword || !newPassword) {
                res.status(400).json({
                    message: "Missing password",
                });
                return;
            }

            await UserManager.changePassword({
                userId,
                oldPassword,
                newPassword,
            });
            res.status(200).json({ message: "Change password successfully" });
        } catch (err) {
            console.log("Error changing password:", err);
            res.status(500).json({
                message: "Error changing password",
                error: err,
            });
        }
    };

    public sendAuthCode = async (req: Request, res: Response) => {
        PasswordRestorer.sendAuthCode(req, res);
    };

    public forgotPassword = async (req: Request, res: Response) => {
        PasswordRestorer.verifyAuthCode(req, res);
    };

    public getProfile = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = parseInt(req.userId as string);

            if (!userId) {
                res.status(400).json({
                    message: "Missing userId",
                });
                return;
            }

            const user = await UserManager.getDatas({
                userId,
                userRole: req.role,
            });
            // console.log("User:", user);

            const recentMovies =
                await MovieManager.getRecommender().getRecentlyViewedMovies({
                    userId,
                });
            // console.log("Recent movies:", recentMovies);

            const plan = await PlanManager.getDatas({ userId });
            // console.log("Plan:", plan);

            let recentRatings = await RatingManager.getDatas({ userId });
            // console.log("Recent ratings:", recentRatings);

            let recentComments = await CommentManager.getDatas({ userId });
            // console.log("Recent comments:", recentComments);

            const numberOfRatings = recentRatings.length;
            const numberOfComments = recentComments.length;

            recentComments = recentComments.slice(0, 10);
            recentRatings = recentRatings.slice(0, 10);

            res.status(200).json({
                user,
                plan,
                recentMovies,
                recentComments,
                recentRatings,
                numberOfComments,
                numberOfRatings,
            });
        } catch (err) {
            console.log("Error get Own profile:", err);
            res.status(500).json({
                message: "Error get Own profile",
                error: err,
            });
        }
    };

    public updateProfile = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = parseInt(req.userId as string);
            if (!userId) {
                res.status(400).json({
                    message: "Missing userId",
                });
                return;
            }

            // TODO: verify input

            const oldInfo = await UserManager.getDatas({ userId });

            const firstName = req.body.firstName || oldInfo[0].first_name;
            const lastName = req.body.lastName || oldInfo[0].last_name;
            const email = req.body.email || oldInfo[0].email;

            await UserManager.updateData({
                userId,
                firstName,
                lastName,
                email,
            });

            res.status(200).json({ message: "Update profile successfully" });
        } catch (err) {
            console.log("Error Updating profile:", err);
            res.status(500).json({
                message: "Error Updating profile",
                error: err,
            });
        }
    };
}

export default new UserController();

export { UserController };
