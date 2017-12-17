var sparql = require('sparql');
var async = require('async');
var enrichedFiles = {};

exports.enrichFiles = function(annotatedFiles, callback) {
  enrichedFiles = {};
  enrichedFiles.query = annotatedFiles.query;
  if(enrichedFiles.query.annotatedQuery)
    enrichRessource(enrichedFiles.query.annotatedQuery["@URI"], function(res) {
      enrichedFiles.query.enrichedQuery = res;
    });
  else
    searchRessource(enrichedFiles.query.query);

  enrichedFiles.enrichedFiles = [];
  async.eachOf(annotatedFiles.annotatedFiles, enrich, function(err) {
    if(err)
      console.log("SPARQL callback ERROR " + err);
    callback(enrichedFiles);
  });
}

function enrich(item, index, callback) {
  enrichedFiles.enrichedFiles[index] = {};
  enrichedFiles.enrichedFiles[index].fileName = item.fileName;
  enrichedFiles.enrichedFiles[index].dbPedia = [];
  
  async.eachOfLimit(item.dbPedia, 10, enrichRessourceDbPedia.bind(null, index), function(err) {
    console.log(item.fileName + " enriched");
    callback();
  });
  }

function enrichRessourceDbPedia(parentIndex, item, index, callback) {
  enrichRessource(item["@URI"], function(result) {
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
    PREFIX dcterms: <http://purl.org/dc/terms/>
    SELECT ?label ?comment ?page ?image ?abstract obj: AS ?uriSource
    WHERE {
      {   obj: rdfs:label ?label.
          obj: rdfs:comment ?comment.
          obj: foaf:isPrimaryTopicOf ?page.
          obj: foaf:depiction ?image.
          obj: dbo:abstract ?abstract.
          FILTER( lang(?label) = "fr" || lang(?label) = "" || !isLiteral(?label))
          FILTER( lang(?comment) = "fr" || lang(?comment) = "" || !isLiteral(?comment))
          FILTER( lang(?abstract) = "fr" || lang(?abstract) = "" || !isLiteral(?abstract))
      }
      UNION
      {
          ?value dbo:wikiPageRedirects obj:.
          ?value rdfs:label ?label.
          ?value foaf:isPrimaryTopicOf ?page
      }
    }
    LIMIT 3`;
	var client = new sparql.Client('http://fr.dbpedia.org/sparql');
	client.query(request, function(err, result) {
    callback(result);
	});
}

//TODO
function subjectRessource(urlRessource, callback) {
  var request =
    `
    PREFIX obj: <`+urlRessource+`>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX hyper: <http://purl.org/linguistics/gold/hypernym>
    PREFIX dbo: <http://dbpedia.org/ontology/>
    PREFIX dcterms: <http://purl.org/dc/terms/>
    SELECT ?label ?comment ?page ?image ?abstract ?subject
    WHERE {
      {   obj: rdfs:label ?label.
          obj: rdfs:comment ?comment.
          obj: foaf:isPrimaryTopicOf ?page.
          obj: foaf:depiction ?image.
          obj: dbo:abstract ?abstract.
          obj: dcterms:subject ?subject
          FILTER( lang(?label) = "fr" || lang(?label) = "" || !isLiteral(?label))
          FILTER( lang(?comment) = "fr" || lang(?comment) = "" || !isLiteral(?comment))
          FILTER( lang(?abstract) = "fr" || lang(?abstract) = "" || !isLiteral(?abstract))
      }
      UNION
      {
          ?value dbo:wikiPageRedirects obj:.
          ?value rdfs:label ?label.
          ?value foaf:isPrimaryTopicOf ?page
      }
    }
    LIMIT 3`;
  var client = new sparql.Client('http://fr.dbpedia.org/sparql');
  client.query(request, function(err, result) {
    callback(result);
  });  
}


function searchRessource(query) {
 var request = `
  PREFIX dbo: <http://dbpedia.org/ontology/>
  PREFIX label: <http://www.w3.org/2000/01/rdf-schema#label>
  PREFIX foaf: <http://xmlns.com/foaf/0.1/>
      
  SELECT ?hasValue WHERE {
   ?p a dbo:Disease .
   ?p label: ?name.
   ?p ?property ?hasValue
  FILTER( lang(?hasValue) = "fr" || lang(?hasValue) = "fr" || !isLiteral(?hasValue))
  FILTER(contains(?name, "`+query+`"))
  FILTER ( strstarts(str(?hasValue), "http://fr.dbpedia.org/resource/") )
  }
 ` 
  var client = new sparql.Client('http://dbpedia.org/sparql');
  client.query(request, function(err, res) {
    //only the first, this case can not be treadted properly now
    enrichRessource(res.results.bindings[0].hasValue.value, function(res) {
      enrichedFiles.query.enrichedQuery = res;
    });
  });
}

module.exports.enrichRessource = enrichRessource;