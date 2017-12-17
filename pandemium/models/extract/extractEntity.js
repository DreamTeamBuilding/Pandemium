var Textrazor = require("textrazor");
var async = require("async");

//17/12/2017 LIMITE A 500 par jours, on les fait 10 par 10
//var textrazorKey = "3d9b019021c43c9d794ec1091b8c236aa5faede6f17371c4905a49ea";
var textrazorKey = "5317ba7afe61503ec54fa899b4c353cc6c768b8009ceb9819745d8fb";

var minScore = 0.4;
var extractedFiles = {};


function extractEntitiesFromFile(file, index, callback) {
	var textrazor = new Textrazor(textrazorKey);
	var options = {extractors: 'entities'};
	textrazor.exec(file.content, options)
	.then(function(res) {
		for(var i = 0; i < res.response.entities.length; i++) {
			var entity = res.response.entities[i];
			if(entity.relevanceScore > minScore) {
				extractedFiles.extractedFiles[index].content += entity.matchedText + " ";
			}
		} 
		callback();
	})
	.catch(function(err) {
		console.log("EXTRACT FILE TEXTRAZOR ERROR: Certainly concurrent request");
		callback();
	});
}

function extractEntities(filesList, callback) {
	extractedFiles.query = filesList.query;
	extractedFiles.extractedFiles = [];
	
	for(var i = 0; i < filesList.listFiles.length; i++) {
		extractedFiles.extractedFiles[i] = {};
		extractedFiles.extractedFiles[i].fileName = filesList.listFiles[i].filename;
		extractedFiles.extractedFiles[i].content = "";
	}

	async.eachOfLimit(filesList.listFiles, 2, extractEntitiesFromFile, function(err) {
		callback(extractedFiles);
	});
}

module.exports.extractEntities = extractEntities;
