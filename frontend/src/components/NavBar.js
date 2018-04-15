import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'

class NavBarComponent extends PureComponent {
    constructor(props) {
        super(props);

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

        var options = null
        if (this.props.canShowButtons) {
            options = (
                <span className="pull-right">
                    <a className="new-post" href="/post"></a>
                    <a className="follow-list" href="/list"></a>
                    <a className="account" href="/account"></a>
                </span>)
        }
        return (
            <nav className="navbar navbar-default fixed-top">

                <div className="nav-wrap">
                    <a className="logo pull-left" href="/"></a>
                    {options}
                </div>
            </nav>
        );
    }
}

NavBarComponent.propTypes = {
    canShowButtons: PropTypes.bool.isRequired
};

export default NavBarComponent;