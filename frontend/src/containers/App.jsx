import React, { Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PrivateRouter from '../router/PrivateRouter';
import PublicRouter from '../router/PublicRouter'
import '../styles/main.scss';
import HomePage from './Home/Homepage'

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
                       {/* <PublicRouter exact={true} path="/" component={HomePage} /> */}

                       {/* Private Router */}
                        {/* <PrivateRouter  path="/" component={Dashboard}/> */}

                        <Route exact path="/" component = {HomePage} />
                        
                    </Switch>
                </Router>
            </div>

        );
    }
}

App.propTypes = {

};

export default App;