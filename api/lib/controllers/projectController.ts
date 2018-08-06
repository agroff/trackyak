import Project from '../models/project'
import {Request, Response} from 'express';


export class ProjectController {

    public createProject(request: Request, response: Response) {
        let object = request.body;

        object.owner = request.headers.userId;

        let project = new Project(object);

        project.save(function (error, newProject) {
            if (error) {
                response.status(500).json({errors: "Could create project."});
            }
            response.json(newProject);
        });
    }

    public getProjects(request: Request, response: Response){
        const userId = request.headers.userId;
        Project.find({owner: userId}, function(error, projects){
            response.json(projects);
        });
    }
}