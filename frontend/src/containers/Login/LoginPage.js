import React, { Component } from 'react';
import NavBarComponent from './../../components/NavBar'
import APIInterface from "../../helpers/APIGateway";
import {validateEmail,setLocalStorage,setCookie} from '../../helpers/utils'
import Constant from '../../helpers/constant'
const lo = require('lodash')

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "andreas.pedersen@example.com",
            password: "heavycat304",
            validationMessage: "",
            showValidation: false
        }
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleOnSubmit(e) {
        e.preventDefault()
        if(this.validate()){
            APIInterface.post(Constant.URI() + Constant.Routes.USER.LOGIN,{email:this.state.email,password:this.state.password},false,(isSuccess,statusCode,result)=>{
                if (isSuccess){
                    var data = result.data
                    setLocalStorage(Constant.abbriv.PROFILE,data.user.profile)
                    setCookie(Constant.abbriv.AUTH,data.token)
                    window.location.reload(true);
                }else{
                    console.log("no Success")
                }
            })
        }
    }

    validate() {
        if (lo(this.state.email).isEmpty()) {
            this.setState({
                showValidation:true,
                validationMessage: "Please enter the email."
            })
            return false
        }
        if (!validateEmail(this.state.email)) {
            this.setState({
                showValidation:true,
                validationMessage: "Please enter the valid email."
            })
            return false
        }
        if (lo(this.state.password).isEmpty()) {
            this.setState({
                showValidation:true,
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
            <div>
                <NavBarComponent canShowButtons={false} />
                <article className="post-wrap" style={{ marginTop: 150 }}>
                    <div className="container container-signup" >
                        <div className="signup-text text-center">
                            <h3>Log In</h3>
                        </div>
                        <form>
                            <div className="card standard-signup-warning" id="password-warning" style={{ display: this.state.showValidation? "block":"none", background: "#ffc458" }}>
                                <div className="card-body">
                                    {this.state.validationMessage}
                            </div>
                            </div>
                            <div className="form-group">
                                <label className="col-form-label" htmlFor="email">Your Email</label>
                                <input type="email" className="form-control" value={this.state.email} id="email" name="email" placeholder="Enter your email." onChange={this.handleOnChange} />
                            </div>
                            <div className="form-group">
                                <label className="col-form-label" htmlFor="password">Your Password</label>
                                <input type="password" value={this.state.password} className="form-control" id="password" name="password" placeholder="Enter your password." onChange={this.handleOnChange} />
                            </div>
                            <div className="align-content-center">
                                <button className="btn btn-primary standard-signup" onClick={this.handleOnSubmit} >Sign in</button>
                            </div>
                        </form>
                    </div>
                </article>
                <div style={{ margin: '0 auto', textAlign: 'center', fontSize: 14, fontWeight: 300, padding: 50 }}>Don't have an account? <a href="/register"> Register with us.</a></div>
            </div>
        );
    }
}

LoginPage.propTypes = {

};

export default LoginPage;