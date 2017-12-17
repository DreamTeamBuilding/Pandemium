var google = require('./googleSearch');

function search(query, callback) {
	google.search(query, callback);
}

//Search public
module.exports.search = search;
