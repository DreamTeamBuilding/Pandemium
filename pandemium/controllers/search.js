var search = require('../models/search/search');
var extract = require('../models/extract/extract');
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
				extract.extractContent(requete, queryResult);
				res.setHeader('content-type', 'application/json');
				res.send(queryResult);
		});
  }
	// Read the cache
	res.end();
}
