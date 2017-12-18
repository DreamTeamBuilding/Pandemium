var search = require('../models/search/search');
var extract = require('../models/extract/extract');
var extractEntity = require('../models/extract/extractEntity');
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
	var minScore = req.query.minScore;
	console.log(req.query);
	var dir = cacheDir+'/'+requete;
	if(!fs.existsSync(dir))
	{
		//Not in cache, do request
		search.search(requete, function(queryResult) {
			extract.extractContent(requete, queryResult, function(q) {
				processResult(restore.getContent(q), res, minScore);
			});
		});
	} else {
		processResult(restore.getContent(requete), res);
	}
}

function processResult(result, res, minScore) {
	extractEntity.extractEntities(result, minScore, function(extractedFiles) {
		spotlight.annotateFiles(extractedFiles, function(annotatedFiles) {
			sparql.enrichFiles(annotatedFiles, function(enrichedFiles) {
				graph = similarity.similarity(enrichedFiles);
				res.send(graph);
				console.log("Data sent to client");
			});
		});
	});
}
