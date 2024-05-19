import { Router } from "express";
import API from "interfaces/api.interface";
import UserController from "../controllers/user.controller";
import authenticateToken from "../middlewares/authenticate";

class PasswordAPI implements API{
    public path = "/password";
    public router = Router();
    constructor(){
        this.initializeRoutes();
    }
    private initializeRoutes(){
        this.router.post(this.path + '/change', authenticateToken, UserController.changePassword);
        this.router.get(this.path + '/forgot/send_code', UserController.sendAuthCode);
        this.router.post(this.path + '/forgot/verify_code', UserController.forgotPassword);
    }
}

export default new PasswordAPI(); 