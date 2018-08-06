import ApiService from '../api/ApiService'

class ProjectService {

    constructor(apiService = false) {

        if (apiService === false) {
            apiService = new ApiService();
        }

        this.apiService = apiService;
    }

    setCredentials(auth){
        this.apiService.setCredentials(auth);
    }

    createProject(name, id = 0){
        return this.apiService.postProject(name, id);
    }

    getProjects(){
        return this.apiService.getProjects();
    }
}


export default ProjectService;