//parse csv to array
//without d3 
//I love native js 

var sample = " dog, cat, monkey\n 3, 4, 5 \r\n \n 5, 5,5\r 10,8,1 ";
var csv = importTexts[0].text || sample; //assign import text or sample string to csv
console.log(csv);

var data =csv.split(/\r\n|\n|\r/) //split by line feed codes
  .filter((k)=>k.match(/\S/)) //remove empty lines
  .map((k)=>k.trim().replace(/,\s+/g,",").split(","));//remove white spaces and split by cannma

console.log(data);
