var sparql = require('sparql');
var async = require('async');
var enrichedFiles = {};

exports.enrichFiles = function(annotatedFiles, callback) {
  enrichedFiles = {};
  enrichedFiles.enrichedFiles = [];
  async.eachOf(annotatedFiles.annotatedFiles, enrich, function(err) {
    callback(enrichedFiles);
  });
}

function enrich(item, index, callback) {
  enrichedFiles.enrichedFiles[index] = {};
  enrichedFiles.enrichedFiles[index].fileName = item.fileName;
  enrichedFiles.enrichedFiles[index].dbPedia = [];
  
  async.eachOf(item.dbPedia, enrichRessourceDbPedia.bind(null, index), function(err) {
    console.log(item.fileName + " enriched");
    callback();
  });
  }

function enrichRessourceDbPedia(parentIndex, item, index, callback) {
  enrichRessource(item["@URI"], function(result) {
   // console.log(item["@URI"] + " added for file " + parentIndex);
    enrichedFiles.enrichedFiles[parentIndex].dbPedia[index] = result;
    callback();
  });
  
}

function enrichRessource(urlRessource, callback) {
  // ATTENTION : mot est un nom de maladie en FRANCIAS, genre : sida, allergie, cancer.
  // ATTENTION : mot est SENSIBLE A LA CASSE avec cette requête.
  var request =
    `
    PREFIX obj: <`+urlRessource+`>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX hyper: <http://purl.org/linguistics/gold/hypernym>
    PREFIX dbo: <http://dbpedia.org/ontology/>
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
          FILTER( lang(?label) = "fr" || lang(?label) = "" || !isLiteral(?label))
          FILTER( lang(?comment) = "fr" || lang(?comment) = "" || !isLiteral(?comment))
      }
      UNION
      {
          ?value dbo:wikiPageRedirects obj:.
          ?value rdfs:label ?label.
          ?value foaf:isPrimaryTopicOf ?page
      }
    }`;
	var client = new sparql.Client('http://fr.dbpedia.org/sparql');
	client.query(request, function(err, result) {
		callback(result);
	});
}

module.exports.enrichRessource = enrichRessource;