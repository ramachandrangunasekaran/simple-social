var express = require('express');
var routes = express.Router();
var relationshipController = require('./../controllers/relationshipController')
var validation = require('../middlewares/relationshipMiddleware');
var {userAuth} = require('../middlewares/userValidationMiddleware');
//routes.route('/').get(validation.userAuth,userController.getMySelf);
//routes.route('/follower').get(validation.userAuth,userController.getMySelf);

//Follow a user.
routes.route('/following').post(validation.following,relationshipController.addFollowing);
//Unfollow a user.
routes.route('/following/:username').delete(userAuth,relationshipController.deleteFollowing);
//Get following list.
routes.route('/following').get(userAuth,relationshipController.getFollowing);

//Get following list.
routes.route('/follower').get(userAuth,relationshipController.getFollowers);

module.exports = routes;