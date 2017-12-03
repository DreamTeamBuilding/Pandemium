var google = require('./googleSearch');

function search(query, callback) {
	google.search(query, callback);
}

function hello() {
	return 'hello';
}

//Search public
module.exports.search = search;