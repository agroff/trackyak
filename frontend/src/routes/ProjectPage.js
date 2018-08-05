import React, {Component} from 'react';
import IssueService from "../issues/IssueService";
import IssueList from "../issues/IssueList";

class ProjectPage extends Component {

    componentDidMount() {

        this.issueData.getIssues().then(issues => {
            this.setState({issues : issues});
        });

        this.issueData.getIssueFields().then(issueFields => {
            this.setState({issueFields});
        });
    }

    constructor(props) {
        super(props);

        this.issueData = new IssueService();

        this.state = {
            issues      : [
                {
                    id          : 1,
                    title       : "Loading issues...",
                    status      : "TODO",
                    description : "plz b payshint",
                }
            ],
            issueFields : [
                {
                    "title"   : "Title",
                    "key"     : "title",
                    "type"    : "text",
                    "size"    : 5,
                    "enabled" : true,
                }
            ]
        };
    }

    updateData(value, id, fieldName) {
        const issues = this.state.issues.slice();
        let newId    = this.state.issues.length + 1;

        if (id !== null) {
            issues[id - 1][fieldName] = value;
            newId                     = id;
        }
        else {
            const fields = this.state.issueFields;
            let newIssue = this.issueData.getNewIssue(fields);

            newIssue.id         = newId;
            newIssue[fieldName] = value;

            issues.push(newIssue);
        }

        this.setState({issues : issues});

        let issue = this.issueData.findIssue(newId, issues);
        this.issueData.postIssueDelayed(issue, 3000);
    }

    render() {

        return (
            <div>
                <h1>
                    Project Page
                </h1>
                <IssueList issues={this.state.issues}
                           issueFields={this.state.issueFields}
                           updateData={(event, id, field) => this.updateData(event, id, field)}/>

            </div>
        );
    }
}

export default ProjectPage;