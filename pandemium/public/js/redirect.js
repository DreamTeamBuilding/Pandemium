document.getElementById("submit-button").addEventListener("click", redirect);

function redirect(event){
  event.preventDefault();
  var string = document.getElementById("search-field").value;
  if(string!=""){
    window.location.href = ("/search/" + encodeURI(string));
  }
}
