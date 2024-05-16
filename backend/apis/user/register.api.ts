import { Router } from "express";
import { API } from "../../interfaces/interfaces";
import { RegisterController } from "../../controllers/controllers";

class RegisterAPI implements API {
    public path = "/register";
    public router = Router();
    public controller: RegisterController = new RegisterController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes = async () => {
        this.router.post(this.path, this.controller.postRegisterData);
    };
}

export default RegisterAPI;
