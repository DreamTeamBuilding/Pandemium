var search = require('../models/search/search');
var extract = require('../models/extract/extract');

exports.search = function(req, res) {
	// Check if in cache
	search.search(req.params.query, function(queryResult) {
    	res.setHeader('content-type', 'application/json');
			extract.extractContent(req.params.query, queryResult);
			res.send(queryResult);
	});
}
