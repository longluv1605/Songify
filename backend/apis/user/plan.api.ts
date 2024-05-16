import { Router } from "express";
import { API } from "../../interfaces/interfaces";
import { PlanController } from "../../controllers/controllers";
import authenticateToken from "../../middlewares/authenticate";

class PlanAPI implements API {
    public path = "/plans";
    public router = Router();
    public controller: PlanController = new PlanController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes = async () => {
        this.router.get(
            this.path,
            authenticateToken,
            this.controller.getPlansData
        );
        this.router.post(this.path, authenticateToken, this.controller.buyPlan);
    };
}

export default PlanAPI;
