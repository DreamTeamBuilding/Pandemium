var spotlight = require('../models/spotlight/testSpotlight');
var sparql = require('sparql');

exports.spotlightSearch = function(req, res) {
	spotlight.search(function(queryResult) {
    	res.setHeader('content-type', 'application/json');
    	res.send(queryResult);
	});
}

exports.sparqlSearch = function(req, res) {
	var request = 'PREFIX res: <http://dbpedia.org/resource/> SELECT res:Cardiomyopathy ?p ?n WHERE {res:Cardiomyopathy ?p ?n.}';
	var client = new sparql.Client('http://dbpedia.org/sparql');
	client.query(request, function(err, result) {
		res.setHeader('content-type', 'application/json');
		res.send(result);
	});
}
