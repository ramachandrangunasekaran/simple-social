var utils = require('../utils/utils');
var repo = require('../repositories/relationshipRepository');


//Get Users List.
var addFollowing = function (req, res) {
    repo.addFollower(req.body.username,req.body.to).then((users)=>{
        return  utils.sendResult("Followed", {}, res, true, 200)
    }).catch((e)=>{
        utils.sendResult("Error",e, res, false, 200)
    })
};

var deleteFollowing = function (req, res) {
    repo.deleteFollower(req.body.username,req.params.username).then((users)=>{
        return  utils.sendResult("Un Followed", {}, res, true, 200)
    }).catch((e)=>{
        return utils.sendResult("Error",e, res, false, 200)
    })
};

var getFollowing = function (req, res) {
    repo.getFollowings(req.body.username).then((followings)=>{
        return  utils.sendResult("Following list",{followings}, res, true, 200)
    }).catch((e)=>{
        return utils.sendResult("Error",e, res, false, 200)
    })
};

var getFollowers = function(req,res){
    repo.getFollowers(req.body.username).then((followers)=>{
        return  utils.sendResult("Followers list",{followers}, res, true, 200)
    }).catch((e)=>{
        return utils.sendResult("Error",e, res, false, 200)
    })
}


module.exports = {
    addFollowing,
    deleteFollowing,
    getFollowing,
    getFollowers
}