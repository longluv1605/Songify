import express from "express";
import dotenv from "dotenv";
import { API } from "interfaces/interfaces";
import cors from "cors";

class App {
    private app: express.Application;
    private port: number | string;
    private host: string;
    constructor(apis: API[]) {
        dotenv.config();
        this.app = express();
        this.app.use(express.json()); // config for request.body
        this.app.use(express.urlencoded({ extended: true })); // config for HTML FORM data
        this.app.use(cors());

        this.port = process.env.PORT || 8080;
        this.host = process.env.HOST || "localhost";

        this.initializeRoutes(apis);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(
                `Backend is running on: http://${this.host}:${this.port}`
            );
        });
    }

    private initializeRoutes(apis: API[]) {
        apis.forEach((api) => {
            this.app.use("/api", api.router);
        });
    }
}

export default App;
