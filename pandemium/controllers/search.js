var search = require('../models/search/search');
var extract = require('../models/extract/extract');
var restore = require('../models/restore/restore');
var spotlight = require('../models/spotlight/spotlightSearch');
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
		// search.search(escape(req.params.query), function(queryResult)  => il y avait ça sur master
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
	//res.send(result.listFiles[0].content);
	spotlight.annotateFiles(result, function(annotedFiles) {
		res.send(annotedFiles);
	});
}
