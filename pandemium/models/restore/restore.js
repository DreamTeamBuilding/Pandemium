var fs = require('fs');

exports.getContent = function(query) {
 var dir = './cache/'+query;
 var list = [];
 console.log(dir);
  fs.readdir(dir, (err, results) => {
    console.log(results.length);
    for(var i = 0 ; i < results.length ; i++) {
      console.log(i);
      var data = fs.readFileSync(dir+'/content'+i)
      list[i] = data;
    }
  });
  console.log("Je suis une cruche");
  return list;
}
