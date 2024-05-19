import { Router } from "express";
import API from "interfaces/api.interface";
import AdminController from "../../controllers/admin.controller";
import authenticateToken from "../../middlewares/authenticate";

class MovieManageAPI implements API {
    public path = "/admin/movie_manage";
    public router = Router();
    
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(this.path + '/get', authenticateToken, AdminController.getMovies);
        this.router.post(this.path + '/add', authenticateToken, AdminController.addMovie);
        this.router.put(this.path + '/change_status/:movieId', authenticateToken, AdminController.changeMovieStatus);
        this.router.delete(this.path + '/delete/:movieId', authenticateToken, AdminController.deleteMovie);
        this.router.put(this.path + '/change_info/:movieId', authenticateToken, AdminController.changeMovieInfo);
    }
}

export default new MovieManageAPI();
