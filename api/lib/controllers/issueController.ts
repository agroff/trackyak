import * as mongoose from 'mongoose';
import { IssueSchema } from '../models/issue';
import { Request, Response } from 'express';

const Issue = mongoose.model('Issue', IssueSchema);

export class IssueController {

    public getIssues(request: Request, response: Response){
        Issue.find({}, function(error, issues){
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

        // Issue.find({id: object.id}).exec(function(error){
        //     if (error) {
        //         response.send(error);
        //     }
        //     response.json(object);
        // });
        //
        // return;
        Issue.update({id: object.id}, object, {upsert: true}, function (error) {
            if (error) {
                response.send(error);
            }
            else {
                response.json(object);
            }
        });

        console.log(object);
        // newContact.save((error, contact) => {
        //
        // });
    }
}