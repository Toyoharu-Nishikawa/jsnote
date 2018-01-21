//when do you use pie chart?
//maybe...,  when I show how to spend the time of the day 
// , breakdown of buget or anything else.

var trace1 = {
  labels: ['Food and Tobacco', 'Household Operation', 
    'Medical and Health', 'Personal Care', 'Private Education'], 
  marker: {line: {color: 'transparent'}}, 
  type: 'pie', 
  values: [86.8, 46.2, 21.1, 5.4, 3.64]
};
var data = [trace1];
var layout = {
  hovermode: 'closest', 
  margin: {
    r: 10, 
    t: 25, 
    b: 40, 
    l: 60
  }, 
  showlegend: false, 
  title: 'United States Personal Expenditures by Categories in 1960', 
  xaxis: {
    showgrid: false, 
    showticklabels: false, 
    zeroline: false
  }, 
  yaxis: {
    showgrid: false, 
    showticklabels: false, 
    zeroline: false
  }
};
Plotly.plot('draw',
  data,
  layout,
  {
    editable: true,
    showLink: false,
    displaylogo: false,
    modeBarButtonsToRemove: ['sendDataToCloud']
  }
);
