import { Router } from "express";
import { API } from "../interfaces/interfaces";
import { RatingController } from "../controllers/controllers";

class RatingAPI implements API {
    public path = "/rating";
    public router = Router();
    public controller: RatingController = new RatingController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes = async () => {
        this.router.post(this.path, this.controller.postRating);
    };
}

export default RatingAPI;
