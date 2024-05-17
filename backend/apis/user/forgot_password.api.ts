import { Router } from "express";
import { API } from "../../interfaces/interfaces";
import { ForgotPasswordController } from "../../controllers/controllers";

class ForgotPasswordAPI implements API {
    public path = "/forgot";
    public router = Router();
    public controller: ForgotPasswordController = new ForgotPasswordController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes = async () => {
        this.router.get(
            this.path,
            this.controller.sendAuthCode
        );
        this.router.post(
            this.path,
            this.controller.verifyAuthCode
        );
    };
}

export default ForgotPasswordAPI;
