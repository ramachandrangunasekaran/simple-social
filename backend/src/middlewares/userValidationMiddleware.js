var utils = require('../utils/utils')

function addUserValidation(req, res, next) {
    req.checkBody('email', 'email - Email is Required.').notEmpty();
    req.checkBody('password', 'password - Password is Required.').notEmpty();
    req.checkBody('username', 'username - Username is Required.').notEmpty();
    req.checkBody('firstname', 'firstname - First name is Required.').notEmpty();
    req.checkBody('lastname', 'lastname - Last name is Required.').notEmpty();
    req.checkBody('profilepic', 'profilepic - Profile picture is Required.').notEmpty();
    var error = req.validationErrors();
    if (error && error.length > 0) {
        utils.sendResult("Error", error[0].msg, res, false, 400);
    }
    else
        next();
}

function checkLoginValidation(req,res,next){
    req.checkBody('email', 'email - Email is Required.').notEmpty();
    req.checkBody('password', 'password - Password is Required.').notEmpty();
    var error = req.validationErrors();
    if (error && error.length > 0) {
        utils.sendResult("Error", error[0].msg, res, false, 400);
    }
    else
        next();
}
function checkAuth(request,res,next){
    utils.verifyJwt(request,res,function(isSuccess,req){
        var error = req.validationErrors();
        if (error && error.length > 0) {
            utils.sendResult("Error", error[0].msg, res, false, 400);
        }
        else
            next();
    })
    
}

function changePasswordValidation(request,res,next){
       utils.verifyJwt(request,res,function(isSuccess,req){
        req.checkBody('old_password', 'old_password - Old password is required.').notEmpty();
        req.checkBody('new_password', 'new_password - New Password is Required.').notEmpty();
        var error = req.validationErrors();
        if (error && error.length > 0) {
            utils.sendResult("Error", error[0].msg, res, false, 200);
        }
        else
            next();
    })
}

module.exports={
    addUser:addUserValidation,
    checkLogin:checkLoginValidation,
    changePassword:changePasswordValidation,
    userAuth:checkAuth,
}