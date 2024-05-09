import { Router } from "express";
import { API } from "../interfaces/interfaces";
import { PasswordController } from "../controllers/controllers";

class PasswordAPI implements API {
    public path = "/password";
    public router = Router();
    public controller: PasswordController = new PasswordController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes = async () => {
        this.router.put(this.path, this.controller.changePassword);
    };
}

export default PasswordAPI;