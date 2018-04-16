import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Title from '../../components/Title'
import Subtitle from '../../components/SubTitle'
import { connect } from 'react-redux';
import { getMyPersonalizedFeed } from '../../Actions/IPActions'
import NavbarComponent from '../../components/NavBar'
import ArticleComponent from '../Article/ArticleComponent'
class Homepage extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            feeds : []
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.props.getMyPersonalizedFeed()
    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.wallFeed.length > 0){
            console.log(nextProps.wallFeed[0])
            this.setState({feeds:nextProps.wallFeed})
        }
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
                <NavbarComponent canShowButtons={true} />
                <section style={{ marginTop: 100 }}>
                    {this.state.feeds.map((article) => 
                        (<ArticleComponent  key = {article.id} article= {article}/>)
                    )}
                </section>
            </div>
        )
    }
}

Homepage.propTypes = {
    getMyPersonalizedFeed: PropTypes.func,
    wallFeed: PropTypes.array
}

function mapStateToProps(state) {
    var returnObj = {}
    returnObj.wallFeed = state.SIMPLE.myWallFeeds
    return returnObj
}

export default connect(mapStateToProps, { getMyPersonalizedFeed })(Homepage);
