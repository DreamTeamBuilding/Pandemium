var fs = require('fs');

exports.getContent = function(query) {
 var dir = './cache/'+query;
 var list;
 console.log(dir);
  fs.readdir(dir, (err, results) => {
    console.log(results.length);
    for(var i = 0 ; i < results.length ; i++) {
      var data = fs.readFile(dir+'/'+i, function(err, data) {
        list[i] = data;
      });
    }
  });
  return list;
}
