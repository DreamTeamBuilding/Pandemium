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
      buildDatas(data.similarity.graph);
      buildExpension(data.similarity.graph, data.similarity.graph);
    },
    error:function(){
      alert('oupsi');}
  });
}

function buildDatas(data){
  $('#container-data1').html('Hop, des infos');
}

function buildExpension(data1, data2){
  $('#container-expended').html('Hop, des comparaisons');
}


function buildSimilarities(graph){
  var htmlCode = '<table class="result-table">';
  for(i in graph){
    htmlCode += '<tr>';
    for(j in graph[i].edges){
      htmlCode += '<td>';
      htmlCode += graph[i].edges[j];
      htmlCode += '</td>';
    }
    htmlCode += '</tr>';
  }
  htmlCode += '</table>';
  $('#container-similarities').html(htmlCode);
}
