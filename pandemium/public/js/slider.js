// With JQuery
$('#toleranceSlider').bind("input",setTolerance);
$('#toleranceSlider').bind("change",calculateWithTolerance);
import {callAjax} from './loader.js';

function setTolerance(){
  var value = document.getElementById('toleranceSlider').value;
  $('#seuilToleranceTxt').html(" " + value);
}

function calculateWithTolerance(){
  var value = document.getElementById('toleranceSlider').value;
  callAjax();
}
