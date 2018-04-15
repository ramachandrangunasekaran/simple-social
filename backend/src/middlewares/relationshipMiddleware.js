var utils = require('../utils/utils')

function addFollowingValidation(request,res,next){
       utils.verifyJwt(request,res,function(isSuccess,req){
        req.checkBody('to', 'to - username of whom you are following is required!').notEmpty();
        var error = req.validationErrors();
        if (error && error.length > 0) {
            utils.sendResult("Error", error[0].msg, res, false, 400);
        }
        else
            next();
    })
}

module.exports={
    following:addFollowingValidation,
}