import { Router } from "express";
import { API } from "../interfaces/interfaces";
import { LoginController } from "../controllers/controllers";

class LoginAPI implements API {
    public path = "/login";
    public router = Router();
    public controller: LoginController = new LoginController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes = async () => {
        this.router.post(this.path, this.controller.postLoginData);
    };
}

export default LoginAPI;
