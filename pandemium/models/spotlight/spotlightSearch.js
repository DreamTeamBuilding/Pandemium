var http = require('http');
var querystring = require('querystring');

var defaultConfidence = 0.4;
var support = 20;

//Peut être ne garder que l'objet Ressources
function spotlightSearch(text, confidence, callback) {
	text = text.replace(/ /g, '%20');
	var postData = querystring.stringify({
		'text': text,
		'confidence': confidence,
		'support': support
	});

	var options = {
		host: 'model.dbpedia-spotlight.org',
		path: '/fr/annotate',
		method: 'POST',
		headers: { 
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(postData),
			'Accept': 'application/json' }
		};

		var request = http.request(options, function(res) {
			console.log("SPOTLIGHT " + res.statusCode);
		// Buffer the body entirely for processing as a whole.
		var bodyChunks = [];
		res.on('data', function(chunk) {
			// You can process streamed parts here...
			bodyChunks.push(chunk);
		}).on('end', function() {
			var body = Buffer.concat(bodyChunks);
			callback((JSON.parse(body)).Resources);
		});

	});

		request.on('error', function(e) {
			console.log('ERROR' + e.message);
			return false;
		});

		request.write(postData);
		request.end();
	}

// Permet de rendre une boucle asynchrone synchrone
function asyncLoop(o) {
	var i=-1;

	var loop = function() {
		i++;
		if(i==o.length){o.callback(); return;}
		o.functionToLoop(loop, i);
	}
	loop();
}


function annotateFiles(filesList, callback) {
	// filesList ->  {"listFiles" : [{"filename" : "blabla", "content" : "blablabla"},{"filename" : "blabla", "content" : "blablabla"}], "query": {"query": "sida"}}
	// annotatedFiles -> {"annotatedFiles" : [{"fileName": "fichierSource", "dbPedia": "resultatSpotligtSearch"}], "query": {"query": "sida", "annotatedQuery": "result"}}
	var annotatedFiles = {};
	annotatedFiles.annotatedFiles = [];
	annotatedFiles.query = filesList.query;

	spotlightSearch(filesList.query.query, 0, function(res) {
		console.log("ANNOTATE QUERY RES : " + res);
		if(res)
			annotatedFiles.query.annotatedQuery = res[0];
	});

	var annotateOneFile = function(loop, i) {
		var file = {};
		file.fileName = filesList.listFiles[i].filename;
		spotlightSearch(filesList.listFiles[i].content, defaultConfidence, res => {
			file.dbPedia = res;
			annotatedFiles.annotatedFiles.push(file);
			loop();
		})
	};

	asyncLoop({
		length : filesList.listFiles.length,
		functionToLoop : annotateOneFile,
		callback : function(){
			callback(annotatedFiles);
		}
	});
}


module.exports.spotlightSearch = spotlightSearch;
module.exports.annotateFiles = annotateFiles;
