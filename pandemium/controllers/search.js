var search = require('../models/search/search');
var extract = require('../models/extract/extract');
var restore = require('../models/restore/restore');
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
					var resultat = restore.getContent(q);
					res.send(resultat);

				});
			});
  } else {
		var queryResult = restore.getContent(requete);
		res.send(queryResult);
		console.log(queryResult);
	}
}
