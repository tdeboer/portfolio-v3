var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  /*jshint unused: vars*/
  res.render('index', { title: 'BiteSizedChunks' });
});

module.exports = router;
