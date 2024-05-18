import { Router } from "express";
import API from "interfaces/api.interface";
import UserController from "../controllers/user.controller";
import authenticateToken from "../middlewares/authenticate";

class MovieAPI implements API {
    public path = "/movie/:movieId";
    public router = Router();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(
            this.path,
            authenticateToken,
            UserController.getMovieData
        );
        this.router.post(
            this.path + "/watch",
            authenticateToken,
            UserController.watchMovie
        );
        this.router.post(this.path + "/rate", authenticateToken, UserController.rateMovie);
    }
}

export default new MovieAPI();
