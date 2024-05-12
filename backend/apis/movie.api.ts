import { Router } from "express";
import { API } from "../interfaces/interfaces";
import { MovieController } from "../controllers/controllers";
import { authenticateToken } from "../middlewares/authenticate";

class MovieAPI implements API {
    public path = "/movie";
    public router = Router();
    public controller: MovieController = new MovieController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes = async () => {
        this.router.get(this.path, authenticateToken, this.controller.getMovieData);
        this.router.post(this.path, authenticateToken, this.controller.postHistory);
        this.router.put(this.path, authenticateToken, this.controller.updateView);
    };
}

export default MovieAPI;
