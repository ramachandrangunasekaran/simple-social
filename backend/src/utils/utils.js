var moment = require('moment');
var jwt = require('jsonwebtoken');
var config = require('../config/config')
var lo = require('lodash');

function Utils() {

    this.sendResult = function (message, data, res, error, code) {
        var result = {};
        result.message = message;
        result.success = error;
        result.data = data;
        res.statusCode = code;
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(result));
    }

    this.deleteKey = function(req,key){
        if(key instanceof Array){
            key.map((k)=>{
                if (req.body[k]) {
                    delete req.body[k];
                }
            })
        }else if (key instanceof String){
            if (req.body[key]) {
                delete req.body[key];
            }
        }
        
    }

    this.verifyJwt = function (req, res, callback) {
        var token = req.headers['x-access-token'];
        if (!token)
            return res.status(401).send({ message: 'unauthorized' });
        jwt.verify(token, config.jwtSecret, function (err, decoded) {
            if (err) return res.status(401).send({ message: 'unauthorized' });
            req.body['user'] = decoded.user
            req.body['id'] = decoded.user.id
            req.body['username'] = decoded.user.username
            callback(true, req)
        })
    }
}



module.exports = new Utils();