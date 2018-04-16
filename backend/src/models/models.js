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
        required: true,
        index: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        index: true,
        lowercase: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    profile: { type: schema.Types.ObjectId, ref: 'UserProfiles' }
});
userModel.plugin(timestamps);

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
    id: { type: String, unique: true, index: true },
    profilepic: { type: String },
    firstname: { type: String },
    lastname: { type: String },
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
    to: { type: String, required: true, index: true, ref: 'Users' },
    myself: { type: String, required: true, index: true, ref: 'Users' }
});

userFollowersModel.virtual('following', {
    ref: 'Users',
    localField: 'to',
    foreignField: 'username',
    justOne: true
});

userFollowersModel.virtual('followers', {
    ref: 'Users',
    localField: 'myself',
    foreignField: 'username',
    justOne: true
});


userFollowersModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id, delete ret.id }
});

userFollowersModel.set('toObject', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id, delete ret.id }
});

var feedModel = new schema({
    id: {
        type: String,
        default: shortid.generate,
        index: true,
    },
    username: {
        type: String,
        required: true,
        index: true,
        ref: 'Users'
    },
    feed: {
        type: Object, default: {
            heading: "",
            description: "",
            type: "text",
            picture: ""
        }
    },
    likes_count: {type:Number,default:0},
    comments_count: {type:Number,default:0},
    likes_list: { type: [String], ref: 'Users' },
    comments_list: { type: [String], ref: 'Comments' },
});


feedModel.pre('validate', function (next) {
    this.likes_count = this.likes_list.length
    this.comments_count = this.comments_list.length
    next();
});

feedModel.plugin(timestamps);
feedModel.virtual('likes', {
    ref: 'Users',
    localField: 'likes_list',
    foreignField: 'username',
});
feedModel.virtual('owner', {
    ref: 'Users',
    localField: 'username',
    foreignField: 'username',
    justOne: true
});
feedModel.virtual('comments', {
    ref: 'Comments',
    localField: 'comments_list',
    foreignField: 'id',
});

feedModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id, delete ret.likes_list,delete ret.comments_list, delete ret.username}
});

feedModel.set('toObject', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id, delete ret.likes_list,delete ret.comments_list,delete ret.username }
});


var commentModel = new schema({
    id: {
        type: String,
        default: shortid.generate
    },
    by: { type: String, required: true, index: true, ref: 'Users' },
    feed: {
        type: String
    },
    comment: {
        type: String
    }
});
commentModel.virtual('user', {
    ref: 'Users',
    localField: 'by',
    foreignField: 'username',
    justOne: true
});
commentModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

commentModel.set('toObject', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});
commentModel.plugin(timestamps);



module.exports = {
    usersProfileModel: mongoose.model('UserProfiles', userProfileModel),
    usersModel: mongoose.model("Users", userModel),
    usersFollowerModel: mongoose.model("Relations", userFollowersModel),
    userFeedsModel: mongoose.model("Feeds", feedModel),
    userCommentModel: mongoose.model("Comments", commentModel)
}