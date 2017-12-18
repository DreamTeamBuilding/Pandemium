var textract = require('textract');
var fs = require('fs');
var async = require('async');
var requete;

exports.extractContent = function(query, queryResult, callback) {
	var dir = './cache/'+query;
	requete = query;
	if(!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
	extractUrl.dir = dir;
	async.eachOf(queryResult.items, extractUrl, function(err) {
		if(err)
			console.log("EXTRACT ERROR" + err);
		callback(query);
	});

}

function extractUrl(item, index, callback) {
	var url = item.link;
	var name = requete + " - "+ url;
	textract.fromUrl(url, function(error, text) {
		fs.appendFile(extractUrl.dir+'/content'+index, text, function() {
			callback();
			console.log(url + " downloaded");
			console.log("Name : "+name);
		});
	});
}
