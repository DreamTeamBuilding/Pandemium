var search = require('../models/search/search');
var extract = require('../models/extract/extract');
var fs = require('fs');

exports.search = function(req, res) {
	// Check if in cache
	var requete = req.params.query;
	var dir = './cache/'+requete;
  if(fs.existsSync(dir))
  {
		//Petit affichage visuel, en cours de modification
		res.setHeader('content-type', 'text/html');
		res.write("Requete deja dans le cache");
		res.end();
  }
	else {
		//Not in cache, do request
		search.search(requete, function(queryResult) {
				extract.extractContent(requete, queryResult);
				res.setHeader('content-type', 'application/json');
				res.send(queryResult);
		});
	}
}
