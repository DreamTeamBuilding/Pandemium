var fs = require('fs');

exports.getContent = function(query) {
		var dir = './cache/' + query;
		var restoreResult = {};
		restoreResult.listFiles = [];
		restoreResult.query = {};
		restoreResult.query.query = query;
		console.log(dir);
		var results = fs.readdirSync(dir);
		for(var i = 0 ; i < results.length ; i++) {
			console.log("RESTORE file " + i);
			restoreResult.listFiles[i] = {};
			var filename = '/content'+i;
			restoreResult.listFiles[i].filename = filename;
			var data = fs.readFileSync(dir+filename, 'utf8');
			restoreResult.listFiles[i].content = data;
		}
		return restoreResult;
}
