import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {CreateProject} from '../projects/CreateProject'
import ProjectService from "../projects/projectService";

class DashboardPage extends Component {

    constructor(props) {
        super(props);

        this.projectService = new ProjectService();

        this.projectService.setCredentials(this.props.auth);

        this.state = {
            projects : []
        };
    }

    componentDidMount() {
        this.updateProjects();
    }

    updateProjects() {
        const promise = this.projectService.getProjects();

        promise.then((projects) => {
            this.setState({projects});
        }).catch(() => {

        });
    }

    render() {

        return (
            <div className="auth-box full-page">
                <h1>
                    Projects
                </h1>

                <div className="projects-container">
                    {this.state.projects.map(
                        (project, key) => {
                            return <Link to={"/project/" + project._id}
                                         key={key}
                                         className="project-square">
                                <span className="project-name">
                                    {project.name}
                                </span>
                            </Link>
                        }
                    )}

                    <CreateProject updateProjects={() => this.updateProjects()}
                                   projectService={this.projectService}
                    />
                </div>

            </div>
        );
    }
}

export default DashboardPage;