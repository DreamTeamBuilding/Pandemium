var express = require('express');
var router = express.Router();
var searchController = require('../controllers/search');
var search = require('../models/search/search');

router.get('/testSpotlight', searchController.spotlightSearch);
router.get('/:query', searchController.search);

module.exports = router;
