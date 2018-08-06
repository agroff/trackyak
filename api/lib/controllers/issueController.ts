import * as mongoose from 'mongoose';
import { IssueSchema } from '../models/issue';
import { Request, Response } from 'express';

const Issue = mongoose.model('Issue', IssueSchema);

export class IssueController {

    public getIssues(request: Request, response: Response){
        Issue.find({projectId : request.params.projectId}, function(error, issues){
            if (error) {
                response.send(error);
                return;
            }
            response.json(issues);
        });
    }

    public addNewIssue(request: Request, response: Response) {
        let object = request.body;

        delete object.__v;

        const match = {id: object.id, projectId:object.projectId};
        Issue.update(match, object, {upsert: true}, function (error) {
            if (error) {
                response.send(error);
            }
            else {
                response.json(object);
            }
        });
    }
}