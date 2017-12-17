$(document).ready(callAjax);


function callAjax(){
  var sickness = $('#sickness-name').html();

  $.ajax({
    url : '/search/'+encodeURI(sickness),
    type : 'GET',
    contentType: "application/json",
    dataType: "json",
    success:function(data){
      //var data = JSON.stringify(dataRaw);
      console.log(data);
      buildSimilarities(data.similarity.graph);
      buildDatas(data.similarity.mostPopular.data);
      buildExpension(data.similarity.graph, data.similarity.graph);
    },
    error:function(){
      alert('oupsi');}
  });
}

function buildDatas(data){
  var htmlCode = '';
  var descriptions = new Set();
  var images = new Set();
  var pages = new Set();
  var commentaires = new Set();
  var elements = data.results.bindings;
  for(i in elements){
    if(elements[i].abstract){
      descriptions.add(elements[i].abstract.value);
    }
    if(elements[i].image){
      images.add(elements[i].image.value);
    }
    if(elements[i].comment){
      commentaires.add(elements[i].abstract.comment);
    }
    if(elements[i].page){
      pages.add(elements[i].page.value);
    }
  }
  for (let item of images) {
    //htmlCode += '<img id="image-maladie" src="' + item + '">';
  }
  for (let item of descriptions) {
    htmlCode += item;
    htmlCode += '<br/>';
  }
  for (let item of pages) {
    htmlCode += '<a href="' + item + '">' + item + '<a/>';
    htmlCode += '<br/>';
  }

  $('#container-data1').html(htmlCode);
}

function buildExpension(data1, data2){
  $('#container-expended').html('Hop, des comparaisons');
}


function buildSimilarities(graph){
  var htmlCode = '<table class="result-table">';
  if(graph.length>0)
  {
    htmlCode += '<tr> <th></th>';
    for(j in graph[0].edges){
      htmlCode += '<th> Res ' + j + '</th>';
    }
    htmlCode += '</tr>';
  }
  for(i in graph){
    htmlCode += '<tr><td>Vs  r ' + i + '</td>';
    for(j in graph[i].edges){
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
