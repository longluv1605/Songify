import { Router } from "express";
import { API } from "../interfaces/interfaces";
import { SearchController } from "../controllers/controllers";

class SearchAPI implements API {
    public path = "/search";
    public router = Router();
    public controller: SearchController = new SearchController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes = async () => {
        this.router.get(this.path, this.controller.getSearchData);
    }
}

export default SearchAPI;
