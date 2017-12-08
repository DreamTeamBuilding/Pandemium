var sparql = require('sparql');

exports.sparqlSearch = function(text, callback) {
  var request = 'PREFIX res: <http://dbpedia.org/resource/> SELECT res:Cardiomyopathy ?p ?n WHERE {res:Cardiomyopathy ?p ?n.}';
	var client = new sparql.Client('http://dbpedia.org/sparql');
	client.query(request, function(err, result) {
		callback(result);
	});
}
