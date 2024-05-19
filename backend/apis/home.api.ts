import { Router } from "express";
import API from "interfaces/api.interface";
import UserController from "../controllers/user.controller";
import authenticateToken from "../middlewares/authenticate";

class HomeAPI implements API {
    public path = "";
    public router = Router();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(
            this.path,
            authenticateToken,
            UserController.getHomeData
        );
    }
}

export default new HomeAPI();
