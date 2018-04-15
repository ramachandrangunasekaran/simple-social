import React, { Component, PropTypes } from 'react';
import NavBarComponent from './../../components/NavBar'
import APIInterface from "../../helpers/APIGateway";
import { validateEmail, setLocalStorage, setCookie } from '../../helpers/utils'
import Constant from '../../helpers/constant'
const lo = require('lodash')


class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validationMessage: "",
            showValidation: false,
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            username: "",
            profilepic: "http://www.divestco.com/wp-content/uploads/2017/08/person-placeholder-portrait.png"
        }

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }


    handleOnChange(e) {
        this.setState({ [e.target.name]: e.target.value, validationMessage:"",showValidation:false })
    }

    handleOnSubmit(e) {
        e.preventDefault()
        if (this.validate()) {

            APIInterface.get(Constant.URI() + Constant.Routes.USER.CHECK + "/" + this.state.username, false, (isSuccess, status, result) => {
                if (isSuccess) {
                    APIInterface.post(Constant.URI() + Constant.Routes.USER.REGISTER, this.state, false, (isSuccess, statusCode, result) => {
                        var answer = confirm(isSuccess ? "Successfully registered!!!" : "Something went wrong on register.")
                        if (answer) {
                            if (isSuccess)
                                this.props.history.push('/login');
                        }
                    })
                }else{
                    this.setState({validationMessage:"username already taken.",showValidation:true})
                    this.refs.register.scrollTop = 0;
                }

            })



        }
    }


    validate() {
        if (lo(this.state.firstname).isEmpty()) {
            this.setState({
                showValidation: true,
                validationMessage: "Please enter the First name."
            })
            return false
        }
        if (lo(this.state.lastname).isEmpty()) {
            this.setState({
                showValidation: true,
                validationMessage: "Please enter the Last name."
            })
            return false
        }
        if (lo(this.state.username).isEmpty()) {
            this.setState({
                showValidation: true,
                validationMessage: "Please enter the Username."
            })
            return false
        }
        if (lo(this.state.email).isEmpty()) {
            this.setState({
                showValidation: true,
                validationMessage: "Please enter the email."
            })
            return false
        }
        if (!validateEmail(this.state.email)) {
            this.setState({
                showValidation: true,
                validationMessage: "Please enter the valid email."
            })
            return false
        }
        if (lo(this.state.password).isEmpty()) {
            this.setState({
                showValidation: true,
                validationMessage: "Please enter the password."
            })
            return false
        }

        return true
    }


    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="container-fluid">
                <NavBarComponent canShowButtons={false} />
                <article className="post-wrap" style={{ marginTop: 150 }}>
                    <div className="container container-signup">
                        <div className="signup-text text-center">
                            <h3>Join New</h3>
                        </div>
                        <form ref="register">
                            <div className="card standard-signup-warning"  id="password-warning" style={{ display: this.state.showValidation ? "block" : "none", background: "#ffc458" }}>
                                <div className="card-body">
                                    {this.state.validationMessage}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-form-label" htmlFor="firstname">First Name</label>
                                <input type="text" className="form-control" value={this.state.firstname} onChange={this.handleOnChange} id="firstname" name="firstname" placeholder="please enter your first name" />
                            </div>
                            <div className="form-group">
                                <label className="col-form-label" htmlFor="lastname">Last Name</label>
                                <input type="text" value={this.state.lastname} onChange={this.handleOnChange} className="form-control" id="lastname" name="lastname" placeholder="please enter your last name" />
                            </div>
                            <div className="form-group">
                                <label className="col-form-label" htmlFor="username">User Name</label>
                                <input type="text" value={this.state.username} onChange={this.handleOnChange} className="form-control" id="username" name="username" placeholder="please choose a username" />
                            </div>
                            <div className="form-group">
                                <label className="col-form-label" htmlFor="email">Email</label>
                                <input type="email" value={this.state.email} onChange={this.handleOnChange} className="form-control" id="email" name="email" placeholder="Please enter your email." />
                            </div>
                            <div className="form-group">
                                <label className="col-form-label" htmlFor="password">Password</label>
                                <input type="password" value={this.state.password} onChange={this.handleOnChange} className="form-control" id="password" name="password" placeholder="please enter your password" />
                            </div>
                            <div className="align-content-center">
                                <button className="btn btn-primary standard-signup" onClick={this.handleOnSubmit} >Join</button>
                            </div>
                        </form>
                    </div>
                </article>
                <div style={{ margin: '0 auto', textAlign: 'center', fontSize: 14, fontWeight: 300, padding: 50 }}>Already have a account? <a href="/login"> continue login.</a></div>
            </div>
        );
    }
}

RegisterPage.propTypes = {

};

export default RegisterPage;