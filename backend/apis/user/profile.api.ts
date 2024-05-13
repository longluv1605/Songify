import { Router } from "express";
import { API } from "../../interfaces/interfaces";
import { ProfileController } from "../../controllers/controllers";
import authenticateToken from "../../middlewares/authenticate";

class ProfileAPI implements API {
    public path = "/profile";
    public router = Router();
    public controller: ProfileController = new ProfileController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes = async () => {
        //TODO: nhắc fe phải luôn gửi token trong localStorage vào headers.Authorization khi gửi cùng các request yêu cầu đăng nhập mới thực hiện được (đăng xuất, xem profile...)
        this.router.get(
            this.path,
            authenticateToken,
            this.controller.getProfileData
        );
        this.router.put(
            this.path,
            authenticateToken,
            this.controller.changeUserInfo
        );
    };
}

export default ProfileAPI;
