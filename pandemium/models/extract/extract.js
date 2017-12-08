var textract = require('textract');
var fs = require('fs');
var async = require('async');

exports.extractContent = function(query, jsonAsString, callback) {
  var queryResultJsonObj = JSON.parse(jsonAsString);
  var dir = './cache/'+query;
  if(!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  extractUrl.dir = dir;
  async.eachOf(queryResultJsonObj.items, extractUrl, function(err) {
    if(err)
      console.log("ERROR " + err);
    callback(query);
  });

}

function extractUrl(item, index, callback) {
  var url = item.link;
  textract.fromUrl(url, function(error, text) {
    fs.appendFile(extractUrl.dir+'/content'+index, text, function() {
      callback();
      console.log(url + " downloaded");    
    });
  });
}
