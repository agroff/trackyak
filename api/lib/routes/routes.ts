import {Request, Response} from "express";
import {IssueController} from "../controllers/issueController";

export class Routes {
    public issueController = new IssueController();

    public routes(app): void {

        app.route("/").get((req: Request, res: Response) => {
            res.status(200).send({
                message: "Request Success",
            });
        });

        app.route("/issues/:projectId").get((request: Request, response: Response) => {
            response.status(200).send({
                message: "Getting issues..."
            });
        }).post(this.issueController.addNewIssue);
    }
}
