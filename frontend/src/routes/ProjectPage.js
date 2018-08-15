import React, {Component} from 'react';
import IssueService from "../issues/IssueService";
import IssueList from "../issues/IssueList";

class ProjectPage extends Component {

    constructor(props) {
        super(props);

        this.projectService = props.projectService;
        this.issueData = new IssueService();

        this.state = {
            project : {
                "name" : "project"
            },

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

    async componentDidMount() {
        const projectId = this.props.match.params.id;
        this.issueData.setCredentials(this.props.auth);

        this.issueData.getIssues(projectId).then(issues => {
            if(!issues){
                issues = [];
            }
            this.setState({issues : issues});

            //console.log(issues);
        }).catch(()=>{

        });

        this.issueData.getIssueFields().then(issueFields => {
            this.setState({issueFields});
        });

        const project = await this.projectService.getProject(projectId);

        this.setState({project});
    }

    idToIndex(id, issues){
        for(let i = 0; i < issues.length; i++){
            if(id === issues[i].id){
                return i;
            }
        }

        return null;
    }

    getNewId(issues){
        let highest = 0;
        issues.forEach((issue) => {
            if(issue.id > highest){
                highest = issue.id;
            }
        });

        return highest + 1;
    }

    updateData(value, id, fieldName) {
        const issues = this.state.issues.slice();
        let newId    = this.getNewId(issues);
        let index = this.idToIndex(id, issues);

        if (id !== null && id !== "") {
            issues[index][fieldName] = value;
            newId                     = id;
        }
        else {
            const fields = this.state.issueFields;
            let newIssue = this.issueData.getNewIssue(fields);

            newIssue.id         = newId;
            newIssue.projectId  = this.props.match.params.id;
            newIssue[fieldName] = value;

            issues.push(newIssue);
        }

        this.setState({issues : issues});

        let issue = this.issueData.findIssue(newId, issues);
        this.issueData.postIssueDelayed(issue, 3000);
    }

    render() {

        return (
            <div className="auth-box full-page">
                <h1>
                    {this.state.project.name}
                </h1>
                <IssueList issues={this.state.issues}
                           issueFields={this.state.issueFields}
                           projectId={this.props.match.params.id}
                           updateData={(event, id, field) => this.updateData(event, id, field)}/>

            </div>
        );
    }
}

export default ProjectPage;