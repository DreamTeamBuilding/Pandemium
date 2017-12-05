var http = require('http');

var confidence = 0.2;
var support = 20;

function spotlightSearch(query, callback) {
  query = query.replace(/ /g, '%20');
	var options = {
		host: 'model.dbpedia-spotlight.org',
		path: '/fr/annotate?text='+query+'&confidence='+confidence+'&support='+support,
    headers: { 'Accept': 'application/json' }
	};

	var request = http.get(options, function(res) {
		console.log(res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		// Buffer the body entirely for processing as a whole.
		var bodyChunks = [];
		res.on('data', function(chunk) {
			// You can process streamed parts here...
			bodyChunks.push(chunk);
		}).on('end', function() {
			var body = Buffer.concat(bodyChunks);
			//console.log('BODY: ' + body);
			// ...and/or process the entire body here.
			callback(body);
		});

	});

	request.on('error', function(e) {
		console.log('ERROR' + e.message);
	});

}

module.exports.spotlightSearch = spotlightSearch;
