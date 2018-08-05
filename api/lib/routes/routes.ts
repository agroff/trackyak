import {Request, Response} from "express";
import {IssueController} from "../controllers/issueController";

export class Routes {
    public issueController = new IssueController();

    public routes(app): void {

        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        app.route("/").get((req: Request, res: Response) => {
            res.status(200).send({
                message: "Request Success",
            });
        });

        //app.route("/issues/:projectId").get((request: Request, response: Response) => {
        // app.route("/issues/").get((request: Request, response: Response) => {
        //     response.status(200).send({
        //         message: "Getting issues..."
        //     });
        // });

        app.route("/issue").post(this.issueController.addNewIssue);
        app.route("/issues").get(this.issueController.getIssues);


    }
}
