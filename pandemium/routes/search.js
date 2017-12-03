var express = require('express');
var router = express.Router();
var searchController = require('../controllers/search');
var search = require('../models/search/search');
  
router.get('/:query', searchController.search);

module.exports = router;
