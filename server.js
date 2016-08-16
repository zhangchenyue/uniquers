/**
 * description: uniquers server side framework(node+express)
 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var TqqStrategy = require('passport-tqq/').Strategy;

var QQ_APP_ID = '101332510'
var QQ_APP_KEY = 'c138d5bc7f7d806a649bf4400715b698';
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new TqqStrategy({
    clientID: QQ_APP_ID,
    clientSecret: QQ_APP_KEY,
    callbackURL: 'http://uniquers.azurewebsites.net/auth/qq/callback'
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

var server = express();
var env = process.env.NODE_ENV || 'development';
server.locals.ENV = env;
server.locals.ENV_DEVELOPMENT = env == 'development';

server.use(favicon(__dirname + '/public/favicon.ico'));
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(passport.initialize());
server.use(passport.session());
server.use(require('./routes/api'));
server.use(require('./routes/page'));

server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));


/// catch 404 and forward to error handlersad
server.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (server.get('env') === 'development') {
    server.use(function (err, req, res, next) {
        res.status(err.status || 500);
        console.log(err.status + err.message + req.url);
        res.end();
    });
}

// production error handler
// no stacktraces leaked to user
server.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log(err.status + err.message + +req.url);
    res.end();
});


server.set('port', process.env.PORT || 3000);

var uniquers = server.listen(server.get('port'), function () {
    console.log('Uniquers server listening on port ' + uniquers.address().port);
});