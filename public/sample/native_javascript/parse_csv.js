//parse csv to array
//without d3 
//I love native js 

const transpose = A=>A[0].map((k,i,array)=>A.map((v)=>v[i])); //transpose matrix
const csvParse = csv => csv
  .split(/\r\n|\n|\r/) //split by line feed codes
  .filter((k)=>k.match(/\S/)) //remove empty lines
  .map((k)=>k.trim().replace(/,+/g,",").split(","));//remove white spaces and split by cannma

var sample = " dog, cat, monkey\n 3, 4, 5 \r\n \n 5, 5,5\r 10,8,1 ";

var csv = importTexts.length >0 ? importTexts[0].text : sample; //assign import text or sample string to csv
console.log(csv);

var data = csvParse(csv)
console.log(data);
console.log(transpose(data))
