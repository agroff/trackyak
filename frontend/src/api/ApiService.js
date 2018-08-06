import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch'
import JsonService from "./JsonService";

/**
 * The API Service provides an asynchronous interface to the API. All application network requests
 * should come through here. It should never modify the data - any modification of API dats should
 * be handled by separate services.
 */
class ApiService extends JsonService{

    constructor() {
        super();

        //this.baseUrl = 'http://localhost:3001/';
        this.baseUrl = 'https://api.trackyak.com/';
    }

    authenticateUser(user, raiseException = false){
        const url =  this.baseUrl + 'authenticate';

        return this.postJson(url, user, raiseException);
    }

    postUser(user, raiseException = false){
        const url =  this.baseUrl + 'user';

        return this.postJson(url, user, raiseException);
    }

    postProject(name, id){
        const url =  this.baseUrl + 'project';

        return this.postJson(url, {name : name, id : id});
    }

    getProjects(){
        const url =  this.baseUrl + 'projects';

        return this.fetchJson(url);
    }

    /**
     * Fetches all the issues for a given project
     * @param projectId
     * @returns {*}
     */
    getIssues(projectId) {
        const url = this.baseUrl + 'issues/'+projectId;

        return this.fetchJson(url);
    }

    /**
     * Updates an existing issue. Creates an issue if it doesn't exist.
     *
     * @param issue
     * @returns {*}
     */
    postIssue(issue) {
        const url =  this.baseUrl + 'issue';

        return this.postJson(url, issue);
    }
}

export default ApiService;