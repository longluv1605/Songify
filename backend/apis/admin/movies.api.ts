import { Router } from "express";
import { API } from "../../interfaces/interfaces";
import { AdminMovieController } from "../../controllers/controllers";
import authenticateToken from "../../middlewares/authenticate";


class AdminMovieAPI implements API {
    public path = "/admin/movie";
    public router = Router();
    public controller: AdminMovieController = new AdminMovieController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes = async () => {
        this.router.get(this.path, authenticateToken, this.controller.getMovieData);
        this.router.put(this.path, authenticateToken, this.controller.updateMovieData);
        this.router.post(this.path, authenticateToken, this.controller.addMovie);
        this.router.delete(this.path, authenticateToken, this.controller.deleteMovie);
    };
}

export default AdminMovieAPI;
