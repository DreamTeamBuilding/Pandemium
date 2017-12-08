var express = require('express');
var router = express.Router();
var devController = require('../controllers/dev');

router.get('/', function(req, res, next) {
  res.redirect('/');
});
router.get('/testSpotlight', devController.spotlightSearch);
router.get('/sparqlSearch', devController.sparqlSearch);

module.exports = router;
