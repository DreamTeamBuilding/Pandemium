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
				extract.extractContent(requete, queryResult);
				res.setHeader('content-type', 'application/json');
				res.send(queryResult);
		});
  } else {
		res.setHeader('content-type', 'application/json');
		res.write("Deja dans le cache.");
		res.end();
	}
	// Read the cache
<<<<<<< HEAD
	//var queryResult = restore.getContent(requete);
	//res.setHeader('content-type', 'application/json');
	//res.send(queryResult);
=======
	
>>>>>>> b96eab1387dfd7df321d3b513fecb7d399618e7a
}
