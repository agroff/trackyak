import IssueData from "./IssueData";
import React from "react";

function Issue(props) {
    const fields = props.issueFields;
    let dataContainers = [];

    fields.forEach((field, key) => {
        const data = <IssueData {...props} key={key} column={key + 1} field={field}/>;

        dataContainers.push(data);
    });

    return dataContainers;
}

export default Issue;