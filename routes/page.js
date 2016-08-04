var express = require('express');
var pageRouter = express.Router();
var path = require('path');
/* GET home page. */
var pageRoutes = [
  '/',
  '/login',
  '/home',
  '/welcome',
  '/match',
  '/kind',
  '/thenew',
  '/about', 
  '/party',
  '/ol',
  '/vacation',
  '/designer',
  '/detail',
  '/detail/*'
];

pageRoutes.forEach(function (route) {
  pageRouter.get(route, function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
});

module.exports = pageRouter;
