var express = require('express');
var router = express.Router();
var searchController = require('../controllers/search');
var search = require('../models/search/search');

router.get('/', function(req, res, next) {
  res.redirect('/');
});
router.get('/:query', searchController.search);

router.get('/result/:query', function(req, res, next) {
  res.render('result', { title: 'Pandemium ' + req.params.query , maladie:  req.params.query});
});

module.exports = router;
