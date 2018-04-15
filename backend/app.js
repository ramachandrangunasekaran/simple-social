const cors = require('cors');
var express=require('express');
var bodyParser=require('body-parser');
var expressValidator =require('express-validator');

var promise = require("bluebird");
var session = require('express-session');
var MongoStore = require('connect-mongo')({ session: session });
var mongoose=require('mongoose');
mongoose.Promise = promise.Promise;

var config = require('./src/config/config');
var userRoutes=require('./src/routers/userRoutes');
var usersRoutes=require('./src/routers/usersRouter');


var app=express();
app.use(cors());
app.options('*', cors());
app.use(expressValidator());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
// setup db
mongoose.connect(config.db);
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

app.use(session({
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 1000 // 1 minute
    },
    secret: config.sessionSecret,
    store: new MongoStore({
      url: config.db,
      auto_reconnect: true
    })
}));
app.listen(1300,function(){
console.log("server is running in 1300");
});
app.use('/api/v1/feed',require('./src/routers/feedRoutes'))
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/users',usersRoutes);
app.use('/api/v1/relation',require('./src/routers/relationshipRoutes'))
