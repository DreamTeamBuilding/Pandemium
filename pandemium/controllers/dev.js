var spotlight = require('../models/spotlight/testSpotlight');
var sparql = require('../models/sparql/sparqlSearch');

exports.spotlightSearch = function(req, res) {
	spotlight.searchList(function(annotatedFiles) {
		res.setHeader('content-type', 'application/json');
		res.send(annotatedFiles);
	});
}

exports.sparqlSearch = function(req, res) {
	sparql.sparqlSearch(escape(req.params.query), function(result) {
		res.setHeader('content-type', 'application/json');
		res.send(result);
	});
}
