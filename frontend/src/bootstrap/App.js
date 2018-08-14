import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Link,
} from 'react-router-dom'
import {PrivateRoute, PropsRoute} from './routeHelpers';
import './App.css';
import LoginPage from '../routes/LoginPage';
import RegisterPage from '../routes/RegisterPage';
import ProjectPage from '../routes/ProjectPage';
import DashboardPage from '../routes/DashboardPage';
import ProjectService from "../projects/projectService";
import IssueService from "../issues/IssueService";

class App extends Component {

    constructor(props) {
        super(props);

        this.projectService = new ProjectService();
        this.issueService = new IssueService();

        let auth = {
            id    : 0,
            name  : "",
            email : "",
            token : ""
        };

        let storedAuth = sessionStorage.getItem('auth');
        if (storedAuth) {
            auth = JSON.parse(storedAuth);

            this.projectService.setCredentials(auth);
        }

        this.state = {
            auth : auth
        };

    }

    authenticate(user, token) {
        console.log(user, token, 'in auth');
        let auth = {
            id    : 0,
            name  : "",
            email : ""
        };

        auth.token = token;

        if (user.id) {
            auth.id = user.id;
        }
        if (user.name) {
            auth.name = user.name;
        }
        if (user.email) {
            auth.email = user.email;
        }

        sessionStorage.setItem('auth', JSON.stringify(auth));

        this.setState({auth});

        this.projectService.setCredentials(auth);
    }

    logout(){
        let auth = {
            id    : 0,
            name  : "",
            email : ""
        };

        this.setState({auth});
        sessionStorage.removeItem('auth');
    }


    render() {

        const authenticate = (user, token) => {
            this.authenticate(user, token);
        };

        return (
            <Router>
                <div className="App">
                    <header id="app-header">
                        <div className="left">
                            {this.state.auth.id ?
                                <Link className="home-link" to="/dashboard">
                                    <i className="fas fa-home"></i>
                                </Link>
                                :
                                <Link to="/register">Register</Link>
                            }


                        </div>
                        <div className="right">
                            {this.state.auth.id ?
                                <Link to="/logout">Logout</Link>
                                :
                                <Link to="/login">Login</Link>
                            }
                        </div>
                    </header>
                    <main>
                        <PropsRoute exact path="/"
                                    auth={this.state.auth}
                                    component={(props) => {
                                        if (props.auth.id) {
                                            return <Redirect to="/dashboard"/>;
                                        }
                                        else {
                                            return <Redirect to="/login"/>;
                                        }
                                    }}
                        />
                        <PropsRoute path="/logout"
                                    auth={this.state.auth}
                                    component={(props) => {
                                        this.logout();
                                        return <Redirect to="/login"/>;
                                    }}
                        />

                        <PropsRoute path="/login"
                                    component={LoginPage}
                                    auth={this.state.auth}
                                    authenticate={authenticate}
                        />
                        <PropsRoute path="/register"
                                    component={RegisterPage}
                                    auth={this.state.auth}
                                    authenticate={authenticate}
                        />
                        <PrivateRoute path="/project/:id"
                                      projectService={this.projectService}
                                      component={ProjectPage}
                                      auth={this.state.auth}
                                      redirectTo="/login"
                        />
                        <PrivateRoute path="/dashboard"
                                      projectService={this.projectService}
                                      component={DashboardPage}
                                      auth={this.state.auth}
                                      redirectTo="/login"
                        />
                    </main>
                </div>
            </Router>
        );
    }
}

export default App;
