var https = require('https');

var apiKey = 'AIzaSyBUBFkfEszaiWkK7tqsAgExceK6PRxjOr4';
var customSearch = '014213754068618715256:oyi0ols3czy';
var numberOfResult = 15;
var count=0;

function search(query, callback) {
	var defaultPath = '/customsearch/v1?key='+apiKey+'&cx='+customSearch+'&q='+query;
	var options = {
		host: 'www.googleapis.com',
		path: defaultPath
	};

	var bodyChunks = [];
	var request;
	
	for(var i=0; i<=numberOfResult;i+=10){
		options.path=defaultPath+'&start='+(i+1)+'&num='+Math.min(10,numberOfResult-i);
		request = https.get(options, function(res) {
			console.log(res.statusCode);
			console.log('HEADERS: ' + JSON.stringify(res.headers));
			// Buffer the body entirely for processing as a whole.
			res.on('data', function(chunk) {
				// You can process streamed parts here...
				bodyChunks.push(chunk);
				console.log("[REQ]Chunks : "+bodyChunks.length);
			}).on('end', function() {
				finalCallback(bodyChunks, callback);
				//console.log('BODY: ' + body);
				// ...and/or process the entire body here.
			});
					
		});
	}

	request.on('error', function(e) {
		console.log('ERROR' + e.message);
	});

}

function finalCallback(bodyChunks, callback){
	count+=10;
	if(numberOfResult-count<0){
		var body = Buffer.concat(bodyChunks);
		callback(body);
	}
}

module.exports.search = search;
