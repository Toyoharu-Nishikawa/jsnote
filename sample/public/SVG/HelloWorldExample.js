//svg.js
//Hellow World Example
// http://svgjs.com/

var width = document.getElementById("drawArea")
  .getBoundingClientRect().width || 400 ;
var height =document.getElementById("drawArea")
  .getBoundingClientRect().height || 400;
  
var draw = SVG('draw').panZoom({zoomFactor:1.1});

draw.width(width);
draw.height(height);
draw.attr('preserveAspectRatio', 'xMinYMin slice');
draw.style( {
  border: '1px solid #F5F5F5',
  margin:0,
  padding:0,
  background:'linear-gradient(to bottom, white, RoyalBlue )'
});

draw.viewbox(0, 0, width, height).flip('y');

draw.background = draw.group();
draw.background.line(-1000, 0, 1000, 0).fill("none").stroke({color:"black",opacity: 1.0,width:1})
  .attr("vector-effect", "non-scaling-stroke")
  .attr("stroke-dasharray","5 5");
draw.background.line(0, -1000, 0, 1000).fill("none").stroke({color:"black",opacity: 1.0,width:1})
  .attr("vector-effect", "non-scaling-stroke")
  .attr("stroke-dasharray","5 5");

draw.screen=draw.group();
draw.screen.stroke({color:"blue",opacity: 1.0,width:1});
draw.screen.sheet = [];
draw.screen.sheet.push(draw.screen.group());
draw.screen.sheet[0].rect(100,100)
  .draggable()
  .move(50,50).fill("none")
  .stroke({color:'black',opacity: 1.0,width:1})
  .attr("vector-effect", "non-scaling-stroke");
draw.screen.sheet[0].line(0,0,100,100)
  .draggable()
  .stroke({color:'black',opacity: 1.0,width:1})
  .attr("vector-effect", "non-scaling-stroke");
