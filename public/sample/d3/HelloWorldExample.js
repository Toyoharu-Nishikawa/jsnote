//d3.js
//hello world example 
//D3.js is a JavaScript library for manipulating documents based on data

var sampleSVG = d3.select("#draw")
  .append("svg")
  .attr("width", 100)
  .attr("height", 100);    
sampleSVG.append("circle")
  .style("stroke", "gray")
  .style("fill", "white")
  .attr("r", 40)
  .attr("cx", 50)
  .attr("cy", 50)
  .on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
  .on("mouseout", function(){d3.select(this).style("fill", "white");});
