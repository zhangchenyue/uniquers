var passportAuth = require('passport');
var TqqStrategy = require('passport-tqq/').Strategy;

var QQ_APP_ID = '101332510'
var QQ_APP_KEY = 'c138d5bc7f7d806a649bf4400715b698';
passportAuth.serializeUser(function (user, done) {
    done(null, user);
});

passportAuth.deserializeUser(function (obj, done) {
    done(null, obj);
});

passportAuth.use(new TqqStrategy({
    clientID: QQ_APP_ID,
    clientSecret: QQ_APP_KEY,
    callbackURL: 'http://uniquers.azurewebsites.net/api/auth/qq/callback'
},
    function (accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
            console.log('accessToken', accessToken);
            console.log('refreshToken', refreshToken);
            console.log('profile', profile);
            return done(null, profile);
        });
    }
));

module.exports = passportAuth;