//read csv
//to plot by plotly
//plotly is always better choice for me

const transpose = A=>A[0].map((k,i,array)=>A.map((v)=>v[i]));
const csvParse = csv => csv
  .split(/\r\n|\n|\r/) //split by line feed codes
  .filter((k)=>k.match(/\S/)) //remove empty lines
  .map((k)=>k.trim() //remove white spaces of begining and end of line
    .replace(/,\s+/g,",") //remove white spaces
    .split(",") //split by cannma
    .map((l)=>isNaN(l)? l:parseFloat(l)) //convert string to flot
  ); 
    
var sample = 
  " 1, 1, 1 \r\n \
    3, 4, 5 \r\n \
    5, 5, 5 \r\n \
    2, 3, 4 \r\n";

var csv = importTexts.length >0 ? importTexts[0].text : sample; //assign import text or sample string to csv
console.log(csv);

var data = csvParse(csv);
console.log(data);
var dataT = transpose(data);
console.log(dataT);

var trace1 = {
    x:dataT[0],
    y:dataT[1],
    mode: "makers+lines",
    type: "scatter",
    name: "sample1"
};
var trace2 = {
    x: dataT[0],
    y: dataT[2],
    mode: "makers+lines",
    type: "scatter",
    name: "sample2"
};
var plotlyData = [trace1, trace2];
var layout = {
  title: "sample plot"
};


Plotly.plot("draw",plotlyData,layout,{
  editable: true,
  scrollZoom: true,
  showLink: false,
  displaylogo: false,
  modeBarButtonsToRemove: ['sendDataToCloud']
})

