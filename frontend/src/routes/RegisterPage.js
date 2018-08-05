import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import UserService from "../users/UserService";

class RegisterPage extends Component {

    constructor(props) {
        super(props);

        this.userService = new UserService();

        this.state = {
            name     : "",
            email    : "",
            password : "",

            networkError : false,

            errors : {
                name     : true,
                email    : true,
                password : true,
            },
            error  : "name"
        };
    }

    setErrorState(field, isError) {
        let errors = {...this.state.errors};

        errors[field] = isError;
        this.setState({errors});

        let newError = false;
        for (let key in errors) {
            if (newError === false && errors[key] === true) {
                newError = key;
            }
        }

        this.setState({error : newError});
    }

    updateField(event, fieldName) {
        const value      = event.target.value;
        const emailRegex = /.+@.+\.[a-zA-Z]{2,}/;

        if (fieldName === 'name') {
            this.setErrorState('name', value.length < 2);
        }
        if (fieldName === 'email') {
            this.setErrorState('email', emailRegex.test(value) === false);
        }
        if (fieldName === 'password') {
            this.setErrorState('password', value.length < 6);
        }
        let state        = {};
        state[fieldName] = value;
        this.setState(state);
    }

    register(event) {
        const user = {
            name     : this.state.name,
            email    : this.state.email,
            password : this.state.password
        };

        this.setState({networkError : false});

        let promise = this.userService.registerUser(user, true);

        promise
            .then(() => {
                window.location = '/project';
            })
            .catch(() => {
                setTimeout(()=>this.setState({networkError : true}), 200)
            });
    }

    render() {

        return (
            <div className="auth-box">
                <img src="/favicon.ico" alt="Track Yak!"
                     style={{display : 'block', margin : 'auto', width : '40px'}}/>
                <h1>
                    Let's get started!
                </h1>

                <div className={'error-div ' + (this.state.networkError ? "show" : "")}>
                    Something went wrong trying to sign you up :(
                </div>

                <h4>
                    What should we call you?
                </h4>
                <input className="big-input" type="text" name="register-name"
                       onChange={(e) => this.updateField(e, 'name')}/>


                <h4>
                    What's your email address?
                </h4>
                <input className="big-input" type="text" name="register-email"
                       onChange={(e) => this.updateField(e, 'email')}/>


                <h4>
                    Make a super creative password.
                </h4>
                <input className="big-input" type="password" name="register-password"
                       onChange={(e) => this.updateField(e, 'password')}/>

                {
                    this.state.error === 'name' &&
                    <p className="nice-error">
                        Your name needs to be longer
                        <span role="img" aria-label="upside down happy face"> 🙃</span>
                    </p>
                }
                {
                    this.state.error === 'email' &&
                    <p className="nice-error">
                        Your email doesn't look right
                        <span role="img" aria-label="eye rolling"> 🙄</span>
                    </p>
                }
                {
                    this.state.error === 'password' &&
                    <p className="nice-error">
                        Make a longer password...
                        <span role="img" aria-label="eye rolling"> 😑</span>
                    </p>
                }
                {
                    this.state.error === false &&
                    <button className="big-button" onClick={(e) => this.register(e)}>
                        Sign Me Up
                    </button>
                }

                <p className="centered">
                    Already have an account?
                    <br/>
                    <Link to="/login">Login</Link>
                </p>
            </div>
        );
    }
}

export default RegisterPage;