import * as mongoose from 'mongoose';
import {AuthService} from "../services/authService";

const Schema = mongoose.Schema;

let UserSchema = new Schema({

    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    hasTeam: {
        type: Boolean
    },
    created_date: {
        type: Date,
        default: Date.now
    },


});

UserSchema.methods.register = function (errorCallback, successCallback) {
    const authService = new AuthService();

    this.salt = authService.generateSalt();
    const hashPromise = authService.hashPassword(this.password, this.salt);

    const saveCallback = (error, user) => {
        if (error) {
            console.log("failed to save");
            errorCallback(error);
            return;
        }

        const authCredentials = authService.userToCredentials(user);
        successCallback(authCredentials);
    };

    hashPromise.then((hash) => {

        this.password = hash;
        this.save(saveCallback);

    }).catch((error) => {

        console.log("failed to hash");
        errorCallback(error);
        return;
    });


};

UserSchema.methods.login = function (suppliedPassword, callback) {
    let authCredentials = {};
    const authService = new AuthService();
    const hashPromise = authService.comparePassword(suppliedPassword, this.salt, this.password);

    const hashMatched = () => {
        authCredentials = authService.userToCredentials(this);
        callback(null, authCredentials)
    };

    const onError = () => {
        callback("invalid password", authCredentials);
    };

    hashPromise.then(hashMatched).catch(onError);
};

mongoose.model('User', UserSchema);
export default mongoose.model('User');
