import {Request, Response} from "express";
import {IssueController} from "../controllers/issueController";
import {UserController} from "../controllers/userController";
import {ProjectController} from "../controllers/projectController";
import { check } from 'express-validator/check';
import {AuthService} from "../services/authService";


export class Routes {
    public issueController = new IssueController();
    public userController = new UserController();
    public projectController = new ProjectController();


    public routes(app): void {

        const publicRoutes = [
            '/',
            '/user',
            '/authenticate'
        ];

        //allow cross origin middleware
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Auth-Token, X-Requested-With, Content-Type, Accept");
            next();
        });

        //route authentication middle ware
        app.use(function (req, res, next) {

            if (req.method === 'OPTIONS') {
                next();
                return;
            }

            if(publicRoutes.indexOf(req.url) !== -1){
                next();
                return;
            }

            const token = req.headers['x-auth-token'];
            const authService = new AuthService();

            const id = authService.tokenToUserId(token);

            if(id === 0){
                res.status(401).json({
                    "message" : "Access Denied"
                });
                return;
            }

            req.headers.userId = id;
            next();
        });

        //public routes
        app.route("/").get((req: Request, res: Response) => {
            res.status(200).send({
                message: "Hi! This is the API but there's nothing at this endpoint.",
            });
        });

        app.route("/user").post([
            check('name').isLength({ min: 2 }),
            check('email').isEmail(),
            check('password').isLength({ min: 6 }),
        ], this.userController.addNewUser);

        app.route("/authenticate").post([
            check('email').isEmail(),
        ], this.userController.authenticateUser);

        //authenticated routes
        app.route("/issue").post(this.issueController.addNewIssue);
        app.route("/issues/:projectId").get(this.issueController.getIssues);

        app.route("/project").post(this.projectController.createProject);
        app.route("/projects").get(this.projectController.getProjects);
    }
}
