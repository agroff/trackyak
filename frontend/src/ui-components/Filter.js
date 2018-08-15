import React, {Component} from 'react';


class Filter extends Component {

    constructor() {
        super();

        this.filterPopup = React.createRef();

        const state = {
            popupOpen: false,
            filters : {}
        };



        this.state = state;
    }

    componentDidMount(){
        let filters = {};
        this.props.values.forEach((value) => {
            filters[value] = true;
        });

        this.setState({filters});

        setTimeout(() => {
            this.closeFilter();
        }, 1)

    }

    toggleFilterItem(value){

        const filters = Object.assign({}, this.state.filters);

        if(filters[value]){
            filters[value] = false;
        }
        else {
            filters[value] = true;
        }

        //console.log(value, filters);

        this.setState({filters});
    }

    openFilter() {
        this.setState({popupOpen: true});

        setTimeout(() => {
            this.filterPopup.current.focus();
        }, 0);
    }

    closeFilter(){
        this.setState({popupOpen: false});

        this.props.onChange(Object.assign({}, this.state.filters));
    }

    renderFilter() {

        let values = [];

        this.props.values.forEach((value) => {
            values.push(
                <div>
                    <span className={"fake-checkbox " + ((this.state.filters[value]) ? "checked" : "")}
                          onClick={() => {this.toggleFilterItem(value)}}
                    >
                        <i className="fas fa-check"></i>
                    </span>


                    {value}
                </div>
            );
        });

        return (
            <div className="filter-container"
                 ref={this.filterPopup}
                 onBlur={() => {this.closeFilter()}}
                 tabIndex={0}
            >
                {values}
            </div>
        );
    }

    render() {
        return (
            <React.Fragment>

                <button className="fas fa-filter control fa-button"
                        tabIndex="0"
                        href="#"
                    // onKeyDown={navigate}
                        onClick={() => this.openFilter()}
                >
                    <span className="sr-only">Filter</span>
                </button>

                {
                    this.state.popupOpen &&
                    this.renderFilter()
                }
            </React.Fragment>
        );
    }
}

export default Filter;