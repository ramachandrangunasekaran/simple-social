var utils = require('../utils/utils')

function addFeedValidation(request,res,next){
       utils.verifyJwt(request,res,function(isSuccess,req){
        req.checkBody('feed', 'feed - feed object is required').notEmpty();
        req.checkBody('feed.heading', 'feed.heading - heading is required').notEmpty();
        req.checkBody('feed.description', 'feed.description - description is required').notEmpty();
        req.checkBody('feed.type', 'feed.type - type is required').notEmpty();
        var error = req.validationErrors();
        if (error && error.length > 0) {
            utils.sendResult("Error", error[0].msg, res, false, 400);
        }
        else
            next();
    })
}

function commentAFeedValidation(request,res,next){
    utils.verifyJwt(request,res,function(isSuccess,req){
     req.checkBody('comment', 'comment - comment for the feed.').notEmpty();
     var error = req.validationErrors();
     if (error && error.length > 0) {
         utils.sendResult("Error", error[0].msg, res, false, 400);
     }
     else
         next();
 })
}


module.exports={
    add:addFeedValidation,
    comment:commentAFeedValidation
}