var express = require('express');
var apiRouter = express.Router();
var db = require('../database/data');
/* GET users listing. */

apiRouter.get('/api/version', function (req, res) {
  res.json({ 'version': '1.0.0.0' });
});

apiRouter.get('/api/items', function (req, res) {
  res.json(db);
})

apiRouter.get('/api/items/:type', function (req, res) {
  var type = req.params.type;
  if (!type) {
    res.json(db);
  } else {
    res.json(db.filter(function (item) {
      return item.type === type;
    }));
  }
})

apiRouter.get('/api/item/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  res.json(db.filter(function (item) {
      return item.id == id;
    }));
})

module.exports = apiRouter;
