var Set = require('set');
//TODO garder nom des sites -balise Title ?-
var coeffSimilarite = 0.7;
/*
Similarité entre graphes
ensemble d'URI
uri la plus populaire
*/
function similarity(enrichedFiles) {
	var numberOfFiles = enrichedFiles.enrichedFiles.length;
	// Construction des ensembles.
	var tabSetURI = [];
	var listFileNames = [];
	var multiSetURI = {};
	var mostPopular = {};
	mostPopular.count = 0;
	var missingCount = 0;
	for(var i = 0; i < numberOfFiles; i++) {
		var fileName = enrichedFiles.enrichedFiles[i].fileName;
		listFileNames[i] = fileName;
		tabSetURI[fileName] = new Set();
		
		var dbpedia = enrichedFiles.enrichedFiles[i].dbPedia;
		for(var j = 0; j < dbpedia.length; j++) {
			if(dbpedia[j]) {
				var bindings = dbpedia[j].results.bindings;
				for(var k = 0; k < bindings.length; k++) {
					var uri = bindings[k].page.value
					
					tabSetURI[fileName].add(uri);

					if(multiSetURI[uri]) {
						multiSetURI[uri] +=1;
						if(multiSetURI[uri] > mostPopular.count) {
							mostPopular.count = multiSetURI[uri];
							mostPopular.data = dbpedia[j];
						}
					}
					else
						multiSetURI[uri] = 1;
				}
			}
			else {
				missingCount++;
				//console.log("dbpedia fichier " + fileName + " index " + j + " manquant");
			}
		}
	}
	// Calcul coeffJaccard
	var tabCoeffJaccard = [];
	for(var i = 0; i < numberOfFiles; i++) {
		var fileName = listFileNames[i];
		tabCoeffJaccard[i] = {};
		tabCoeffJaccard[i].node = fileName;
		tabCoeffJaccard[i].edges = [];
		for(var j = 0; j < numberOfFiles; j++) {
			var fn = listFileNames[j];
			if(tabSetURI[fileName]) {
				var setUnion = tabSetURI[fileName].union(tabSetURI[fn]);
				var setIntersection = tabSetURI[fileName].intersect(tabSetURI[fn]);
				tabCoeffJaccard[i].edges[j] = setIntersection.size() / setUnion.size();
				//we don't want any null
				if(!tabCoeffJaccard[i].edges[j])
					tabCoeffJaccard[i].edges[j] = 0;
			}
		}
	}
	// Construction JSON
	var result = {};
	result.similarity = {};
	result.similarity.graph = tabCoeffJaccard;
	result.similarity.mostPopular = mostPopular;
	result.query = enrichedFiles.query;
	result.enrichedFiles = enrichedFiles.enrichedFiles;
	//console.log("missed " + missingCount);
	return result;
}

module.exports.similarity = similarity;