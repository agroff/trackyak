import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import UserService from "../users/UserService";

class LoginPage extends Component {

    constructor(props){
        super(props);

        this.userService = new UserService();

        this.state = {
            loginError : false,
            email: "",
            password: "",
        }
    }

    updateField(event, fieldName) {
        const value = event.target.value;
        const state = {};

        state[fieldName] = value;
        this.setState(state);
    }

    login(event){
        const user = {
            email    : this.state.email,
            password : this.state.password
        };

        this.setState({loginError : false});

        let promise = this.userService.authenticateUser(user, true);

        promise
            .then((user) => {
                this.props.authenticate({
                    id: user.id,
                    name : user.name,
                    email : user.email
                },user.token);
            })
            .catch((error) => {
                console.log(error);
                setTimeout(()=>this.setState({loginError : true}), 200)
            });
    }

    render() {
        if(this.props.auth.id){
            return <Redirect to="/dashboard" />;
        }

        return (
            <div className="auth-box">
                <img src="/favicon.ico" alt="Track Yak!"
                     style={{display : 'block', margin : 'auto', width : '40px'}}/>
                <h1>
                    Welcome Back
                </h1>

                <div className={'error-div ' + (this.state.loginError ? "show" : "")}>
                    Login Failed. Check your username and password and try again.
                </div>

                <h4>
                    Email
                </h4>
                <input className="big-input" type="text" name="register-email"
                       onChange={(e) => this.updateField(e, 'email')}/>


                <h4>
                    Password
                </h4>
                <input className="big-input" type="password" name="register-password"
                       onChange={(e) => this.updateField(e, 'password')}/>

                <button className="big-button" onClick={(e) => this.login(e)}>
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