var fs = require('fs');

exports.getContent = function(query) {
  var dir = './cache/' + query;
  var list = [];
  console.log(dir);
  var results = fs.readdirSync(dir);
  console.log(results.length);
  for(var i = 0 ; i < results.length ; i++) {
   console.log(i);
   var data = fs.readFileSync(dir+'/content'+i, 'utf8');
   list[i] = data;
  }
  return list;
}
