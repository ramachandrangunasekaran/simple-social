
var express = require('express');
var routes = express.Router();
var userController = require('./../controllers/userController')
var validation = require('../middlewares/userValidationMiddleware');


routes.route('/register').post(validation.addUser,userController.add);
routes.route('/login').post(validation.checkLogin,userController.login);
routes.route('/').get(validation.userAuth,userController.getMySelf).patch(validation.userAuth,userController.updateProfile);
routes.route('/reset-password').put(validation.changePassword,userController.changePass);

module.exports = routes;