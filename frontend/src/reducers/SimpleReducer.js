import initialState from './InitialState';
const lo = require('lodash') 

function parseIPResult(old_state, action) {
    var new_state = {}
    var new_state = {}
    new_state = Object.assign(new_state,old_state);

    new_state.ip_address = action.data.data.ip
    return new_state;
}

function parseUserList(old_state, action) {
    var users = action.data.data.data.users
    var new_state = {}
    new_state = Object.assign(new_state,old_state);

    new_state.userList = users.list
    return new_state;
}

function parseFollowersList(old_state, action) {
    var followers = action.data.data.data.followers
    var new_state = {}
    new_state = Object.assign(new_state,old_state);
    new_state.followersList = followers.list
    return new_state;
}

function parseFollowingList(old_state, action) {
    var following = action.data.data.data.followings
    var list = []
    lo(following.list).forEach((user)=>{
       list.push(user.username)
    })
    var new_state = {}
    new_state = Object.assign(new_state,old_state);
    new_state.followingList = list
    return new_state;
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_IP_RESULT':
            return parseIPResult(state, action);
        case 'GET_USER_LIST':
            return parseUserList(state, action);
        case 'GET_FOLLOWERS_LIST':
            return parseFollowersList(state, action);
        case 'GET_FOLLOWING_LIST':  
            return parseFollowingList(state, action);
        default:
            return state
    }
}
