import { Response } from 'express';
import { AuthenticatedRequest } from '../interfaces/authenticatedRequest'

class LogoutController {

    public static blacklist: string[] = []; // dungf cách này khi restart lại server sẽ mất 

    public logout = async(req: AuthenticatedRequest, res: Response) => {
        try {
            // TODO: nhắc fe Xóa JWT từ client-side (ví dụ: xóa token từ local storage)
            const token: string = req.headers['authorization']?.split(' ')[1] || "";
            // console.log(token + "\n Blist:" + "\n");
            LogoutController.blacklist.push(token);
            // for (const token of LogoutController.blacklist) {
            //     console.log(token + "\n");
            // }
            res.status(200).json({ message: "Logged out successfully" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default LogoutController;
