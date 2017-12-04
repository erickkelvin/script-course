var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tic Tac Toe', author: 'Erick Santos' });
});

module.exports = router;
