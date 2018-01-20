var data = [
  {
    x: ['giraffes', 'orangutans', 'monkeys'],
    y: [20, 14, 23],
    type: 'bar'
  }
];

var layout = {
  title: "animals in the zoo",
  xaxis: {
    title: "animal type"
  },
  yaxis: {
    title: "population"
  }
}

Plotly.newPlot('draw', data, layout, {
    editable: true,
    showLink: false,
    displaylogo: false,
    modeBarButtonsToRemove: ['sendDataToCloud']
  }
);
