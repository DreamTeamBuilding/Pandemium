var sparql = require('sparql');

exports.sparqlSearch = function(mot, callback) {
  // ATTENTION : mot est un nom de maladie en ANGLAIS, genre : Influenza, Angina, Allergy.
  // ATTENTION : mot est SENSIBLE A LA CASSE avec cette requête.
  var request =
    `PREFIX obj: <http://dbpedia.org/resource/`+mot+`>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX hyper: <http://purl.org/linguistics/gold/hypernym>
    SELECT ?label ?comment ?page ?image
    WHERE {
      {   obj: rdfs:label ?label.
          obj: rdfs:comment ?comment.
          obj: foaf:isPrimaryTopicOf ?page.
          obj: foaf:depiction ?image
          FILTER( lang(?label) = "fr" || lang(?label) = "" || !isLiteral(?label))
          FILTER( lang(?comment) = "fr" || lang(?comment) = "" || !isLiteral(?comment))
      }
      UNION
      {
          ?value hyper: obj:.
          ?value rdfs:label ?label.
          ?value rdfs:comment ?comment.
          ?value foaf:isPrimaryTopicOf ?page.
          FILTER( lang(?label) = "en" || lang(?label) = "" || !isLiteral(?label))
          FILTER( lang(?comment) = "en" || lang(?comment) = "" || !isLiteral(?comment))
      }
      UNION
      {
          ?value dbo:wikiPageRedirects obj:.
          ?value rdfs:label ?label.
          ?value foaf:isPrimaryTopicOf ?page
      }
    }`;
	var client = new sparql.Client('http://dbpedia.org/sparql');
	client.query(request, function(err, result) {
		callback(result);
	});
}
