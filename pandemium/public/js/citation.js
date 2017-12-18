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
  {"auteur" : "Jean Marie Bigard", "citation" : "Les hémorroïdes gagnent du terrain, les chercheurs se grattent la tête."},
  {"auteur" : "Jean Marie Bigard", "citation" : "Si l'avortement est un meurtre, la branlette c'est quoi, un génocide ?"},
  {"auteur" : "Lawrence Durrell", "citation" : "La maladie ne s'intéresse pas à ceux qui ont envie de mourir."},
  {"auteur" : "Nicolas de Chamfort", "citation" : "Vivre est une maladie dont le someil nous soulage toutes les seize heures."},
  {"auteur" : "proverbe italien", "citation" : "Si le malade meurt, c'est le médecin qui l'a tué ; s'il guérit, ce sont les saints qui l'ont sauvé."},
  {"auteur" : "proverbe chinois", "citation" : "A force d'être malade, on finit par devenir un bon médecin."},
  {"auteur" : "Karl Kraus", "citation" : "Psychanalyse : une maladie qui se prend pour son remède."},
  {"auteur" : "Paul Morant", "citation" : "La vie est une maladie dont tout le monde meurt."},
  {"auteur" : "Jacques Rouxel", "citation" : "La plus grave maladie du cerveau c'est de réfléchir."},
  {"auteur" : "film La cité de la peur", "citation" : " - Qu'est ce qu'y'a ! Vous êtes malade en voiture ? - Non, c'est quand je suis content, je vomi, et là, je suis super content !!"},
  {"auteur" : "Coluche", "citation" : "Mon psychiartre, pour quize mille francs, il m'a débarrassé de ce que j'avais : quize mille francs."},
  {"auteur" : "Philippe Geluck", "citation" : "Beaucoup de gens sont malades quand ils sont vieux... C'est triste... D'un autre côté, ça les occupe."},
  {"auteur" : "Coluche", "citation" : "La médecine est un métier dangereux. Ceux qui ne meurent pas peuvent vous faire un procès."},
  {"auteur" : "Gaspard Proust", "citation" : "Strangers in the night ! Syphilis in the morning."},
  {"auteur" : "Alphonse Allais", "citation" : "L'avantage des médecins, c'est que lorsqu'ils commettent une erreur, ils l'enterrent tout de suite..."},
  {"auteur" : "Pierre Dac", "citation" : "La constipation c'est quand la matière fait cale."}
];

function getCitation(){
  index = Math.floor(Math.random()*citations.length);
  return '"' + citations[index].citation + '" - '+ citations[index].auteur;
}

$(document).ready(function (){
  $("#citation").html(getCitation);
});
