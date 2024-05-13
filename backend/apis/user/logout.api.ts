import { Router } from "express";
import { API } from "../../interfaces/interfaces";
import { LogoutController } from "../../controllers/controllers";
import authenticateToken from "../../middlewares/authenticate";

class LogoutAPI implements API {
    public path = "/logout";
    public router = Router();
    public controller: LogoutController = new LogoutController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes = async () => {
        this.router.get(this.path, authenticateToken, this.controller.logout);
    };
}

export default LogoutAPI;
