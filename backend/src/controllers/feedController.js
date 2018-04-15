var utils = require('../utils/utils');
var repo = require('../repositories/feedRepository');


//Create new Feed.
var createNewFeed = function (req, res) {
    repo.createNew(req).then((feed)=>{
        utils.sendResult("Feed created successfully.", {feed}, res, true, 200)
    }).catch((e)=>{
        utils.sendResult("Error", e, res, false, 200)
    })
};

//Create new Feed.
var updateFeed = function (req, res) {
    repo.updateFeed(req).then((feed)=>{
        utils.sendResult("Feed updated successfully.", {feed}, res, true, 200)
    }).catch((e)=>{
        utils.sendResult("Error", e, res, false, 200)
    })
};

//Delete a Feed.
var deleteFeed = function (req, res) {
    repo.deleteFeed(req).then(()=>{
        utils.sendResult("Feed deleted successfully.", {}, res, true, 200)
    }).catch((e)=>{
        utils.sendResult("Error", e, res, false, 200)
    })
};


//Like a Feed.
var likeAFeed = function (req, res) {
    repo.like(req).then(()=>{
        utils.sendResult("Feed liked successfully.", {}, res, true, 200)
    }).catch((e)=>{
        utils.sendResult("Error", e, res, false, 200)
    })
};

//Un Like a Feed.
var unLikeAFeed = function (req, res) {
    repo.unlike(req).then(()=>{
        utils.sendResult("Feed unliked successfully.", {}, res, true, 200)
    }).catch((e)=>{
        utils.sendResult("Error", e, res, false, 200)
    })
};


//Comment a Feed.
var commentAFeed = function (req, res) {
    repo.comment(req).then(()=>{
        utils.sendResult("Comment added to a feed successfully.", {}, res, true, 200)
    }).catch((e)=>{
        utils.sendResult("Error", e, res, false, 200)
    })
};


//Get Feed.
var getFeeds = function (req, res) {
    repo.getFeeds(req).then((feeds)=>{
        utils.sendResult("Your news feeds", {feeds}, res, true, 200)
    }).catch((e)=>{
        utils.sendResult("Error", e, res, false, 200)
    })
};

//Get Feeds for particular user.
var getFeedsByUser = function (req, res) {
    repo.getFeedByUser(req).then((feeds)=>{
        utils.sendResult("User's feeds", {feeds}, res, true, 200)
    }).catch((e)=>{
        utils.sendResult("Error", e, res, false, 200)
    })
};

//Get Particular Feed.
var getFeedsById = function (req, res) {
    repo.getParticularFeed(req).then((feed)=>{
        utils.sendResult("Particular feed.", {feed}, res, true, 200)
    }).catch((e)=>{
        utils.sendResult("Error", e, res, false, 200)
    })
};


module.exports = {
    createNewFeed,
    updateFeed,
    deleteFeed,
    likeAFeed,
    unLikeAFeed,
    commentAFeed,
    getFeeds,
    getFeedsByUser,
    getFeedsById
}