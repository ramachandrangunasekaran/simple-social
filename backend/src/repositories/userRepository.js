var Promise = require('bluebird');
var utils = require('../utils/utils');
var models = require('./../models/models');
var bcrypt = require('bcrypt-nodejs');
var lo = require('lodash');
require('mongoose-pagination');

var getUsers = function (req) {

    var limit = lo.isEmpty(req.query.limit) ? 100 : lo.toNumber(req.query.limit)
    var page = lo.isEmpty(req.query.page) ? 1 : lo.toNumber(req.query.page)
    return new Promise(function (resolved, rejected) {
        models.usersModel.find({ username: { $ne: req.body.username } }).populate('profile').paginate(page, limit, function (err, users, total) {
            if (err) {
                return rejected(err.message)
            } else {

                var usersList = {}
                usersList.list = users
                usersList.total = total
                usersList.page = page
                usersList.next_page = page + 1
                return resolved(usersList)
            }
        });
    });
}

var create = function (body) {
    return new Promise(function (resolved, rejected) {
        var user = new models.usersModel(body);
        bcrypt.hash(body.password, null, null, function (err, hash) {
            if (err) {
                rejected(err.toJSON())
                return
            }
            user.password = hash
            user.save(function (err) {
                if (err) {
                    switch (err.code) {
                        case 11000:
                            return rejected("email/username already available.")
                        default:
                            return rejected(err.toJSON())
                    }
                } else {
                    var profile = new models.usersProfileModel({
                        user: user._id,
                        id: user.id,
                        lastname: body.lastname,
                        firstname: body.firstname,
                        profilepic: body.profilepic
                    });
                    profile.save(function (err) {
                        if (err) return rejected(err.toJSON())
                        user.profile = profile;
                        user.save(function (err) {
                            if (err) return rejected(err.toJSON())
                            var users = {}
                            users.user = user
                            return resolved(users)
                        });

                    });
                }
            });
        });
    })
}

var update = function (req) {
    return new Promise(function (resolved, rejected) {
        models.usersProfileModel.findOneAndUpdate({ id: req.body.user.id }, { new: true }).exec(function (err, profileData) {
            if (err) {
                return rejected(err.toJSON())
            }
            if (profileData === null) {
                return rejected("User not found.")
            } else {
                utils.deleteKey(req, ["username", "user", "id"])
                for (var p in req.body) {
                    profileData[p] = req.body[p];
                }
                
                profileData.save(function (err) {
                    if (err) {
                        return rejected(err.toJSON())
                    } else {
                        var profile = {}
                        profile.profile = profileData
                        return resolved(profile)
                    }
                });
            }
        });
    });
}


var getUserByUsername = function (username) {
    return new Promise(function (resolved, rejected) {
        models.usersModel.findOne({ username }).populate('profile').exec(function (err, userData) {
            if (err) {
                return rejected(err)
            } else {
                if (userData) {
                    var user = {}
                    user.user = userData
                    return resolved(user)
                } else {
                    return rejected("User not found!")
                }
            }
        });
    });
}



module.exports = {
    create,
    getUsers,
    update,
    getUserByUsername
}