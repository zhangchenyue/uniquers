/**
 * description: uniquers server side framework(node+express)
 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passportAuth = require('./routes/passport-auth');

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
server.use(session({ secret: 'imooc' }));
server.use(passportAuth.initialize());
server.use(passportAuth.session());
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