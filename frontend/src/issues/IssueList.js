import React, {Component} from 'react';
import './issues.css';
import IssueDataService from "./IssueService";
import Issue from "./Issue";
import Filter from "../ui-components/Filter"

class IssueList extends Component {

    constructor(props) {
        super(props);

        this.issueData = new IssueDataService();

        this.state = {
            filters: {}
        }
    }

    filterUpdated(filters){
        this.setState({filters});
    }

    getColumnLayout() {
        let layout = '';
        this.props.issueFields.forEach((field, key) => {
            layout += field.size + 'fr ';
        });

        return layout;
    }

    getHeaderRow() {
        let fields = [];

        this.props.issueFields.forEach((field, key) => {

            fields.push(
                <div className="issueDataField header"
                     key={key}
                     style={{gridColumn: key + 1}}>
                    {field.title}

                    {
                        field.hasFilter &&
                        <Filter values={field.values} onChange={(filters)=>this.filterUpdated(filters)} />
                    }
                </div>
            );

        });

        return fields;
    }

    getIssueRows() {
        let issues = [];

        this.props.issues.forEach((issue, key) => {
            let isVisible = this.state.filters[issue.status];
            issues.push(<Issue {...this.props} isVisible={isVisible} issue={issue} key={key}/>)
        });

        return issues;
    }

    getEmptyRow() {
        const empty = this.issueData.getNewIssue(this.props.issueFields);
        const newKey = this.props.issues.length;

        return <Issue {...this.props} key={newKey} isVisible={true} issue={empty}/>
    }

    render() {
        const css = {gridTemplateColumns: this.getColumnLayout()};

        const header = this.getHeaderRow();

        const issues = this.getIssueRows();

        issues.push(this.getEmptyRow());

        return (
            <div className="IssueList" style={css}>
                {header}
                {issues}
            </div>
        );
    }
}

export default IssueList;
