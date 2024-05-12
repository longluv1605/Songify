import { Router } from "express";
import { API } from "../interfaces/interfaces";
import { SearchController } from "../controllers/controllers";
import authenticateToken from "../middlewares/authenticate";

class SearchAPI implements API {
    public path = "/search";
    public router = Router();
    public controller: SearchController = new SearchController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes = async () => {
        this.router.get(this.path, authenticateToken, this.controller.getSearchData);
    };
}

export default SearchAPI;
