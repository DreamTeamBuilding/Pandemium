var http = require('http');
var querystring = require('querystring');

var confidence = 0.2;
var support = 20;

//Peut être ne garder que l'objet Ressources
function spotlightSearch(text, callback) {
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
		console.log(res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
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
function asyncLoop(o){
    var i=-1;

    var loop = function(){
        i++;
        if(i==o.length){o.callback(); return;}
        o.functionToLoop(loop, i);
    }
    loop();
}


function annotateFiles(filesList, callback) {
  // filesList ->  {"listFiles" : [{"filename" : "blabla", "content" : "blablabla"},{"filename" : "blabla", "content" : "blablabla"}]}
  // annotatedFiles -> {"annotatedFiles" : [{"fileName": "fichierSource", "dbPedia": "resultatSpotligtSearch"}]}
  var annotatedFiles = {};
  annotatedFiles.annotatedFiles = [];

  var annotateOneFile = function(loop, i){
    var file = {};
    file.fileName = filesList.listFiles[i].filename;
    spotlightSearch(filesList.listFiles[i].content, res => {
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
