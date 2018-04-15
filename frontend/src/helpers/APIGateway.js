
'use strict';
import axios from 'axios';
import { getAuthToken } from "../Helpers/utils"
import constant from "./constant";

class APIInterface {

    constructor() {

    }

    get(url, isSecure = true, callback) {
        var instance = axios.create();
        if (isSecure) {
            instance.defaults.headers.common[constant.Header.AUTHORIZATION] = getAuthToken();
        }
        instance.get(url).then((result) => {

            if (result.status === 200 && result.data.success) {
                callback(true, result.status, result.data)
            } else {
                callback(false, result.status, result.data.message)
            }
        }).catch((error) => {
            console.log(error)
            callback(false, error)
        });
    }

    post(url, data, isSecure = true, callback) {
        var instance = axios.create();
        if (isSecure) {
            instance.defaults.headers.common[constant.Header.AUTHORIZATION] = getAuthToken();
        }
        instance.post(url, data).then((result) => {
            if (result.status === 200 && result.data.success) {
                callback(true, result.status, result.data)
            } else {
                callback(false, result.status, result.data.message)
            }

        }).catch((error) => {
            console.log(error)
            callback(false, 0, error)
        });
    }


    delete(url, isSecure = true, callback) {
        var instance = axios.create();
        if (isSecure) {
            instance.defaults.headers.common[constant.Header.AUTHORIZATION] = getAuthToken();
        }
        instance.delete(url).then((result) => {
            if (result.status === 200 && result.data.success) {
                callback(true, result.status, result.data)
            } else {
                callback(false, result.status, result.data.message)
            }

        }).catch((error) => {
            console.log(error)
            callback(false, 0, error)
        });
    }

    patch(url, data, isSecure = true, callback) {
        var instance = axios.create();
        if (isSecure) {
            instance.defaults.headers.common[constant.Header.AUTHORIZATION] = getAuthToken();
        }
        instance.patch(url, data).then((result) => {
            if (result.status === 200 && result.data.success) {
                callback(true, result.status, result.data)
            } else {
                callback(false, result.status, result.data.message)
            }
        }).catch((error) => {
            callback(false, error)
            console.log(error)
        });
    }
}

export default new APIInterface();