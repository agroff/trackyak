import * as mongoose from 'mongoose';
import User from "../models/user";
import { Request, Response } from 'express';
import { validationResult } from 'express-validator/check';


export class UserController {

    public addNewUser(request: Request, response: Response) {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(422).json({ errors: errors.array() });
        }

        const user = new User(request.body);

        user.register((error) => {
            response.status(500).json({errors: "Could not store user."});
        }, (auth) => {
            response.json(auth);
        });
    }

    public authenticateUser(request: Request, response: Response){
        const showGenericError = (actualError) => {
            console.log(actualError);
            return response.status(400).json({errors: "Could not login"});
        };

        const withUser = (error, user) => {
            if(error){
                return showGenericError(error);
            }

            user.login(request.body.password, (error, auth) => {
                if(error){
                    return showGenericError(error);
                }

                response.json(auth);
            });
        };

        User.findOne({email:request.body.email}, withUser);
    }
}