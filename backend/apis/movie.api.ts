import { Router } from "express";
import API from "interfaces/api.interface";
import UserController from "../controllers/user.controller";
import authenticateToken from "../middlewares/authenticate";

class MovieAPI implements API {
    public path = "/movies";
    public router = Router();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(
            this.path + "/:movieId",
            authenticateToken,
            UserController.getMovieData
        );
        this.router.post(
            this.path + "/watch/:movieId",
            authenticateToken,
            UserController.watchMovie
        );

        this.router.delete(
            this.path + "/history/:movieId",
            authenticateToken,
            UserController.deleteRecentlyViewedMovie
        );

        this.router.get(
            this.path + "/history",
            authenticateToken,
            UserController.getRecentlyViewedMovies
        );

        this.router.post(
            this.path + "/favorite/add/:movieId",
            authenticateToken,
            UserController.addMovieToFavorite
        );

        this.router.delete(
            this.path + "/favorite/remove/:movieId",
            authenticateToken,
            UserController.deleteMovieFromFavorite
        );

        this.router.get(
            this.path + "/favorite",
            authenticateToken,
            UserController.getFavoriteMovies
        );

        this.router.post(
            this.path + "/watchlist/:movieId",
            authenticateToken,
            UserController.addMovieToWatchlist
        );
        this.router.delete(
            this.path + "/watchlist/:movieId",
            authenticateToken,
            UserController.deleteMovieFromWatchlist
        );
        this.router.get(
            this.path + "/watchlist",
            authenticateToken,
            UserController.getWatchlist
        );

        this.router.post(
            this.path + "/rate",
            authenticateToken,
            UserController.rateMovie
        );

        this.router.post(
            this.path + "/comment/:movieId",
            authenticateToken,
            UserController.writeComment
        );
    }
}

export default new MovieAPI();
