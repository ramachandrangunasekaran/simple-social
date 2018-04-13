var models = require('./../models/models');
var utils = require('../utils/utils')
var config = require('../config/config')
var lo = require('lodash');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var moment = require('moment');
require('mongoose-pagination');





//Get Users List.
var getUsers = function (req, res) {

    var limit = lo.isEmpty(req.query.limit) ? 10 : lo.toNumber(req.query.limit)
    var page = lo.isEmpty(req.query.page) ? 1 : lo.toNumber(req.query.page)
    models.usersModel.find().populate('profile').paginate(page, limit, function (err, users, total) {
        if (err) {
            utils.sendResult("Error", err.message, res, false, 200)
        } else {
            var u = {}
            var usersList = {}
            usersList.users = users
            usersList.total = total
            usersList.page = page
            usersList.next_page = page + 1
            u.users_list = usersList
            utils.sendResult("User list.", u, res, true, 200)
        }
    });
};



var updateProfileByUsername =  function (req, res) {
    models.usersProfileModel.findOneAndUpdate({ username: req.params.username }, { new: true }).populate('user').exec( function (err, profileData) {
        if (err) {
            utils.sendResult("Error", err.message, res, false, 200)
        } else {
            utils.deleteKey(req,["username","user","id"])
            for (var p in req.body) {
                profileData[p] = req.body[p];
            }
            profileData.save(function (err) {
                if (err) {
                    utils.sendResult("Error", err.message, res, false, 200)
                } else {
                    var profile = {}
                    profile.profile = profileData
                    utils.sendResult("Profile updated successfully.", profile, res, true, 200)
                }
            });
        }
    });
}



//Get a user.
var getUserByUsername = function (req, res) {
    models.usersModel.findOne({ username: req.params.username }).populate('profile').exec(function (err, userData) {
        if (err) {
            utils.sendResult("Error", err.message, res, false, 200)
        } else {
            if (userData) {
                var user = {}
                user.user = userData
                utils.sendResult("User Detail.", user, res, true, 200)
            } else {
                utils.sendResult("Error", "User not found!", res, false, 200)
            }

        }
    });
};


var changePassword = function (req, res) {
    models.usersModel.findOne({ username: req.body.username }).populate('profile').exec(function (err, user) {
        if (err) {
            utils.sendResult("Error", err.toJSON(), res, false, 200)
            return
        } else if (user == null) {
            utils.sendResult("Error", "User not found", res, false, 200)
            return
        } else {
            bcrypt.compare(req.body.old_password, user.password, function (err, result) {
                if (err) {
                    utils.sendResult("Error", err.toJSON(), res, false, 200)
                    return
                }
                
                if (result == true) {
                    bcrypt.hash(req.body.new_password, null, null, function (err, hash) {
                        if (err) {
                            utils.sendResult("Error", err.toJSON(), res, false, 200)
                            return
                        }
                        user.password = hash
                        user.save(function (err) {
                            utils.sendResult("password changed successfully.",{}, res, true, 200)
                        });
                    });
                }else{
                    utils.sendResult("Current password doesn't match.", {}, res, true, 200)
                }
            });
        }  
    })
}

var logInUser = function (req, res) {
    models.usersModel.findOne({ email: req.body.email }).populate('profile').populate('last_CheckIn').exec(function (err, user) {
        if (err) {
            utils.sendResult("Error", err.toJSON(), res, false, 200)
            return
        } else if (user == null) {
            utils.sendResult("Error", "User not found", res, false, 200)
            return
        } else {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (err) {
                    utils.sendResult("Error", err.toJSON(), res, false, 200)
                    return
                }
                if (result == true) {
                    var users = {}
                    // create a token
                    var token = jwt.sign({ user: user }, config.jwtSecret, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    users.user = user
                    users.token = token
                    utils.sendResult("User login successfull", users, res, true, 200)
                } else {
                    utils.sendResult("Error", "Email/Password wrong.", res, false, 200)
                }

            });
        }
    });
}

//Create a user.
var addUser = function (req, res) {
    var user = new models.usersModel(req.body);
    bcrypt.hash(req.body.password, null, null, function (err, hash) {
        if (err) {
            utils.sendResult("Error", err.toJSON(), res, false, 200)
            return
        }
        user.password = hash
        user.save(function (err) {
            if (err) {
                switch (err.code) {
                    case 11000:
                        utils.sendResult("Error", "email/username already available.", res, false, 200)
                        break;
                    default:
                        utils.sendResult("Error", err.toJSON(), res, false, 200)
                        break;
                }
            } else {
                var profile = new models.usersProfileModel({
                    user: user._id,
                    id: user.id,
                    lastname:req.body.lastname,
                    firstname:req.body.firstname,
                    profilepic:req.body.profilepic
                });
                profile.save(function (err) {
                    if (err) return handleError(err);
                    user.profile = profile;
                    user.save(function (err) {
                        if (err) return handleError(err);
                        var users = {}
                        users.user = user
                        utils.sendResult("User created successfully.", users, res, true, 200)
                    });

                });

            }
        });
    });

}



module.exports = {
    get: getUsers,
    getByUser: getUserByUsername,
    updateProfile: updateProfileByUsername,
    add: addUser,
    login: logInUser,
    changePass:changePassword,

};
