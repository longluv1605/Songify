import { Router } from "express";
import API from "interfaces/api.interface";
import UserController from "../controllers/user.controller";
import authenticateToken from "../middlewares/authenticate";

class ProfileAPI implements API {
    public path = "/profile";
    public router = Router();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(
            this.path,
            authenticateToken,
            UserController.getProfile
        );
        this.router.put(
            this.path,
            authenticateToken,
            UserController.updateProfile
        );
    }
}

export default new ProfileAPI();
