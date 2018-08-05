import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
//    Redirect,
//    withRouter
} from 'react-router-dom'

import './App.css';
//import './issues/IssueList';
import LoginPage from '../routes/LoginPage';
import RegisterPage from '../routes/RegisterPage';
import ProjectPage from '../routes/ProjectPage';

class App extends Component {



    render() {

        return (
            <Router>
                <div className="App">
                    <header>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                        <Link to="/project">Projects</Link>
                    </header>
                    <main>
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/project" component={ProjectPage} />
                    </main>
                    </div>
            </Router>
        );
    }
}

export default App;
