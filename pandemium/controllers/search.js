var search = require('../models/search/search');
var extract = require('../models/extract/extract');
var restore = require('../models/restore/restore');
var spotlight = require('../models/spotlight/spotlightSearch');
var sparql = require('../models/sparql/sparqlSearch');
var similarity = require('../models/similarity/similarity');
var fs = require('fs');

exports.search = function(req, res) {
	// Check if in cache
	var cacheDir = "./cache";
	if(!fs.existsSync(cacheDir))
	{
		fs.mkdirSync(cacheDir);
	}
	var requete = req.params.query;
	var dir = cacheDir+'/'+requete;
	if(!fs.existsSync(dir))
	{
		//Not in cache, do request
		search.search(requete, function(queryResult) {
			extract.extractContent(requete, queryResult, function(q) {
				processResult(restore.getContent(q), res);
			});
		});
	} else {
		processResult(restore.getContent(requete), res);
	}
}

function processResult(result, res) {
	spotlight.annotateFiles(result, function(annotedFiles) {
		sparql.enrichFiles(annotedFiles, function(enrichedFiles) {
			graph = similarity.similarity(enrichedFiles);
			res.send(graph.similarity);
		});
	});
}
