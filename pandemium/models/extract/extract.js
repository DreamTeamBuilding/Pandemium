var textract = require('textract');
var fs = require('fs');

exports.extractContent = function(query, jsonAsString, callback) {
  var queryResultJsonObj = JSON.parse(jsonAsString);
  var dir = './cache/'+query;
  if(!fs.existsSync(dir))
  {
    fs.mkdirSync(dir);
  }

  var uneIteration = function(loop, i){
    var url = queryResultJsonObj.items[i].link;
    extractUrl(url, dir, i, function() {
      // Ici on est dans le callback de la fonction asynchrone
      loop();
    })
  };

  asyncLoop({
    length : queryResultJsonObj.items.length,
    functionToLoop : uneIteration,
    callback : function(){
      console.log("CALLBACK CALLED");
      callback(query);
    }
  });
}

function extractUrl(url, dir, index, callback) {
  textract.fromUrl(url, function(error, text) {
    fs.appendFileSync(dir+'/content'+index, text);
    callback();
  });
  console.log(url + "DONE");
}

// TODO optimiser la loop
// Permet de rendre une boucle asynchrone synchrone
function asyncLoop(o){
    var i=-1;

    var loop = function(){
        i++;
        if(i==o.length){o.callback(); return;}
        o.functionToLoop(loop, i);
    }
    loop();
}
