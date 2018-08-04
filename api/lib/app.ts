import * as bodyParser from "body-parser";
import * as express from "express";
import * as mongoose from "mongoose";
import {Routes} from "./routes/routes";

class App {

    public app: express.Application;
    public routes: Routes = new Routes();
    public mongoUrl: string = 'mongodb://167.99.165.96/track_yak_db';

    constructor() {
        this.app = express();
        this.mongoSetup();
        this.config();
        this.routes.routes(this.app);
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
    }

}

export default new App().app;
