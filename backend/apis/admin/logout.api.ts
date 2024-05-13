import { Router } from "express";
import { API } from "../../interfaces/interfaces";
import { LogoutController } from "../../controllers/controllers";
import authenticateToken from "../../middlewares/authenticate";

class AdminLogoutAPI implements API {
    public path = "/admin/logout";
    public router = Router();
    public controller: LogoutController = new LogoutController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes = async () => {
        this.router.get(this.path, authenticateToken, this.controller.logout);
    };
}

export default AdminLogoutAPI;
