import ApiService from '../api/ApiService';
import Cacheable from '../api/Cacheable';

class ProjectService extends Cacheable {

    constructor(apiService = false) {
        super();

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
        return this.cacheable('projects', this.apiService.getProjects());
    }

    getProject(projectId){
        return this.getProjects().then((projects) => {
            let matchedProject = {};
            projects.forEach((project) => {
                if(project._id === projectId){
                    matchedProject = project;
                }
            });

            return matchedProject;
        });
    }
}


export default ProjectService;