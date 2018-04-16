var Promise = require('bluebird');
var utils = require('../utils/utils');
var lo = require('lodash')
var models = require('./../models/models');
require('mongoose-pagination');

var createNew = function (req) {
    var feed = new models.userFeedsModel({
        username: req.body.username,
        feed: req.body.feed,
    });
    return new Promise(function (resolved, rejected) {
        feed.save(function (err) {
            if (err) return rejected(err)
            return resolved(feed)
        });
    });
}


var updateFeed = function (req) {
    return new Promise(function (resolved, rejected) {
        models.userFeedsModel.findOneAndUpdate({ username: req.body.username, id: req.params.id }, { $set: { feed: req.body.feed } }, { new: true }, (err, feed) => {
            if (err) return rejected(err)
            return resolved(feed)
        })
    });
}


var deleteFeed = function (req) {
    return new Promise(function (resolved, rejected) {
        models.userFeedsModel.findOneAndRemove({ username: req.body.username, id: req.params.id }, (err) => {
            if (err) return rejected(err)
            return resolved({})
        })
    });
}


var like = function (req) {
    return new Promise(function (resolved, rejected) {
        models.userFeedsModel.findOne({ id: req.params.id }, (err, feed) => {
            if (err) return rejected(err)
            if (feed) {
                feed.likes_list.push(req.body.username)
                feed.likes_list = lo.uniq(feed.likes_list);
                feed.save(function () {
                    resolved({})
                })
            } else {
                return rejected("No feed found!!!")
            }
        })
    });
}


var unlike = function (req) {
    return new Promise(function (resolved, rejected) {
        models.userFeedsModel.findOne({ id: req.params.id }, (err, feed) => {
            if (err) return rejected(err)
            if (feed) {
                feed.likes_list = feed.likes_list.filter(function (i) {
                    return i != req.body.username
                });
                feed.save(function () {
                    resolved({})
                })
            } else {
                return rejected("No feed found!!!")
            }
        })
    });
}


var comment = function (req) {
    var comment = new models.userCommentModel({
        by: req.body.username,
        comment: req.body.comment,
        feed: req.params.id
    })
    return new Promise(function (resolved, rejected) {
        models.userFeedsModel.findOne({ id: req.params.id }, (err, feed) => {
            if (err) return rejected(err)
            if (feed) {
                comment.save((err) => {
                    if (err) return rejected(err)
                    feed.comments_list.push(comment.id)
                    feed.comments_list = lo.uniq(feed.comments_list);
                    feed.save((err) => {
                        if (err) return rejected(err)
                        return resolved({})
                    })
                })
            } else {
                return rejected("No feed found!!!")
            }
        })
    });
}



var getFeeds = function (req) {
    var limit = lo.isEmpty(req.query.limit) ? 100 : lo.toNumber(req.query.limit)
    var page = lo.isEmpty(req.query.page) ? 1 : lo.toNumber(req.query.page)
    return new Promise(function (resolved, rejected) {
        models.usersFollowerModel.find({myself:req.body.username}).distinct("to")
        .exec(function(err,followings){
         if(err) return rejected(err);
         followings.push(req.body.username)
         models.userFeedsModel.find({username: { $in: followings }},'-_id -__v -comments_list -likes_list',{lean: true}).sort([['updatedAt', -1]]).populate({
            path: 'owner',
            model: 'Users',
            select: "-_id -__v -password",
            populate: [{
                path: 'profile',
                model: 'UserProfiles',
                select: "-_id -__v -user",
            }]
        }).paginate(page, limit, (err, list, total) => {
            if (err) return rejected(err)
            if (list) {
                var feeds = {}
                feeds.list = list
                feeds.total = total
                feeds.page = page
                feeds.next_page = page + 1
                return resolved(feeds)
            } else {
                return rejected("No feed found!!!")
            }
        })
        });
        
    });
}

var getFeedByUser = function (req) {
    var limit = lo.isEmpty(req.query.limit) ? 100 : lo.toNumber(req.query.limit)
    var page = lo.isEmpty(req.query.page) ? 1 : lo.toNumber(req.query.page)
    return new Promise(function (resolved, rejected) {
        models.userFeedsModel.find({username:req.params.user},'-_id -__v -comments_list -likes_list -username',{lean: true}).sort([['updatedAt', -1]]).populate({
            path: 'owner',
            model: 'Users',
            select: "-_id -__v -password",
            populate: [{
                path: 'profile',
                model: 'UserProfiles',
                select: "-_id -__v -user",
            }]
        }).paginate(page, limit, (err, list, total) => {
            if (err) return rejected(err)
            if (list) {
                var feeds = {}
                feeds.list = list
                feeds.total = total
                feeds.page = page
                feeds.next_page = page + 1
                return resolved(feeds)
            } else {
                return rejected("No feed found!!!")
            }
        })
        
    });
}

var getParticularFeed = function (req) {
    return new Promise(function (resolved, rejected) {
        models.userFeedsModel.findOne({ id: req.params.id }).populate({
            path: 'comments',
            model: 'Comments',
            populate: [{
                path: 'user',
                model: 'Users'
            }]
        }).populate({
            path: 'likes',
            model: 'Users',
            populate: [{
                path: 'profile',
                model: 'UserProfiles'
            }]
        }).exec((err, feed) => {
            if (err) return rejected(err)
            if (feed) {
                return resolved(feed)
            } else {
                return rejected("No feed found!!!")
            }
        })
        
    });
}

module.exports = {
    createNew,
    updateFeed,
    deleteFeed,
    like,
    unlike,
    comment,
    getFeeds,
    getFeedByUser,
    getParticularFeed
}