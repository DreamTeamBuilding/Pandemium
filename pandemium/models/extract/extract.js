var textract = require('textract');
var fs = require('fs');


exports.getBackContent

exports.extractContent = function(query, jsonAsString) {
  var queryResultJsonObj = JSON.parse(jsonAsString);
  var dir = './cache/'+query;
  if(!fs.existsSync(dir))
  {
    fs.mkdirSync(dir);
  }
  for(var i = 0 ; i < queryResultJsonObj.items.length ; i++) {
      var url = queryResultJsonObj.items[i].link;
      extractUrl(url, dir, i);
  }
}

function extractUrl(url, dir, index) {
  //console.log(url);
  textract.fromUrl(url, function(error, text) {
    fs.appendFile(dir+'/'+index, text, function (err) {
      if (err) throw err;
    });
  });
}
