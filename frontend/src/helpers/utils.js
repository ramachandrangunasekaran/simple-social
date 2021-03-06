import constant from "./constant";
import cookie from 'react-cookies'
var crypt = require('simple-encryptor')("ab0f75dbc9f1f8cc295e59d45478c86e");
const _ = require('lodash')

export function getAuthToken() {
    var token = cookie.load(constant.abbriv.AUTH)
    return token
}

export function validateEmail(email){
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export function validateNumber(number){
    var re = /^\d+(\.\d+)?$/
    return re.test(number)
}



export function randomString(len) {
    var charSet ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}


export function setCookie(key,value){
    
    const expires = new Date()
    expires.setDate(Date.now() + 15)
    cookie.save(
        key,
        value,
        {
          path: '/',
          expires,
          maxAge: 1000000,
          secure: false
        }
      )
}



export function getCookie(key){
    var obj = cookie.load(key)
    if (obj != "undefined") {
        return crypt.decrypt(obj);
    } else {
        return ""
    }
    return 
}
export function removeCookie(key){
    return cookie.remove(key,{ path: '/' })
}

export function setSessionStorage(key,value) {
    return sessionStorage.setItem(key, crypt.encrypt(value))
}

export function getSessionStorage(key){
    var obj = sessionStorage.getItem(key)
    if (obj != "undefined") {
        return crypt.decrypt(obj);
    } else {
        return null
    }
    
}

export function removeSessionStorage(key){
    return sessionStorage.removeItem(key)
}

export function setLocalStorage(key,value){
    return localStorage.setItem(key, crypt.encrypt(value))
}

export function getLocalStorage(key,value){
    var obj = localStorage.getItem(key)
    if (obj != "undefined") {
        return crypt.decrypt(obj);
    } else {
        return null
    }
}

export function removeLocalStorage(key){
    return localStorage.removeItem(key)
}


export function returnFormatedDate(dateString) {
    var date = new Date(dateString)
    return date.toDateString()
}
