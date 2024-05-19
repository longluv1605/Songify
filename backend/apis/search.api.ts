import { Router } from "express";
import API from "interfaces/api.interface";
import UserController from "../controllers/user.controller";
import authenticateToken from "../middlewares/authenticate";

class SearchAPI implements API {
    public path = "/search/:searchQuery";
    public router = Router();
    
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(
            this.path,
            authenticateToken,
            UserController.searchMovie
        );
    }
}

export default new SearchAPI();
