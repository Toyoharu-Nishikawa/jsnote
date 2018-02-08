// read csv file in jsnote
// step1: push the button of import and select csv file
// step2: push the button of run or press the keys of "Shifit + Enter"

const transpose = A=>A[0].map((k,i)=>A.map((v)=>v[i]));
const csvParse = csv => csv
  .split(/\r\n|\n|\r/) //split by line feed codes
  .filter((k)=>k.match(/[^,\s\f\n\r\t\v]/)) //remove empty lines
  .map((k)=>k.trim() //remove white spaces of begining and end of line
    .replace(/,\s+/g,",") //remove white spaces
    .split(",") //split by cannma
    .map((l)=>isNaN(l)? l:parseFloat(l)) //convert string to flot
  ); 

const sample = 
  " 'title', 'tmp1', 'tmp2'\r\n \
          1,      1,     1 \r\n \
                           \r\n \
           ,       ,       \r\n \
          3,      4,     5 \r\n \
          5,      5,     5 \r\n \
          2,      3,     4 \r\n";

const csv = importTexts.length >0 ? importTexts[0].text : sample; //assign imported text or sample string to csv
console.log(csv);

const data = csvParse(csv);
console.log(data);

const index = data.shift(); //comment out tow lines from here
console.log(index);         //if index is not inclueded in csv

const dataT = transpose(data);
console.log(dataT);
