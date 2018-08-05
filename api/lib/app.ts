import * as bodyParser from "body-parser";
import * as express from "express";
import * as mongoose from "mongoose";
import {Routes} from "./routes/routes";

const env = process.env.NODE_ENV || 'development';
const config = require('../environment')[env];

class App {

    public app: express.Application;
    public routes: Routes = new Routes();

    constructor() {
        this.app = express();
        this.mongoSetup();
        this.config();
        this.routes.routes(this.app);
    }

    private mongoSetup(): void {
        const mongoUrl = "mongodb://" +
            config.database.host +
            ":" + config.database.port +
            "/" + config.database.db +
            "?authSource=admin";

        const mongooseConfig = {
            user: config.database.user,
            pass: config.database.password,
            dbName: config.database.db,
            useNewUrlParser: true
        };

        mongoose.Promise = global.Promise;
        mongoose.connect(mongoUrl, mongooseConfig).then(
            () => {
                console.log("Connected to DB");
            },
            error => {
                console.log(error);
            }
        );
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
    }

}

export default new App().app;
