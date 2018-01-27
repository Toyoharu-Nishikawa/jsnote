//I don't know JSON.stringify cna teke one more arguments
//I have made line feeds of JSON string by regular expression 
//From now on, I will use JSON.stringify's third argument

var json = {
  x: [12,4,6,3,5],
  y: [2,14,46,423,45],
  title: "test[-]" 
};
exportText = JSON.stringify(json,null,"  ");
console.log(exportText);