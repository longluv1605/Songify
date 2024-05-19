import { Router } from "express";
import API from "interfaces/api.interface";
import UserController from "../controllers/user.controller";


class SignUpAPI implements API{
    public path = "/signup";
    public router = Router();
    constructor(){
        this.initializeRoutes();
    }
    private initializeRoutes(){
        this.router.post(this.path, UserController.signUp);
    }
}

export default new SignUpAPI();