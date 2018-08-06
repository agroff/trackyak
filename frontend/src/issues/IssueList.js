import React, {Component} from 'react';
import './issues.css';
import IssueDataService from "./IssueService";


class IssueData extends Component {

    constructor(props) {
        super(props);

        this.node = 'hi';

        this.state = {
            dropdownOpen : false
        }
    }

    checkUnfocused(event) {

        console.log(this);
        if (!this.node) {
            return;
        }

        if (this.node.contains(event.target)) {
            return;
        }

        this.setState({dropdownOpen : false});
    }

    renderTextInput(issue, field, onChange) {
        const value = issue[field.key];

        return (
            <input
                className="issueDataInput"
                type="text"
                value={value}
                onChange={(event) => {
                    onChange(event.target.value, issue.id, field.key);
                }}
            />
        );
    }

    renderDropdownOptions(field, value, onChange) {
        let options = [];

        field.values.forEach((fieldValue, key) => {
            let className = "option";

            if (String(value) === String(fieldValue)) {
                className += " selected";
            }

            options.push(
                <div key={key}
                     className={className}
                     onClick={(event) => {
                         this.setState({dropdownOpen : false});
                         onChange(fieldValue);
                     }}>
                    {fieldValue}
                </div>
            );
        });

        return (
            <div className="dropdownOptions"
                 tabIndex={0}
                 onBlur={() => {
                     this.setState({dropdownOpen : false});
                 }}>
                {options}
            </div>
        );
    }


    renderSelect(issue, field, onChange) {
        const value           = issue[field.key];
        const containerCss    = {
            position   : "relative",
            whiteSpace : "nowrap"
        };
        const dropdownClicked = function (value) {
            onChange(value, issue.id, field.key);
        };

        return (
            <div style={containerCss}>

                <i className="fas fa-caret-down select-icon"
                   onClick={(event) => {
                       this.setState({dropdownOpen : true});

                       setTimeout(i => {
                           const dropdowns = document.getElementsByClassName('dropdownOptions');
                           dropdowns[0].focus();
                       }, 0);

                   }}/>
                <span className="selectValue">
                    {value}
                </span>

                {this.state.dropdownOpen && this.renderDropdownOptions(field, value, dropdownClicked)}
            </div>
        );
    }

    render() {
        const field      = this.props.field;
        const issue      = this.props.issue;
        const updateData = this.props.updateData;
        const column     = this.props.column;

        return (
            <div className="issueDataField"
                 style={{gridColumn : column}}>
                {field.type === "text" && this.renderTextInput(issue, field, updateData)}

                {field.type === "select" && this.renderSelect(issue, field, updateData)}
            </div>
        );
    }
}

function Issue(props) {
    const fields       = props.issueFields;
    let dataContainers = [];

    fields.forEach((field, key) => {
        dataContainers.push(
            <IssueData {...props}
                       key={key}
                       column={key + 1}
                       field={field}/>
        );

    });

    return dataContainers;
}

class IssueList extends Component {

    constructor(props) {
        super(props);

        this.issueData = new IssueDataService();
    }

    getColumnLayout() {
        let layout = '';
        this.props.issueFields.forEach((field, key) => {
            layout += field.size + 'fr ';
        });

        return layout;
    }

    render() {
        const empty = this.issueData.getNewIssue(this.props.issueFields);
        const css   = {gridTemplateColumns : this.getColumnLayout()};
        let issues  = [];
        let fields  = [];

        this.props.issueFields.forEach((field, key) => {
            fields.push(
                <div className="issueDataField header"
                     key={key}
                     style={{gridColumn : key + 1}}>
                    {field.title}
                </div>
            );
        });

        this.props.issues.forEach((issue, key) => {
            issues.push(<Issue {...this.props} issue={issue} key={key}/>)
        });


        issues.push(
            <Issue {...this.props}
                   key={this.props.issues.length}
                   issue={empty}/>
        );

        return (
            <div className="IssueList" style={css}>
                {fields}

                {issues}
            </div>
        );
    }
}

export default IssueList;
