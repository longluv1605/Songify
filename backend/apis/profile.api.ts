import { Router } from "express";
import { API } from "../interfaces/interfaces";
import { ProfileController } from "../controllers/controllers";

class ProfileAPI implements API {
    public path = "/profile";
    public router = Router();
    public controller: ProfileController = new ProfileController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.controller.getProfileData);
    }
}

export default ProfileAPI;