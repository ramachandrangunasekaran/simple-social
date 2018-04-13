
var express = require('express');
var routes = express.Router();
var userController = require('./../controllers/userController')
var validation = require('../middlewares/userValidationMiddleware');


routes.route('/register').post(validation.addUser,userController.add);
routes.route('/login').post(validation.checkLogin,userController.login);
routes.route('/').get(validation.userAuth,userController.get).patch(validation.userAuth,userController.updateProfile);
routes.route('/reset-password').put(validation.changePassword,userController.changePass);
routes.route('/:username').get(validation.userAuth,userController.getByUser)

module.exports = routes;