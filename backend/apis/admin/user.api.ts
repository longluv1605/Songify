import { Router } from "express";
import { API } from "../../interfaces/interfaces";
import { AdminUserController } from "../../controllers/controllers";
import authenticateToken from "../../middlewares/authenticate";


class AdminUserAPI implements API {
    public path = "/admin/user";
    public router = Router();
    public controller: AdminUserController = new AdminUserController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes = async () => {
        this.router.get(this.path, authenticateToken, this.controller.getUserData);
        this.router.put(this.path, authenticateToken, this.controller.changeUserStatus);
        this.router.delete(this.path, authenticateToken, this.controller.deleteUser);
    };
}

export default AdminUserAPI;
