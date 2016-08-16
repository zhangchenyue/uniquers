var express = require('express');
var apiRouter = express.Router();
var db = require('../database/data');
var passportAuth = require('./passport-auth')
var util = require('util')
var crypto = require('crypto')





apiRouter.get('/api/version', function(req, res) {
    res.json({
        'version': '1.0.0.0'
    });
});

apiRouter.get('/api/items', function(req, res) {
    res.json(db);
})

apiRouter.get('/api/items/:type', function(req, res) {
    var type = req.params.type;
    if (!type) {
        res.json(db);
    } else {
        res.json(db.filter(function(item) {
            return item.type === type;
        }));
    }
})

apiRouter.get('/api/item/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    res.json(db.filter(function(item) {
        return item.id == id;
    }));
})

// GET /auth/qq
// QQ登录认证时 `state` 为必填参数
// 系client端的状态值，用于第三方应用防止CSRF攻击，成功授权后回调时会原样带回
apiRouter.get('/api/auth/qq', function(req, res, next) {
    req.session = req.session || {};
    req.session.authState = crypto.createHash('sha1')
        .update(-(new Date()) + '')
        .digest('hex');
    passportAuth.authenticate('qq', {
        state: req.session.authState
    })(req, res, next);
});

// GET /auth/qq/callback
// 通过比较认证返回的`state`状态值与服务器端`session`中的`state`状态值
// 决定是否继续本次授权
apiRouter.get('/api/auth/qq/callback', function(req, res, next) {
    if (req.session && req.session.authState && req.session.authState === req.query.state) {
        passportAuth
            .authenticate('qq', {
                failureRedirect: '/'
            })(req, res, next);
    } else {
        return next(new Error('Auth State Mismatch'));
    }
}, function(req, res) {
    res.redirect('/');
});

module.exports = apiRouter;