import React, {Component} from 'react';


class Select extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false
        }
    }

    closeSelect() {
        this.setState({dropdownOpen: false});
    }

    openSelect(){
        this.setState({dropdownOpen: true});

        setTimeout(i => {
            const dropdowns = document.getElementsByClassName('dropdownOptions');
            dropdowns[0].focus();
        }, 0);
    }

    renderDropdownOptions(values, value, onChange) {
        let options = [];

        values.forEach((fieldValue, key) => {
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
                 onBlur={() => this.closeSelect()}>
                {options}
            </div>
        );
    }


    render() {
        const props = this.props;

        const navigate = props.navigate || function(){};

        return (
            <div className="issueDataSelect">

                <button className="fas fa-caret-down control select-icon"
                        tabIndex="0"
                        href="#"
                        onKeyDown={navigate}
                        onClick={() => this.openSelect()}>
                    <span className="sr-only">Edit</span>
                </button>

                <span className="selectValue">
                    {props.selected}
                </span>

                {
                    this.state.dropdownOpen &&
                    this.renderDropdownOptions(props.values, props.selected, props.onChange)
                }
            </div>
        );
    }
}

export default Select;