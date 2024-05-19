import { Router } from "express";
import API from "interfaces/api.interface";
import AdminController from "../../controllers/admin.controller";
import authenticateToken from "../../middlewares/authenticate";

class UserManageAPI implements API {
    public path = "/admin/user_manage";
    public router = Router();
    
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(this.path + '/get', authenticateToken, AdminController.getUsers);
        this.router.put(this.path + '/change_status/:userId', authenticateToken, AdminController.changeUserStatus);
        this.router.delete(this.path + '/delete/:userId', authenticateToken, AdminController.deleteUser);
        this.router.put(this.path + '/change_plan/:userId', authenticateToken, AdminController.changeUserPlan);
    }
}

export default new UserManageAPI();
