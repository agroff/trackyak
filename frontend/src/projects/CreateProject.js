import React, {Component} from 'react';


export class CreateProject extends Component {

    constructor(props){
        super(props);

        this.state = {
            nameError : false,
            name: "",
        }
    }

    updateName(event){
        this.setState({name: event.target.value});
    }

    createProject(event){
        this.setState({nameError:false});
        const name = this.state.name;

        if(name.length < 5){
            setTimeout(()=>{
                this.setState({nameError:true});
            },200);
            return;
        }

        this.props.projectService.createProject(name);
        this.setState({name: ""});
        this.props.updateProjects();
    }

    render(){
        return(
            <div className="create-project">

                <div className={'error-div ' + (this.state.nameError ? 'show' : '')} >
                    Make your project name more descriptive
                </div>

                <h4>New Project Name</h4>
                <input className="big-input"
                       value={this.state.name}
                       onChange={(e)=>this.updateName(e)} />

                <button className="big-button" onClick={(e)=>this.createProject(e)}>
                    Create Project
                </button>
            </div>
        )
    }
}

export default CreateProject;