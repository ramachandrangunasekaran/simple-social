import React, { Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PrivateRouter from '../router/PrivateRouter';
import PublicRouter from '../router/PublicRouter'
import '../styles/main.scss';
import HomePage from './Home/Homepage'
import LoginPage from './Login/LoginPage'
import RegisterPage from './Register/RegisterPage'

class App extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    render() {
        return (
            <div>
                <Router>
                    <Switch> 
                         {/* Only un Authorized users can use this Routes */}
                       <PublicRouter exact={true} path="/login" component={LoginPage} />
                       <PublicRouter exact={true} path="/register" component={RegisterPage} />

                       {/* Private Router */}
                        <PrivateRouter  path="/" component={HomePage}/>
                                                
                    </Switch>
                </Router>
            </div>

        );
    }
}

App.propTypes = {

};

export default App;