module.exports = {
    Domain: {
        APP_DOMAIN:'localhost:8080',
        API_URL: 'http://127.0.0.1:1300',
        API_VERSION: '/api/v1'
    },
    URI: function(){
        return this.Domain.API_URL + this.Domain.API_VERSION
    },
    Header:{
        AUTHORIZATION: 'x-access-token'
    },

    Routes: {
        USER:{
            ROOT:'/user',
            LOGIN: "/user/login",
            REGISTER: "/user/register",
            CHECK:'/user/check'
        },
        USERS:{
            ROOT:'/users',
        },
        RELATION:{
            ROOT:'/relation',
            FOLLOWERS:'/relation/follower',
            FOLLOWING: '/relation/following',
        },
        FEED:{
            ROOT:'/feed',
            PERSONALIZED_FEED:'/feed/my/wall'

        }
        
    },
    abbriv: {
        AUTH:"__qkm_l2aQ9",
        PROFILE:"__qkm_l7aK1"
    }

}