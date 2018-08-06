import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch'


class JsonService {

    constructor() {
        this.auth = {
            token : ""
        };
    }

    setCredentials(auth) {
        this.auth = auth;
    }

    parseJson(response) {
        return response.json();
    }

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            const error    = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }

    fetchJson(url) {
        const token = this.auth.token;
        return fetch(url, {
            method  : 'GET',
            headers : {
                'X-Auth-Token' : token,
                'Content-Type' : 'application/json'
            }
        }).then(this.checkStatus)
            .then(this.parseJson)
            .catch(function (ex) {
                console.error('Failed parsing JSON from ' + url, ex);
            });
    }

    postJson(url, object, raiseException = false) {
        const token = this.auth.token;
        let promise = fetch(url, {
            method  : 'POST',
            headers : {
                'X-Auth-Token' : token,
                'Content-Type' : 'application/json'
            },
            body    : JSON.stringify(object)
        });

        return promise
            .then((response) => {
                console.log("json posted to " + url);
                return response;
            })
            .then(this.checkStatus)
            .then(this.parseJson)
            .catch((error) => {
                console.log("error posting json to " + url);
                if (raiseException) {
                    throw new Error(error);
                }
            });
    }
}

export default JsonService;