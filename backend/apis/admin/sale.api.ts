import { Router } from "express";
import { API } from "../../interfaces/interfaces";
import { AdminSaleController } from "../../controllers/controllers";
import authenticateToken from "../../middlewares/authenticate";

class AdminSaleAPI implements API {
    public path = "/admin/sale";
    public router = Router();
    public controller: AdminSaleController = new AdminSaleController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes = async () => {
        this.router.get(
            this.path,
            authenticateToken,
            this.controller.getSaleData
        );
    };
}

export default AdminSaleAPI;
