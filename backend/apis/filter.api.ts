import { Router } from "express";
import API from "interfaces/api.interface";
import UserController from "../controllers/user.controller";
import authenticateToken from "../middlewares/authenticate";

class FilterAPI implements API {
    public path = "/filter";
    public router = Router();
    
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(
            this.path,
            authenticateToken,
            UserController.filterMovie
        );
    }
}

export default new FilterAPI();
