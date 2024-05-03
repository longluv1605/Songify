import { Router } from "express";
import { API } from "../interfaces/interfaces";
import { MovieController } from "../controllers/controllers";

class MovieAPI implements API {
    public path = '/movie';
    public router = Router();
    public controller: MovieController = new MovieController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.controller.getMovieData);
    }
}

export default MovieAPI;