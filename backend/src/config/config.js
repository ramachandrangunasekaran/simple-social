var devConfig = {
    db: 'mongodb://127.0.0.1:27017/simple-social',
    sessionSecret: 'asdadioio3eqwjdhufjknfniu3jnfmio',
    jwtSecret:'c1b871b2083411a6ffcf59a550127717'
};

var prodConfig = {

};


var returnConfigForEnv = function(){
    switch (process.env.NODE_ENV) {
        case 'development':
            return devConfig;
        case 'production':
            return prodConfig;
        default:
            return devConfig;
    }
}
module.exports = returnConfigForEnv()