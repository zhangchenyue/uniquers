var express = require('express');
var router = express.Router();
var path = require('path');
/* GET home page. */
var pageRoutes = [
  '/',
  '/home',
  'welcome'
];

pageRoutes.forEach(function (route) {
  router.get(route, function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
});

module.exports = router;
