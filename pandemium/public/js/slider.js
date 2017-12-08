// With JQuery
$('#toleranceSlider').bind("input",setTolerance);

function setTolerance(){
  var value = document.getElementById('toleranceSlider').value;
  $('#seuilToleranceTxt').html(" " + value);
}
