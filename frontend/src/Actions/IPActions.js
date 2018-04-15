import axios from 'axios';
import Constant from "../helpers/constant";
import {getAuthToken} from '../helpers/utils'
export function getMyIP() {
    return dispatch => {
        var instance = axios.create();
        var url = "https://api.ipify.org/?format=json"
        instance.get(url).then((data) => {
            if (data.status === 200) {
                dispatch({
                    type: "GET_IP_RESULT",
                    data
                })
            } 
        }).catch((error) => {
            dispatch({
                type: "ERROR",
                error
            })
        });
    }
}

export function getuserList(){
    return dispatch => {
        var instance = axios.create();
        instance.defaults.headers.common[Constant.Header.AUTHORIZATION] = getAuthToken();
        var url = Constant.URI() + Constant.Routes.USERS.ROOT
        instance.get(url).then((data) => {
            if (data.status === 200) {
                dispatch({
                    type: "GET_USER_LIST",
                    data
                })
            } 
        }).catch((error) => {
            dispatch({
                type: "ERROR",
                error
            })
        });
    }
}



export function getFollowersList(){
    return dispatch => {
        var instance = axios.create();
        instance.defaults.headers.common[Constant.Header.AUTHORIZATION] = getAuthToken();
        var url = Constant.URI() + Constant.Routes.RELATION.FOLLOWERS
        instance.get(url).then((data) => {
            if (data.status === 200) {
                dispatch({
                    type: "GET_FOLLOWERS_LIST",
                    data
                })
            } 
        }).catch((error) => {
            dispatch({
                type: "ERROR",
                error
            })
        });
    }
}


export function getFollowingList(){
    return dispatch => {
        var instance = axios.create();
        instance.defaults.headers.common[Constant.Header.AUTHORIZATION] = getAuthToken();
        var url = Constant.URI() + Constant.Routes.RELATION.FOLLOWING
        instance.get(url).then((data) => {
            if (data.status === 200) {
                dispatch({
                    type: "GET_FOLLOWING_LIST",
                    data
                })
            } 
        }).catch((error) => {
            dispatch({
                type: "ERROR",
                error
            })
        });
    }
}