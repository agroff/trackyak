import ApiService from '../ApiService'

class IssueDataService {
    constructor(apiService = false) {

        if (apiService === false) {
            apiService = new ApiService();
        }

        this.apiService = apiService;
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

export default IssueDataService;