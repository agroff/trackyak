import * as mongoose from 'mongoose';
import { IssueSchema } from '../models/issue';
import { Request, Response } from 'express';

const Issue = mongoose.model('Issue', IssueSchema);

export class IssueController {

    public addNewIssue(request: Request, response: Response) {
        let newContact = new Issue(request.body);

        newContact.save((error, contact) => {
            if (error) {
                response.send(error);
            }
            response.json(contact);
        });
    }
}