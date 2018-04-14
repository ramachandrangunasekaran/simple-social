
var express = require('express');
var routes = express.Router();
var userController = require('./../controllers/userController')
var validation = require('../middlewares/userValidationMiddleware');


routes.route('/').get(validation.userAuth,userController.get)
routes.route('/:username').get(validation.userAuth,userController.getByUser)
module.exports = routes;