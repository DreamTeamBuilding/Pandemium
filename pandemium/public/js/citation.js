var citations = [
  {"auteur" : "Robert Charbonneau", "citation" : "Nos maladies nous ressemblent."},
  {"auteur" : "Jules Renard", "citation" : "Maladies. Les essayages de la mort."},
  {"auteur" : "Pierre Desproges", "citation" : "Les imbéciles n'ont jamais de cancer. C'est scientifique"},
  {"auteur" : "Pierre Desproges", "citation" : "Noël au scanner, Pâques au cimetière."},
  {"auteur" : "Pierre Desproges", "citation" : "Moi, j'ai pas de cancer, j'en aurai jamais je suis contre."},
  {"auteur" : "Pierre Desproges", "citation" : "Plus cancéreux que moi, tumeur !"},
  {"auteur" : "Pierre Desproges", "citation" : "S'il n'y avait pas la Science, combien d'entre nous pourraient profiter de leur cancer pendant plus de 5 ans ?"},
  {"auteur" : "Eugène Ionesco", "citation" : "Il y a des maladies qui sont saines."},
  {"auteur" : "Pierre Desproges", "citation" : "Si c'est les meilleurs qui partent les premiers, que penser des éjaculateurs précoces ?"},
  {"auteur" : "Proverbe oriental", "citation" : "Si vous heure n'est pas venue, même un médecin ne peut pas vous tuer."},
  {"auteur" : "Woody Allen", "citation" : "La vie est une maladie mortelle, sexuellement transmissible."},
  {"auteur" : "Pierre Dac", "citation" : "J'étais chauve... et je le suis encore... grâces aux pastilles de menthe."},
  {"auteur" : "Woody Allen", "citation" : "Je n'ai pas peur de la mort, mais quand elle se présentera, j'aimerais autant ne pas être là."},
  {"auteur" : "Pierre Dac", "citation" : "La constipation c'est quand la matière fait cale."}
];

function getCitation(){
  index = Math.floor(Math.random()*citations.length);
  return '"' + citations[index].citation + '" - '+ citations[index].auteur;
}

$(document).ready(function (){
  $("#citation").html(getCitation);
});
