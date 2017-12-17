// With JQuery
$('#toleranceSlider').bind("input",setTolerance);
$('#toleranceSlider').bind("change",calculateWithTolerance);

function setTolerance(){
  var value = document.getElementById('toleranceSlider').value;
  $('#seuilToleranceTxt').html(" " + value);
}

function calculateWithTolerance(){
  var value = document.getElementById('toleranceSlider').value;
  alert('On va relancer le calcul avec une tolérance de  : ' + value);
}
