var express = require('express');
var router = express.Router();
var searchController = require('../controllers/search');
var search = require('../models/search/search');

router.get('/', function(req, res, next) {
  res.redirect('/');
});
router.get('/testSpotlight', searchController.spotlightSearch);
router.get('/sparqlSearch', searchController.sparqlSearch);
router.get('/:query', searchController.search);

module.exports = router;
