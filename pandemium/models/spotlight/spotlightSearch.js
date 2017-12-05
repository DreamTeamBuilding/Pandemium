var http = require('http');

var confidence = 0.2;
var support = 20;

//Peut être ne garder que l'objet Ressources
function spotlightSearch(text, callback) {
  text = text.replace(/ /g, '%20');
	var options = {
		host: 'model.dbpedia-spotlight.org',
		path: '/fr/annotate?text='+text+'&confidence='+confidence+'&support='+support,
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
			callback(JSON.parse(body));
		});

	});

	request.on('error', function(e) {
		console.log('ERROR' + e.message);
	});

}

//TODO méthode annoter
// parametre : liste de strings, 1 élement de la liste correspond au texte complet d'un fichier telecharge
// retour : liste d'objet de la forme {filename: fichierSource, dbPedia: resultatSpotligtSearch}
// la methode parcourt la liste passé en parametre et cree 1 objet pour chaque element de la liste

module.exports.spotlightSearch = spotlightSearch;
