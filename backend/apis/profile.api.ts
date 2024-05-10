import { Router } from "express";
import { API } from "../interfaces/interfaces";
import { ProfileController } from "../controllers/controllers";
import { authenticateToken } from "../middlewares/authenticate";

class ProfileAPI implements API {
    public path = "/profile";
    public router = Router();
    public controller: ProfileController = new ProfileController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes = async () => {
        this.router.get(this.path, authenticateToken, this.controller.getProfileData);
        this.router.put(this.path, authenticateToken,  this.controller.changeUserInfo);
    };
}

export default ProfileAPI;
