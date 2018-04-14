import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Title from '../../components/Title'
import Subtitle from '../../components/SubTitle'
import { connect } from 'react-redux';
import {getMyIP} from '../../Actions/IPActions'

class Homepage extends PureComponent {
    constructor(props) {
        super(props)

    }

    componentWillMount () {

    }

    componentDidMount () {
        this.props.getMyIP()
    }

    componentWillReceiveProps (nextProps) {

    }

    componentWillUpdate (nextProps, nextState) {

    }

    componentDidUpdate (prevProps, prevState) {

    }

    componentWillUnmount () {

    }

    render () {
        return (
            <div>
                <Title  title = "Welcome to Demo"/>
                <Subtitle subtitle = {this.props.ipAddress} />
            </div>
        )
    }
}

Homepage.propTypes = {
    getMyIP: PropTypes.func,
    ipAddress:PropTypes.string
}

function mapStateToProps(state) {
    var returnObj = {}
    returnObj.ipAddress = state.SIMPLE.ip_address
    return returnObj
}

export default connect(mapStateToProps, { getMyIP })(Homepage);
