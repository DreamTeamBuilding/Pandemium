var sparql = require('sparql');

exports.sparqlSearch = function(maladie, callback) {
  //console.log(maladie);
  var request = `PREFIX obj: <http://dbpedia.org/resource/Allergy>
SELECT ?property ?hasValue ?isValueOf
WHERE {
  { obj: ?property ?hasValue }
  UNION
  { ?isValueOf ?property obj: }
FILTER( lang(?hasValue) = "fr" || lang(?hasValue) = "" || !isLiteral(?hasValue))
}`;
//TODO changer la requete pour mettre la bonne
	var client = new sparql.Client('http://dbpedia.org/sparql');
	client.query(request, function(err, result) {
		callback(result);
	});
}
