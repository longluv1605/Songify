import { Router } from "express";
import { API } from "../../interfaces/interfaces";
import { AdminLoginController } from "../../controllers/controllers";

class AdminLoginAPI implements API {
    public path = "/admin/login";
    public router = Router();
    public controller: AdminLoginController = new AdminLoginController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes = async () => {
        this.router.post(this.path, this.controller.postLoginData);
    };
}

export default AdminLoginAPI;
