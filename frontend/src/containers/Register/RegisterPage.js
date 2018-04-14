import React, { Component, PropTypes } from 'react';
import NavBarComponent from './../../components/NavBar'
class RegisterPage extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {

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
                <article className="post-wrap">
                    <div className="container container-signup">
                        <div className="signup-text text-center">
                            <h3>Join New</h3>
                        </div>
                        <form>
                            <div className="form-group">
                                <label className="col-form-label" htmlFor="firstname">First Name</label>
                                <input type="text" className="form-control" id="firstname" name="firstname" placeholder="please enter your first name" />
                            </div>
                            <div className="form-group">
                                <label className="col-form-label" htmlFor="lastname">Last Name</label>
                                <input type="text" className="form-control" id="lastname" name="lastname" placeholder="please enter your last name" />
                            </div>
                            <div className="form-group">
                                <label className="col-form-label" htmlFor="username">User Name</label>
                                <input type="text" className="form-control" id="username" name="username" placeholder="please choose a username" />
                            </div>
                            <div className="form-group">
                                <label className="col-form-label" htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" name="email" placeholder="Please enter your email." />
                            </div>
                            <div className="form-group">
                                <label className="col-form-label" htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" name="password" placeholder="please enter your password" />
                            </div>
                            <div className="align-content-center">
                                <button className="btn btn-primary standard-signup">Join</button>
                            </div>
                        </form>
                        <div className="card standard-signup-warning" id="password-warning" style={{ display: "none" }}>
                            <div className="card-body">
                                <span className="glyphicon glyphicon-exclamation-sign"></span> There is a error.
                        </div>
                        </div>
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