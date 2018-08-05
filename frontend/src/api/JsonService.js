import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch'


class JsonService {
    fetchJson(url) {
        let checkStatus = function (response) {
            if (response.status >= 200 && response.status < 300) {
                return response;
            } else {
                const error    = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        };

        let parseJson = function (response) {
            return response.json()
        };


        return fetch(url)
            .then(checkStatus)
            .then(parseJson)
            .catch(function (ex) {
                console.error('Failed parsing JSON from ' + url, ex);
            });
    }

    postJson(url, object, raiseException = false) {
        let promise = fetch(url, {
            method  : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body    : JSON.stringify(object)
        });

        return promise.then(() => {
            console.log("json posted to " + url);
        }).catch((error) => {
            console.log("error posting json to " + url);
            if (raiseException) {
                throw new Error(error);
            }
        });
    }
}

export default JsonService;