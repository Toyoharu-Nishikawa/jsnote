// plotly is a beatiful data visualization tool
//you can draw bar graphs, pie charts, scatter plots and so on. 
//https://plot.ly/feed/

Plotly.newPlot( "draw", 
  [
    {
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16]
    }
  ],
  {
    margin: { t: 0 }
  },
  {
    editable: true,
    showLink: false,
    displaylogo: false,
    modeBarButtonsToRemove: ['sendDataToCloud']
  }
);   
