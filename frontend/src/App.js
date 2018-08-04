import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import './issues/IssueList'
import IssueList from "./issues/IssueList";
import IssueDataService from './issues/IssueDataService';

class App extends Component {

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

        this.issueData = new IssueDataService();

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
        const newId  = this.state.issues.length + 1;

        if (id !== null) {
            issues[id - 1][fieldName] = value;
        }
        else {
            const fields = this.state.issueFields;
            let newIssue = this.issueData.getNewIssue(fields);

            newIssue.id = newId;
            newIssue[fieldName] = value;

            issues.push(newIssue);
        }

        this.setState({issues : issues});
    }

    render() {

        return (
            <div className="App">
                <IssueList issues={this.state.issues}
                           issueFields={this.state.issueFields}
                           updateData={(event, id, field) => this.updateData(event, id, field)}/>
            </div>
        );
    }
}

export default App;
