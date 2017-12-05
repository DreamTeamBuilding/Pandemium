var search = require('../models/search/search');
var spotlight = require('../models/spotlight/testSpotlight');

exports.search = function(req, res) {
	search.search(req.params.query, function(queryResult) {
    	res.setHeader('content-type', 'application/json');
    	res.send(queryResult);
	});
}

exports.spotlightSearch = function(req, res) {
	spotlight.search(function(queryResult) {
    	res.setHeader('content-type', 'application/json');
    	res.send(queryResult);
	});
}
