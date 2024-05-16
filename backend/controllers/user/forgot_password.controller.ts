import Database from "../../database/database";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../interfaces/authenticatedRequest";

class PlanController {
    private db: Database;
    private authCodes: { email: string, code: string }[];

    constructor() {
        this.db = new Database();
        this.authCodes = [];
    }

    public sendAuthCode = async (req: Request, res: Response) => {
        try {
            const email = req.body.email as string;
            if (email == null || email == undefined) {
                throw new Error("Email not found");
            }
            const data = await this.db.query("SELECT * FROM user WHERE email = ?", [email]);
            if (data.length === 0) {
                throw new Error("User not found");
            }

            const code = email; // temporary solution
            this.authCodes = this.authCodes.filter((code) => code.email !== email);
            this.authCodes.push({ email, code });

            res.status(200).json({ message: "Auth code sent" });
        } catch (err) {
            res.status(500).json({ err });
        }
    }

    public verifyAuthCode = async (req: Request, res: Response) => {
        try {
            const authCode = req.body.authCode as string;
            const newPassword = req.body.newPassword as string;

            if (authCode == null || authCode == undefined) {
                throw new Error("Auth code not found");
            }

            if (newPassword == null || newPassword == undefined) {
                throw new Error("New password not found");
            }

            const code = this.authCodes.find((code) => code.code === authCode);
            if (code == null || code == undefined) {
                throw new Error("Invalid auth code");
            }

            const email = code.email;
            await this.db.query("UPDATE user SET password = ? WHERE email = ?", [newPassword, email]);
            this.authCodes = this.authCodes.filter((code) => code.code !== authCode);


            res.status(200).json({ message: "Password updated" });
        } catch (err) {
            res.status(500).json({ err });
        }
    }
}

export default PlanController;
