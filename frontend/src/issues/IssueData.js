import {Component} from "react";
import Select from "../ui-components/Select";
import React from "react";

class IssueData extends Component {

    constructor(props) {
        super(props);

        this.node = 'hi';

        this.state = {
            dropdownOpen: false
        }
    }

    checkUnfocused(event) {

        //console.log(this);
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

    focusDirection(target, direction){
        let newTarget = this.getFocusTarget(target, direction);

        if(newTarget){
            newTarget.focus();
        }
    }

    navigate(event) {

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
                this.focusDirection(cell, "left");
                break;
            case 38:
                this.focusDirection(cell, "up");
                break;
            case 39:
                this.focusDirection(cell, "right");
                break;
            case 40:
                this.focusDirection(cell, "down");
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
                onKeyDown={(e) => this.navigate(e)}
                onChange={(event) => {
                    onChange(event.target.value, issue.id, field.key);
                }}
            />
        );
    }


    renderSelect(issue, field, onChange) {
        const value = issue[field.key];

        const dropdownChanged = function (value) {
            onChange(value, issue.id, field.key);
        };

        return <Select  values={field.values}
                        selected={value}
                        navigate={(e) => this.navigate(e)}
                        onChange={dropdownChanged}  />;
    }

    render() {
        const field = this.props.field;
        const issue = this.props.issue;
        const updateData = this.props.updateData;
        const column = this.props.column;
        let extraClass = "";

        if(!this.props.isVisible){
            extraClass = "hidden";
        }

        return (
            <div className={"issueDataField " + extraClass}
                 style={{gridColumn: column}}>
                {field.type === "text" && this.renderTextInput(issue, field, updateData)}

                {field.type === "select" && this.renderSelect(issue, field, updateData)}

                {field.type === "label" &&
                <span>{issue[field.key]}</span>
                }
            </div>
        );
    }
}

export default IssueData;