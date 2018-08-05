import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class LoginPage extends Component {
    render() {

        return (
            <div className="auth-box">
                <img src="/favicon.ico" alt="Track Yak!"
                     style={{display : 'block', margin : 'auto', width : '40px'}}/>
                <h1>
                    Welcome Back
                </h1>

                <h4>
                    Email
                </h4>

                <input className="big-input" type="text" name="register-email"/>


                <h4>
                    Password
                </h4>

                <input className="big-input" type="password" name="register-password"/>

                <button className="big-button">
                    Login
                </button>

                <p className="centered">
                    Need to Register?
                    <br/>
                    <Link to="/register">Register</Link>
                </p>
            </div>
        );
    }
}

export default LoginPage;