import { Router } from "express";
import API from "interfaces/api.interface";
import UserController from "../controllers/user.controller";


class SignInAPI implements API{
    public path = "/signin";
    public router = Router();
    constructor(){
        this.initializeRoutes();
    }
    private initializeRoutes(){
        this.router.post(this.path, UserController.signIn);
    }
}

export default new SignInAPI();