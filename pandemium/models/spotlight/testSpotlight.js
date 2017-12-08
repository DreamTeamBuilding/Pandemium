var spotlight = require('./spotlightSearch');

function search() {
	var testQuery = "La grippe aviaire désigne les différentes formes du virus de la grippe qui infecte les oiseaux sauvages et les oiseaux domestiques."
	+" Lorsqu'elle touche les oiseaux, la maladie est également connue sous le nom d'influenza aviaire ou, anciennement, de peste aviaire."
	+"En 2004, une souche H5N1 du virus a été mise en avant en raison de son danger et de sa transmissibilité à l'homme.";
	spotlight.spotlightSearch(testQuery, callback);
}

function searchList(callback) {
	var testList = {};
	testList.listFiles = [];
	testList.listFiles[0] = {filename : "file1" , content : "La grippe aviaire désigne les différentes formes du virus de la grippe qui infecte les oiseaux sauvages et les oiseaux domestiques."};
	testList.listFiles[1] = {filename : "file2" , content : " Lorsqu'elle touche les oiseaux, la maladie est également connue sous le nom d'influenza aviaire ou, anciennement, de peste aviaire."};
	testList.listFiles[2] = {filename : "file3" , content : "En 2004, une souche H5N1 du virus a été mise en avant en raison de son danger et de sa transmissibilité à l'homme."};
	spotlight.annotateFiles(testList, callback);
}

//Search public
module.exports.search = search;
module.exports.searchList = searchList;
