import { Router } from "express";
import API from "interfaces/api.interface";
import AdminController from "../../controllers/admin.controller";
import authenticateToken from "../../middlewares/authenticate";

class SaleManageAPI implements API {
    public path = "/admin/sale_manage";
    public router = Router();
    
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(this.path + '/get', authenticateToken, AdminController.getSales);
    }
}

export default new SaleManageAPI();
