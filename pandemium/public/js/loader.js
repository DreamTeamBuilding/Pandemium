$(document).ready(callAjax);
var displayQuery = true;

export function callAjax(){
  var sickness = $('#sickness-name').html();
  var value = document.getElementById('toleranceSlider').value / 100;
  $.ajax({
    url : '/search/'+encodeURI(sickness),
    type : 'GET',
    contentType: "application/json",
    data : {'minScore': value},
    dataType: "json",
    success:function(data){
      //var data = JSON.stringify(dataRaw);
      console.log(data);
      buildSimilarities(data.similarity.graph, data.enrichedFiles);
      buildDatas(data.similarity.mostPopular.data, $('#container-data1'));
      if(displayQuery && data.query.enrichedQuery) {
        buildDatas(data.query.enrichedQuery, $('#container-data2'));
        $('#container-data2').css("display", "block");
      }
      buildExpension(data.similarity.suggestions);
    }, 
    error:function(){
      alert('oupsi');}
  });
}

function buildDatas(data, container){
  var htmlCode = '';
  var descriptions = new Set();
  var images = new Set();
  var pages = new Set();
  var commentaires = new Set();
  var elements = data.results.bindings;
  var titres = new Set();
  for(var i in elements){
    if(elements[i].label){
      titres.add(elements[i].label.value);
    }
    if(elements[i].abstract){
      descriptions.add(elements[i].abstract.value);
    }
    if(elements[i].image){
      images.add(elements[i].image.value);
    }
    if(elements[i].comment){
      commentaires.add(elements[i].comment.value);
    }
    if(elements[i].page){
      pages.add(elements[i].page.value);
    }
  }
  for (let item of images) {
    htmlCode += '<img class="image-maladie" src="' + item + '">';
  }
  for (let item of titres) {
    htmlCode += '<h3>' + item + '</h3>';
    htmlCode += ' ';
  }
  htmlCode += '<br>';
  /*
  //Inutile, tres souvent abstract contient la meme chose
  for (let item of commentaires) {
    htmlCode += item;
    htmlCode += '<br>';
  }
  */
  htmlCode += '<br>';
  for (let item of descriptions) {
    htmlCode += item;
    htmlCode += '<br>';
  }
  for (let item of pages) {
    htmlCode += '<a href="' + item + '">' + item + '<a/>';
    htmlCode += '<br>';
  }
  htmlCode += '<br><br class="clear">';

  container.html(htmlCode);
}

function buildExpension(data){
  var htmlCode = '';
  for(var i in data) {

    var fileName = data[i].substr(data[i].lastIndexOf("/")+1);
    fileName = fileName.replace('_', ' ');
    htmlCode += '<a href="' + data[i] + '">' + fileName + '<a/>';
    htmlCode += '<br>';
  }

  $('#container-expended').html(htmlCode);
}


function buildSimilarities(graph, allPagesInfo){
  var htmlCode = '<table class="result-table">';
  if(graph.length>0)
  {
    htmlCode += '<tr> <th></th>';
    for(var j in graph[0].edges){
      //TODO change to allPagesInfo[j].name
      htmlCode += '<th title="'+allPagesInfo[j].fileName+'"> Res ' + j + '</th>';
    }
    htmlCode += '</tr>';
  }
  for(var i in graph){
    htmlCode += '<tr><td>r ' + i + '</td>';
    for(var j in graph[i].edges){
      var taille = graph[i].edges[j]  * 48;
      htmlCode += '<td title="taux de similarité de '+graph[i].edges[j] +'">';
      if(i==j)
        htmlCode += ' - ' ;
      else {
        htmlCode += '<div class="back-circle" style="width:' + taille +'px;height: ' + taille + 'px">';
        htmlCode += '<div class="front-circle" style="opacity : '+ graph[i].edges[j] +'"></div>';
      }
      htmlCode += '</div>';
      htmlCode += '</td>';
    }
    htmlCode += '</tr>';
  }
  htmlCode += '</table>';
  $('#container-similarities').html(htmlCode);
}