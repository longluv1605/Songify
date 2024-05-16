import { Router } from "express";
import { API } from "../../interfaces/interfaces";
import { AdminProfileController } from "../../controllers/controllers";
import authenticateToken from "../../middlewares/authenticate";

class AdminProfileAPI implements API {
    public path = "/admin/profile";
    public router = Router();
    public controller: AdminProfileController = new AdminProfileController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes = async () => {
        this.router.get(
            this.path,
            authenticateToken,
            this.controller.getAdminData
        );
        this.router.put(
            this.path,
            authenticateToken,
            this.controller.updateAdminData
        );
        this.router.post(
            this.path,
            authenticateToken,
            this.controller.changePassword
        );
    };
}

export default AdminProfileAPI;
