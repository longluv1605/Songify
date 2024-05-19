import { Router } from "express";
import API from "interfaces/api.interface";
import UserController from "../controllers/user.controller";
import authenticateToken from "../middlewares/authenticate";


class SignOutAPI implements API{
    public path = "/signout";
    public router = Router();
    constructor(){
        this.initializeRoutes();
    }
    private initializeRoutes(){
        this.router.post(this.path, authenticateToken, UserController.signOut);
    }
}

export default new SignOutAPI();