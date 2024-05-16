import { Router } from "express";
import { API } from "../../interfaces/interfaces";
import { RatingController } from "../../controllers/controllers";
import authenticateToken from "../../middlewares/authenticate";

class RatingAPI implements API {
    public path = "/rating";
    public router = Router();
    public controller: RatingController = new RatingController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes = async () => {
        this.router.post(
            this.path,
            authenticateToken,
            this.controller.postRating
        );
    };
}

export default RatingAPI;
