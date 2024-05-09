import { Router } from "express";
import { API } from "../interfaces/interfaces";
import { CommentController } from "../controllers/controllers";

class CommentAPI implements API {
    public path = "/comment";
    public router = Router();
    public controller: CommentController = new CommentController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes = async () => {
        this.router.get(this.path, this.controller.getComments);
        this.router.post(this.path, this.controller.postComment);
    };
}

export default CommentAPI;
