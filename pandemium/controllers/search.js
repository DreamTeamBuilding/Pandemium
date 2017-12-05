var search = require('../models/search/search');
var extract = require('../models/extract/extract');
var restore = require('../models/restore/restore');
var fs = require('fs');

exports.search = function(req, res) {
	// Check if in cache
	var requete = req.params.query;
	var dir = './cache/'+requete;
  if(!fs.existsSync(dir)) {
		//Not in cache, do request
		search.search(requete, function(queryResult) {
				extract.extractContent(requete, queryResult);
		});
  }
	// Read the cache
	//var queryResult = restore.getContent(requete);
	//res.setHeader('content-type', 'application/json');
	//res.send(queryResult);
}
