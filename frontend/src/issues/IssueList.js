import React, {Component} from 'react';
import './issues.css';
import IssueDataService from "./IssueService";


class IssueData extends Component {

    constructor(props) {
        super(props);

        this.node = 'hi';

        this.state = {
            dropdownOpen: false
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

        this.setState({dropdownOpen: false});
    }

    getFocusTarget(target, direction){
        if(direction === 'left' && target.previousSibling){
            return target.previousSibling.querySelector(".control")
        }

        if(direction === "right" && target.nextSibling){
            return target.nextSibling.querySelector(".control");
        }

        if(direction === "down"){
            for(let i = 0; i < this.props.issueFields.length; i++){
                if(!target){
                    return null;
                }
                target = target.nextSibling || null;
            }
            if(target && target.querySelector(".control")){
                return target.querySelector(".control");
            }
        }

        if(direction === "up"){
            for(let i = 0; i < this.props.issueFields.length; i++){
                if(!target){
                    return null;
                }
                target = target.previousSibling || null;
            }
            if(target && target.querySelector(".control")){
                return target.querySelector(".control")
            }
        }

        return null;
    }

    focusDirection(target, direction, isText = false){
        let newTarget = this.getFocusTarget(target, direction);

        if(isText){
            if(direction === 'left' || direction === 'right'){

            }
        }

        if(newTarget){
            newTarget.focus();
        }
    }

    fieldKeyUp(event) {

        let canNavigate = true;

        const cell = event.target.closest(".issueDataField");
        const isText = event.target.tagName === 'INPUT';
        const isLeftRight = event.which === 37 || event.which === 39;

        if(isText && isLeftRight && !event.ctrlKey){
            canNavigate = false;
        }

        if(event.which < 37 || event.which > 40){
            canNavigate = false;
        }

        if(!canNavigate){
            return;
        }

        event.preventDefault();

        switch (event.which) {
            case 37:
                this.focusDirection(cell, "left", isText);
                break;
            case 38:
                this.focusDirection(cell, "up", isText);
                break;
            case 39:
                this.focusDirection(cell, "right", isText);
                break;
            case 40:
                this.focusDirection(cell, "down", isText);
                break;
            default:
                break;
        }
    }

    renderTextInput(issue, field, onChange) {
        const value = issue[field.key];

        return (
            <input
                className="issueDataInput control"
                type="text"
                value={value}
                onKeyDown={(e) => this.fieldKeyUp(e)}
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
                         this.setState({dropdownOpen: false});
                         onChange(fieldValue);
                     }}>
                    {fieldValue}
                </div>
            );
        });

        return (
            <div className="dropdownOptions"
                 tabIndex="0"
                 onBlur={() => {
                     this.setState({dropdownOpen: false});
                 }}>
                {options}
            </div>
        );
    }


    renderSelect(issue, field, onChange) {
        const value = issue[field.key];

        const dropdownClicked = function (value) {
            onChange(value, issue.id, field.key);
        };

        return (
            <div className="issueDataSelect">

                <button className="fas fa-caret-down control select-icon"
                        tabIndex="0"
                        href="#"
                        onKeyDown={(e) => this.fieldKeyUp(e)}
                        onClick={(event) => {
                            this.setState({dropdownOpen: true});

                            setTimeout(i => {
                                const dropdowns = document.getElementsByClassName('dropdownOptions');
                                dropdowns[0].focus();
                            }, 0);

                        }}>
                    <span className="sr-only">Edit</span>
                </button>
                <span className="selectValue">
                    {value}
                </span>

                {this.state.dropdownOpen && this.renderDropdownOptions(field, value, dropdownClicked)}
            </div>
        );
    }

    render() {
        const field = this.props.field;
        const issue = this.props.issue;
        const updateData = this.props.updateData;
        const column = this.props.column;

        return (
            <div className="issueDataField"
                 style={{gridColumn: column}}>
                {field.type === "text" && this.renderTextInput(issue, field, updateData)}

                {field.type === "select" && this.renderSelect(issue, field, updateData)}
            </div>
        );
    }
}

function Issue(props) {
    const fields = props.issueFields;
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
        const css = {gridTemplateColumns: this.getColumnLayout()};
        let issues = [];
        let fields = [];

        this.props.issueFields.forEach((field, key) => {
            fields.push(
                <div className="issueDataField header"
                     key={key}
                     style={{gridColumn: key + 1}}>
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
