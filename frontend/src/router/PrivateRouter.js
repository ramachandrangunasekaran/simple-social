import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAuthToken } from '../helpers/utils';
class PrivateRouter extends Component {

    constructor(props) {
        super(props);
        console.log(getAuthToken())
    }


    render() {
        
        var compo = this.props.component;
        if (getAuthToken())
            return (<Route component={compo} {...this.props} />);
        else
            return <Redirect to='/login' {...this.props}/>;

        // return (<Route component={compo} {...this.props} />);
    }
}


PrivateRouter.propTypes = {
    exact: PropTypes.bool
}


export default PrivateRouter;