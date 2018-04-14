import React, { Component } from 'react';
import NavBarComponent from './../../components/NavBar'
class LoginPage extends Component {
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
            <div>
                <NavBarComponent canShowButtons={false} />
                <article className="post-wrap">
                    <div className="container container-signup">
                        <div className="signup-text text-center">
                            <h3>Log In</h3>
                        </div>
                        <form>
                            <div className="form-group">
                                <label className="col-form-label" htmlFor="email">Your Email</label>
                                <input type="email" className="form-control" id="email" name="email" placeholder="Enter your email." />
                            </div>
                            <div className="form-group">
                                <label className="col-form-label" htmlFor="password">Your Password</label>
                                <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password." />
                            </div>
                            <div className="align-content-center">
                                <button className="btn btn-primary standard-signup">Sign in</button>
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