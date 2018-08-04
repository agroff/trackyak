import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch'

/**
 * The API Service provides an asynchronous interface to the API. All application network requests
 * should come through here. It should never modify the data - any modification of API dats should
 * be handled by separate services.
 */
class ApiService {

    constructor() {
        this.baseUrl = 'http://localhost:3000/api/';
    }

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

    getIssues(projectId) {
        const url = this.baseUrl + 'issues.json';

        return this.fetchJson(url);
    }
}

export default ApiService;