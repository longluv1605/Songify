import { Router } from "express";
import API from "interfaces/api.interface";
import authenticateToken from "../middlewares/authenticate";
import UserController from "../controllers/user.controller";
import AdminController from "../controllers/admin.controller";

class PlanAPI implements API {
    public path = "/plans";
    public router = Router();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(
            this.path,
            authenticateToken,
            UserController.getPlanData
        );
        this.router.post(
            this.path + "/buy/:planId",
            authenticateToken,
            UserController.buyPlan
        );

        this.router.post(
            "/admin" + this.path + "/add",
            authenticateToken,
            AdminController.addPlan
        );

        this.router.put(
            "/admin" + this.path + "/update/:planId",
            authenticateToken,
            AdminController.updatePlan
        );

        this.router.delete(
            "/admin" + this.path + "/delete/:planId",
            authenticateToken,
            AdminController.deletePlan
        );
    }
}

export default new PlanAPI();
