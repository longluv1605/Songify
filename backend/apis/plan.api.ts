import { Router } from "express";
import { API } from "../interfaces/interfaces";
import { PlanController } from "../controllers/controllers";

class PlanAPI implements API {
    public path = "/plans";
    public router = Router();
    public controller: PlanController = new PlanController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes = async () => {
        this.router.get(this.path, this.controller.getPlansData);
    };
}

export default PlanAPI;
