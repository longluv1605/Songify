import { Router } from "express";
import { API } from "../interfaces/interfaces";
import { FilterController } from "../controllers/controllers";
import { authenticateToken } from "../middlewares/authenticate";

class FilterAPI implements API {
    public path = "/movies";
    public router = Router();
    public controller: FilterController = new FilterController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, authenticateToken, this.controller.getFilteredMovies);
    }
}

export default FilterAPI;
