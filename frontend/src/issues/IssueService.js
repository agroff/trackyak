import ApiService from '../api/ApiService'

class IssueService {
    constructor(apiService = false) {

        if (apiService === false) {
            apiService = new ApiService();
        }

        this.apiService = apiService;

        this.timeout = 0;
    }

    setCredentials(auth){
        this.apiService.setCredentials(auth);
    }

    findIssue(issueId, issues){
        let issue;
        issues.forEach(function(thisIssue){
            if(String(thisIssue.id) === String(issueId)){
                issue = thisIssue;
            }
        });

        if(!issue){
            throw new Error("Could not find issue ID " + issueId);
        }

        return issue;
    }

    postIssueDelayed(issue, timeToWait){
        const doPost = (issue) => {
            this.apiService.postIssue(issue);
        };

        if(this.timeout){
            clearInterval(this.timeout);
        }

        this.timeout = setTimeout(function(){
            doPost(issue);
            this.timeout = 0;
        }, timeToWait);
    }

    getIssues(projectId) {
        return this.apiService.getIssues(projectId);
    }

    getNewIssue(issueFields) {
        let issue = {};

        issue.id = null;

        issueFields.forEach((issueField) => {
            const key  = issueField.key;
            issue[key] = issueField.default || "";
        });

        return issue;
    }

    getIssueFields() {
        return new Promise(resolve => {
            resolve([
                {
                    "title"   : "Title",
                    "key"     : "title",
                    "type"    : "text",
                    "size"    : 7,
                    "enabled" : true,
                },
                {
                    "title"   : "Status",
                    "key"     : "status",
                    "type"    : "select",
                    "default" : "New",
                    "size"    : 3,
                    "values"  : [
                        "New",
                        "TODO",
                        "Couldn't Reproduce",
                        "In Progress",
                        "Requires Discussion",
                        "Requires Asset",
                        "Deleted",
                        "Done",
                    ],
                    "enabled" : true,
                },
                {
                    "title"   : "Priority",
                    "key"     : "priority",
                    "type"    : "select",
                    "values"  : [
                        1, 2, 3, 4, 5,
                        6, 7, 8, 9, 10
                    ],
                    "size"    : 2,
                    "enabled" : true,
                },
                {
                    "title"   : "Description",
                    "key"     : "description",
                    "type"    : "text",
                    "size"    : 10,
                    "enabled" : true,
                }
            ]);
        });
    }
}

export default IssueService;