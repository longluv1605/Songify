import { Router } from "express";
import { API } from "../interfaces/interfaces";
import { HomeController } from "../controllers/controllers";
import { authenticateToken } from "../middlewares/authenticate";

class HomeAPI implements API {
    public path = "/";
    public router = Router();
    public controller: HomeController = new HomeController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes = async () => {
        this.router.get(this.path, authenticateToken, this.controller.getHomeData);
    };
}

export default HomeAPI;
