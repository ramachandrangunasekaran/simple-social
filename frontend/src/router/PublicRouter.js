import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAuthToken } from '../helpers/utils';
class PublicRouter extends Component {

    constructor(props) {
        super(props);
        console.log(getAuthToken())
    }

    render() {
        if (!getAuthToken()){
            return (<Route exact = {this.props.exact} component={this.props.component} {...this.props}/>);
        }else
            return <Redirect to='/' />;
    }
}


PublicRouter.propTypes = {
    exact: PropTypes.bool.isRequired
}

export default PublicRouter;