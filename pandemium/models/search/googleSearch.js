var https = require('https');


//Clé lulu
var apiKey = 'AIzaSyDsFGhns8Rvi-d4l_MRkhzhktRXsAcJ-KI';
//Clé pierrick
//var apiKey = 'AIzaSyAC81m_sAt5er7pEWV8iftPZL40YvONc7Es';

//var apiKey = 'AIzaSyBAbIDGkq-3fGya2AUWdiStKuUDrQPb_YI';

var customSearch = '014213754068618715256:oyi0ols3czy';
var numberOfResult = 10;
var count = 0;
var error = false;

function search(query, callback) {
	var defaultPath = '/customsearch/v1?key='+apiKey+'&cx='+customSearch+'&hl=fr&cr=countryFR&q='+query;
	var options = {
		host: 'www.googleapis.com',
		path: defaultPath
	};

	var body = [];
	var request;

	for(var i = 0; i < numberOfResult; i += 10) {
		if (numberOfResult > 10)
			options.path = defaultPath + '&start=' + (i + 1) + '&num=' + Math.min(10, numberOfResult - i);
		else
			options.path = defaultPath;

		console.log("requete :" + i);
		request = https.get(options, function(res) {
			console.log(res.statusCode);
			var bodyChunks = [];
			res.on('data', function(chunk) {
				bodyChunks.push(chunk);
			}).on('end', function() {
				body.push(Buffer.concat(bodyChunks));
				finalCallback(body, callback);
			});

		});
	}

	request.on('error', function(e) {
		error = true;
		console.log('ERROR' + e.message);
	});

}

function finalCallback(body, callback) {
	count += 10;
	if(body.length > (numberOfResult - 1) / 10) {
		var data = {};
		data.items = [];
		for(var i = 0; i < body.length; i++) {
			var items = JSON.parse(body[i].toString()).items;
			if(items != null) {
				data.items = data.items.concat(items);
			}
		}
		console.log(data.items.length + " results obtained");
		if(data.items.length == 0) {
			error = true;
		}
		callback(data);
	}
}

module.exports.search = search;
