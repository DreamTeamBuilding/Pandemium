var fs = require('fs');

exports.getContent = function(query) {
		var dir = './cache/' + query;
		var restoreResult = {};
		restoreResult.listFiles = [];
		console.log(dir);
		var results = fs.readdirSync(dir);
		console.log(results.length);
		for(var i = 0 ; i < results.length ; i++) {
			console.log(i);
			restoreResult.listFiles[i] = {};
			var filename = '/content'+i;
			restoreResult.listFiles[i].filename = filename;
			var data = fs.readFileSync(dir+filename, 'utf8');
			restoreResult.listFiles[i].content = data;
		}
		return restoreResult;
}
