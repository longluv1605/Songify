import Database from "../../database/database";
import { Request, Response } from "express";

class PasswordRestorer {
    private static authCodes: { email: string; code: string }[] = [];

    public sendAuthCode = async (req: Request, res: Response) => {
        try {
            const email: string = req.query.email as string;
            console.log(email);
            if (!email) {
                throw new Error("Email not found");
            }
            const data = await Database.query("SELECT * FROM user WHERE email = ?", [email]);
            if (data.length === 0) {
                throw new Error("User not found");
            }

            const code = email; // temporary solution
            PasswordRestorer.authCodes = PasswordRestorer.authCodes.filter((code) => code.email !== email);
            PasswordRestorer.authCodes.push({ email, code });

            res.status(200).json({ message: "Auth code sent" });
        } catch (err) {
            console.log("Error sending authcode:", err);
            res.status(500).json({
                message: "Error sending authcode",
                error: err,
            });
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

            const code = PasswordRestorer.authCodes.find((code) => code.code === authCode);
            if (code == null || code == undefined) {
                throw new Error("Invalid auth code");
            }

            const email = code.email;
            await Database.query("UPDATE user SET password = ? WHERE email = ?", [newPassword, email]);
            PasswordRestorer.authCodes = PasswordRestorer.authCodes.filter((code) => code.code !== authCode);


            res.status(200).json({ message: "Password restored" });
        } catch (err) {
            console.log("Error restoring password:", err);
            res.status(500).json({
                message: "Error restoring password",
                error: err,
            });
        }
    }
}

export default new PasswordRestorer();
