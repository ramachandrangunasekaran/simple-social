var models = require('./../models/models');
var utils = require('../utils/utils');
var userRepo = require('../repositories/userRepository')
var config = require('../config/config')
var axios = require("axios");
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

//Get Users List.
var getUsers = function (req, res) {
    userRepo.getUsers(req).then((users)=>{
        return  utils.sendResult("User list.", {users}, res, true, 200)
    }).catch((e)=>{
        utils.sendResult("Error",e, res, false, 200)
    })
};


//Get Users List.
var getMySelf = function (req, res) {
    utils.sendResult("Your profile", req.body.user, res, true, 200)
};


//Update profile.
var updateProfile = function (req, res) {
    userRepo.update(req).then((profile)=>{
        return  utils.sendResult("Profile updated successfully.", profile, res, true, 200)
    }).catch((e)=>{
        utils.sendResult("Error", e, res, false, 200)
    })
}

//Get a user.
var getUserByUsername = function (req, res) {
    userRepo.getUserByUsername(req.params.username).then((user)=>{
    }).catch((err)=>{
        utils.sendResult("Error", err, res, false, 200)
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
                            utils.sendResult("password changed successfully.", {}, res, true, 200)
                        });
                    });
                } else {
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
                    var token = jwt.sign({user}, config.jwtSecret, {
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
    userRepo.create(req.body).then(function (user) {
        utils.sendResult("User created successfully.", user, res, true, 200)
    }).catch(function (e) {
        utils.sendResult("Error", e, res, false, 200)
    })
}


//Create a Mock user.
var mockRegisterUser = function (req, res) {
    axios.get(' https://randomuser.me/api/')
        .then(function (response) {
            var data = response.data.results[0]
            userRepo.create({
                email: data.email,
                username: data.login.username,
                password: data.login.username,
                lastname: data.name.last,
                firstname: data.name.first,
                profilepic: data.picture.large
            }).then(function (user) {
                utils.sendResult("User created successfully.", user, res, true, 200)
            }).catch(function (e) {
                utils.sendResult("Error", e, res, false, 200)
            })
        }).catch(function (error) {
            utils.sendResult("Error", e.toJSON(), res, false, 200)
        });
}



var CheckUsername = function(req,res){
    models.usersModel.findOne({ username: req.params.username }).select("username").exec(function (err, userData) {
        if (err) {
            return utils.sendResult("Error", err.message, res, false, 200)
        } else {
            if (userData) {
                utils.sendResult("Username already exist!", {}, res, false, 200)
            } else {
                utils.sendResult("Username not found!", {}, res, true, 200)
            }

        }
    });
}



module.exports = {
    getMySelf,
    get: getUsers,
    getByUser: getUserByUsername,
    updateProfile,
    add: addUser,
    check:CheckUsername,
    login: logInUser,
    changePass: changePassword,
    mockAdd: mockRegisterUser

};
