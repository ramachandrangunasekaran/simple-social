var mongoose = require('mongoose');
var shortid = require('shortid');
var timestamps = require('mongoose-timestamp');
var schema = mongoose.Schema;
var utils = require('../utils/utils')

var userModel = new schema({
    id: {
        type: String,
        default: shortid.generate
    },
    username: {
        type: String,
        unique: true,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    email: {
        type: String,
        unique: true,
        required:true
    },
    is_active:{
        type: Boolean,
        default:true
    },
    profile: { type: schema.Types.ObjectId, ref: 'UserProfiles' }
});

userModel.set('toJSON', {
    virtuals: false,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id, delete ret.password }
});

userModel.set('toObject', {
    virtuals: false,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id, delete ret.password }
});



var userProfileModel = new schema({
    id:{ type: String,unique:true},
    profilepic:{type:String},
    firstname:{ type: String},
    lastname:{type:String},
    user: { type: schema.Types.ObjectId, ref: 'Users' }
});

userProfileModel.set('toJSON', {
    virtuals: false,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

userProfileModel.set('toObject', {
    virtuals: false,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});



module.exports = {
    usersProfileModel: mongoose.model('UserProfiles', userProfileModel),
    usersModel: mongoose.model("Users", userModel)
}