import Database from "../database/database";
import { Request, Response } from "express";

class ProfileController {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public getProfileData = async (req: Request, res: Response) => {
        try {
            const user_id = req.body.user_id;
            const sql: string = `ádasadsa`;

            const profile = "";

            res.status(200).json({ profile });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
}

export default ProfileController;
