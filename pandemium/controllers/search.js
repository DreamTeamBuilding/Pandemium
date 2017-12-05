var search = require('../models/search/search');
var extract = require('../models/extract/extract');
var fs = require('fs');

exports.search = function(req, res) {
	// Check if in cache
	var requete = req.params.query;
	var dir = './cache/'+requete;
  if(fs.existsSync(dir))
  {
		console.log("Cette recherche est dans le cache")
		// extract.
  }
	else {
		search.search(requete, function(queryResult) {
	    	res.setHeader('content-type', 'application/json');
				extract.extractContent(requete, queryResult);
				res.send(queryResult);
		});
	}
}
