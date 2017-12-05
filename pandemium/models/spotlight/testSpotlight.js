var spotlight = require('./spotlightSearch');

function search(callback) {
	var testQuery = "La grippe aviaire désigne les différentes formes du virus de la grippe qui infecte les oiseaux sauvages et les oiseaux domestiques."
	+" Lorsqu'elle touche les oiseaux, la maladie est également connue sous le nom d'influenza aviaire ou, anciennement, de peste aviaire."
	+"En 2004, une souche H5N1 du virus a été mise en avant en raison de son danger et de sa transmissibilité à l'homme.";
	spotlight.spotlightSearch(testQuery, callback);
}

//Search public
module.exports.search = search;
