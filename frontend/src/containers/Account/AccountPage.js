import React, { Component } from 'react'
import NavBarComponent from '../../components/NavBar'
import { removeCookie, removeLocalStorage, getLocalStorage,getAuthToken,setLocalStorage } from '../../helpers/utils'
import ApiInterface from '../../helpers/APIGateway'
import Constant from '../../helpers/constant'
const lo = require('lodash')
class AccountPage extends Component {
    constructor(props) {
        super(props)
        var profile = getLocalStorage(Constant.abbriv.PROFILE)
        this.state = {
            validationMessage: "",
            showValidation: false,
            firstname: profile ? profile.firstname:"",
            lastname:  profile ?profile.lastname:"",
            profilepic:  profile ?profile.profilepic:"http://www.divestco.com/wp-content/uploads/2017/08/person-placeholder-portrait.png"
        }
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e) {
        var answer = confirm("Are you sure, want to Logout")
        if (answer) {
            removeCookie(Constant.abbriv.AUTH)
            removeLocalStorage(Constant.abbriv.PROFILE)
            this.props.history.push('/login');
        }
    }

    handleOnSubmit(e){
        e.preventDefault()
        if (this.validate()) {
            ApiInterface.patch(Constant.URI()+ Constant.Routes.USER.ROOT,{firstname:this.state.firstname,lastname:this.state.lastname,profilepic:this.state.profilepic},true,(isSuccess,statusCode,result)=>{
                if (isSuccess && statusCode === 200) {
                    setLocalStorage(Constant.abbriv.PROFILE,result.data.profile)
                    var answer = confirm("Successfully updated")
                }
            } )
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
        return true
    }

    handleOnChange(e){
        this.setState({ [e.target.name]: e.target.value, validationMessage:"",showValidation:false })
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
                <NavBarComponent canShowButtons={true} />
                <div className="container container-signup account-container">
                    <form ref="register">
                        <div className="card standard-signup-warning" id="password-warning" style={{ display: this.state.showValidation ? "block" : "none", background: "#ffc458" }}>
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
                        <div className="align-content-center">
                            <button className="btn btn-success standard-signup" onClick={this.handleOnSubmit} >Update</button>
                        </div>
                    </form>
                </div>

                <div className="container container-signup account-container mt-50">
                    <div className="align-content-center">
                        <h6>Proceed to logout your account in this browser? </h6>
                        <button className="btn btn-danger standard-signup" onClick={this.handleLogout} >Logout</button>
                    </div>
                </div>
            </div>
        )
    }
}

AccountPage.propTypes = {

}

export default AccountPage