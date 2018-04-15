import React, { Component } from 'react';
import PropTypes from 'prop-types'
import NavBarComponent from '../../components/NavBar'
import { connect } from 'react-redux';
import { getuserList, getFollowersList, getFollowingList } from '../../Actions/IPActions'
import { getAuthToken } from '../../helpers/utils'
import Constant from '../../helpers/constant'
import APIInstance from '../../helpers/APIGateway'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import UserList from './UsersList'
const lo = require('lodash')
class ListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            userList: [],
            searchedList: [],
            currentTab: 1,
            showLoading: true
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleTab = this.handleTab.bind(this);
        this.handleUserManipulation = this.handleUserManipulation.bind(this)
    }


    handleUserManipulation(user, toFollow) {
        if (toFollow) {
            this.followUser(user)
        } else {
            this.unfollowUser(user)
        }

    }


    followUser(username) {
        var userList = this.state.userList
        APIInstance.post(Constant.URI() + Constant.Routes.RELATION.FOLLOWING, { to: username }, true, (isSuccess, statusCode, result) => {
            if (isSuccess && statusCode) {
                var index = _.findIndex(userList, { username })
                if (index !== -1) {
                    userList[index].isFollowed = true
                }
                this.setState({ userList })
            }
        })
    }

    unfollowUser(username) {
        var userList = this.state.userList
        APIInstance.delete(Constant.URI() + Constant.Routes.RELATION.FOLLOWING + "/" + username, true, (isSuccess, statusCode, result) => {
            if (isSuccess && statusCode) {
                var index = _.findIndex(userList, { username })
                if (index !== -1) {
                    userList[index].isFollowed = false
                }
                this.setState({ userList })
            }
        })
    }


    handleTab(e) {
        this.setState({ currentTab: e })
        switch (e) {
            case 1:
                this.props.getFollowingList()
                this.props.getuserList()

            case 2:
                return this.props.getFollowersList()
        }
    }


    handleSearch(e) {
        var self = this
        var arr = this.state.userList
        if (lo(e.target.value).isEmpty()) {
            self.setState({ searchedList: self.state.userList })
        }
        self.setState({ [e.target.name]: e.target.value }, function () {
            self.setState({ searchedList: arr.filter(x => _(x.username).lowerCase().startsWith(self.state.username)) })
        })
    }

    componentDidMount() {
        this.props.getFollowingList()
        this.props.getuserList()

    }

    componentWillReceiveProps(nextProps) {
        var userList = nextProps.userList
        var fL = nextProps.followingList
        if (this.state.currentTab === 1) {
            fL.map((username) => {
                var index = _.findIndex(userList, { username })
                if (index !== -1) {
                    userList[index].isFollowed = true
                }
            })
            this.setState({ userList, showLoading: false })
        }
    }

    render() {
        var userList = (<div name="user-list">
            <div className="container container-signup">
                {/* <div className="input-group">
                    <span className="input-group-addon">@</span>
                    <input type="text" className="form-control" value={this.state.username} onChange={this.handleSearch} id="username" name="username" placeholder="search with username" />
                </div> */}
                <div>
                    <UserList list={this.state.userList} canShowButton={true} onUserClick={this.handleUserManipulation} />
                </div>
            </div>
        </div>)

        var followerList = (<div name="follower-list">
            <div className="container container-signup">
                <div>
                    <UserList list={this.props.followersList} canShowButton={false} />
                </div>
            </div>
        </div>)
        return (
            <div className="container-fluid">
                <NavBarComponent canShowButtons={true} />
                <article className="post-wrap" style={{ marginTop: 150 }}>
                    <ul className="nav nav-pills tab-list">
                        <li><a onClick={() => this.handleTab(1)}>User List</a></li>
                        <li><a onClick={() => this.handleTab(2)}>Followers</a></li>
                    </ul>

                    {this.state.showLoading ? <div className="empty-div"><p>Loading...</p></div> : this.state.currentTab === 1 ? userList : followerList}
                </article>
            </div>
        );
    }
}

ListPage.propTypes = {
    getuserList: PropTypes.func,
    getFollowersList: PropTypes.func,
    getFollowingList: PropTypes.func,
    userList: PropTypes.array,
    followersList: PropTypes.array,
    followingList: PropTypes.array,
};

function mapStateToProps(state) {

    var returnObj = {
        userList: state.SIMPLE.userList,
        followersList: state.SIMPLE.followersList,
        followingList: state.SIMPLE.followingList,
    }
    return returnObj
}

export default connect(mapStateToProps, { getuserList, getFollowersList, getFollowingList })(ListPage);
