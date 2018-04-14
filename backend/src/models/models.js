var mongoose = require('mongoose');
var shortid = require('shortid');
var timestamps = require('mongoose-timestamp');
var schema = mongoose.Schema;
var utils = require('../utils/utils')



//User Model
var userModel = new schema({
    id: {
        type: String,
        default: shortid.generate
    },
    username: {
        type: String,
        unique: true,
        required:true,
        index:true,
        lowercase: true
    },
    password: {
        type: String,
        required:true
    },
    email: {
        type: String,
        unique: true,
        required:true,
        index:true,
        lowercase: true
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


//Profile Model
var userProfileModel = new schema({
    id:{ type: String,unique:true,index:true},
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






//Relationship Model
var userFollowersModel = new schema({
    to: { type: String, required: true, index:true, ref: 'Users'  },
    myself: { type: String, required: true, index:true, ref: 'Users' }
});

userFollowersModel.virtual('following', {
    ref: 'Users',
    localField: 'to',
    foreignField: 'username',
});

userFollowersModel.virtual('followers', {
    ref: 'Users',
    localField: 'myself',
    foreignField: 'username',
});


userFollowersModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id,delete ret.id }
});

userFollowersModel.set('toObject', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id,delete ret.id }
});


module.exports = {
    usersProfileModel: mongoose.model('UserProfiles', userProfileModel),
    usersModel: mongoose.model("Users", userModel),
    usersFollowerModel: mongoose.model("Relations", userFollowersModel)
}