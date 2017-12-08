var search = require('../models/search/search');

exports.search = function(req, res) {
	search.search(escape(req.params.query), function(queryResult) {
    	res.setHeader('content-type', 'application/json');
    	res.send(queryResult);
	});
}
