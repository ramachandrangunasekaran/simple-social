import React, { Component, PropTypes } from 'react';

class EmptyView extends Component {
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
        return (
            <div className="empty-div">
                <p>Nothing to show...</p>
            </div>
        );
    }
}

EmptyView.propTypes = {

};

export default EmptyView;