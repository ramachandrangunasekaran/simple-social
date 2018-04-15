import React, { Component } from 'react';
import PropTypes from 'prop-types'
import EmptyView from '../../components/EmptyView'
class UserList extends Component {
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
        var button = null
        if (!this.props.list) {
            return null
        } else {
            if (this.props.list.length === 0) {
                return <EmptyView />
            }
            return (
                <table className="table" style={{ marginTop: 20 }}>
                    <tbody>
                        {
                            this.props.list.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <div style={{ display: "inline-block" }}>
                                            <img width={30} src={user.profile.profilepic} height={30} style={{ borderRadius: 15 }} />
                                        </div>
                                        <div style={{ display: "inline-block", marginLeft: 20, marginTop: 5, fontSize: 14 }}>{user.profile.firstname} {user.profile.lastname}<span style={{ marginLeft: 5, fontSize: 12, color: "#acacac", textDecoration: "underline", fontStyle: "italic" }}>@{user.username}</span></div>
                                        <div>
                                        </div>
                                    </td>
                                    {this.props.canShowButton ? <td style={{ textAlign: "right" }}>{user.isFollowed ? <a className="follow-button unfollow" onClick={() => this.props.onUserClick(user.username, false)}>Unfollow</a> : <a className="follow-button" onClick={() => this.props.onUserClick(user.username, true)}>Follow</a>}</td> : null}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            );
        }




    }
}

UserList.propTypes = {
    list: PropTypes.array,
    canShowButton: PropTypes.bool.isRequired,
    onUserClick: PropTypes.func,
};

export default UserList;