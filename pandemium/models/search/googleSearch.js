var https = require('https');

var apiKey = 'AIzaSyBlqai4Y99tQZprGNLfPtV0J6dJo1ctdGE';
var customSearch = '014213754068618715256:oyi0ols3czy';
var numberOfResult = 10;

//TODO : prendre en compte numberOfResult pour faire recherche
function search(query, callback) {
	var options = {
		host: 'www.googleapis.com',
		path: '/customsearch/v1?key='+apiKey+'&cx='+customSearch+'&q='+query
	};

	var request = https.get(options, function(res) {
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

module.exports.search = search;
