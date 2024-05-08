import { Router } from "express";
import { API } from "../interfaces/interfaces";
import { FilterController } from "../controllers/controllers";

class FilterAPI implements API {
    public path = "/movies";
    public router = Router();
    public controller: FilterController = new FilterController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.controller.getFilteredMovies);
    }
}

export default FilterAPI;
