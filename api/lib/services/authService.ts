const bcrypt = require('bcrypt');
import has = Reflect.has;

const uuidv4 = require('uuid/v4.js');
const env = process.env.NODE_ENV || 'development';
const crypto = require("crypto");
const config = require('../../environment')[env];

export class AuthService {
    generateSalt() {
        return uuidv4();
    }

    hashPassword(plainPassword, salt) {
        const saltedPlainText = plainPassword + '.' + salt;

        return new Promise(function (resolve, reject) {
            bcrypt.hash(saltedPlainText, 12, (error, hash) => {

                if (error) {
                    reject(error);
                }
                else {
                    resolve(hash);
                }
            });
        });
    }

    comparePassword(testPassword, salt, existingHash) {
        const saltedPlainText = testPassword + '.' + salt;

        return new Promise(function (resolve, reject) {
            bcrypt.compare(saltedPlainText, existingHash, (error, matches) => {

                if (matches) {
                    resolve(true);
                    return;
                }
                reject("passwords do not match");
            });
        });
    }

    base64Encode(string) {
        return Buffer.from(string).toString('base64');
    }

    base64Decode(string) {
        return Buffer.from(string, 'base64').toString('ascii');
    }

    getSignedData(data){
        return crypto.createHmac('sha256', config.secret).update(data).digest('hex');
    }

    getJwtToken(userId) {
        const header = {
            "typ": "JWT",
            "alg": "HS256"
        };
        const claim = {
            "userId": userId,
            "iat": new Date().getTime()
        };

        const headerBase64 = this.base64Encode(JSON.stringify(header));
        const claimBase64 = this.base64Encode(JSON.stringify(claim));

        const data = headerBase64 + '.' + claimBase64;
        const signature = this.getSignedData(data);

        return data + '.' + signature;
    }

    tokenIsValid(headerAndClaim, signature) {
        const trustedSignature = this.getSignedData(headerAndClaim);

        if(signature === trustedSignature){
            return true;
        }

    }

    tokenToUserId(token: String) {
        const pieces = token.split('.');

        //const expireTime = new Date().getTime();

        let header;
        let claim;
        try{
            header = JSON.parse(this.base64Decode(pieces[0]));
            claim = JSON.parse(this.base64Decode(pieces[1]));
        }
        catch (e) {
            return 0;
        }

        const signature = pieces[2];

        if(header.typ !== 'JWT'){
            return 0;
        }
        if(header.alg !== 'HS256'){
            return 0;
        }
        // if(claim.iat < ){
        //     return 0;
        // }

        if (this.tokenIsValid(pieces[0] + '.' + pieces[1], signature)) {
            return claim.userId;
        }

        return 0;
    }

    userToCredentials(user) {
        const token = this.getJwtToken(user._id);

        return {
            id: user._id,
            name: user.name,
            email: user.email,
            token: token
        }
    }

    addHashesToUser() {

    }
}