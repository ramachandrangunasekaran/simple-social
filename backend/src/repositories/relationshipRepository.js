var Promise = require('bluebird');
var utils = require('../utils/utils');
var lo = require('lodash')
var models = require('./../models/models');



var returnFollowingList = function(list){
    var following = []
    list.map((f)=>{
        following = [...following,f.following[0]]
    })
    return following
}

var returnFollowerList = function(list){
    var followers = []
    list.map((f)=>{
        followers = [...followers,f.followers[0]]
    })
    return followers
}

var addFollower = function (myself, to) {
    var follower = new models.usersFollowerModel({ myself, to })
    return new Promise(function (resolved, rejected) {
        models.usersFollowerModel.findOneAndUpdate(
            { 
                myself, 
                to
            },
            follower,
            { upsert: true, new: true, runValidators: true },
            function (err, doc) { // callback
                if (err) {
                    rejected(err)
                } else {
                    return resolved({})
                }
            }
        );
    });
}

var deleteFollower = function (myself, to) {
    return new Promise(function (resolved, rejected) {
        models.usersFollowerModel.findOneAndRemove(
            { 
                myself, 
                to
            },
            function (err) { // callback
                if (err) {
                    rejected(err)
                }  
                return resolved({})
            }
        );
    });
}


var getFollowings = function (username) {
    return new Promise(function (resolved, rejected) {
        models.usersFollowerModel.find({myself:username}).populate({
            path: 'following',
            model: 'Users',
            populate: [{
                path: 'profile',
                model: 'UserProfiles'
            }]
        }).select("to")
        .exec(function(err,followings){
         if(err) return rejected(err);
         return resolved({list:returnFollowingList(followings)})
        });
    });
}

var getFollowers = function(username){
    return new Promise(function (resolved, rejected) {
        models.usersFollowerModel.find({to:username}).populate({
            path: 'followers',
            model: 'Users',
            populate: [{
                path: 'profile',
                model: 'UserProfiles'
            }]
        }).select('myself')
        .exec(function(err,followers){
         if(err) return rejected(err);
         return resolved({list:returnFollowerList(followers)})
        });
    });
}




module.exports = {
    addFollower,
    deleteFollower,
    getFollowings,
    getFollowers
}