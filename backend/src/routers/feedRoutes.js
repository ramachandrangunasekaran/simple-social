var express = require('express');
var routes = express.Router();
var feedController = require('./../controllers/feedController')
var feedValidator = require('./../middlewares/feedMiddleware')
var {userAuth} = require('../middlewares/userValidationMiddleware');


routes.route('/').post(feedValidator.add,feedController.createNewFeed);
routes.route('/my/wall').get(userAuth,feedController.getFeeds);
routes.route('/user/:user').get(userAuth,feedController.getFeedsByUser);
routes.route('/:id').get(userAuth,feedController.getFeedsById);
routes.route('/:id').patch(feedValidator.add,feedController.updateFeed).delete(userAuth,feedController.deleteFeed);
routes.route('/like/:id').put(userAuth,feedController.likeAFeed).delete(userAuth,feedController.unLikeAFeed);
routes.route('/comment/:id').put(feedValidator.comment,feedController.commentAFeed);

module.exports = routes;