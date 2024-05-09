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

    private initializeRoutes = async () => {
        this.router.get(this.path, this.controller.getProfileData);
        this.router.put(this.path, this.controller.changeUserInfo);
    };
}

export default ProfileAPI;
