const imax = 30
const jmax = 30

const listX = [...Array(jmax)].map(k=>[...Array(imax)].map((k,index)=>index-15))
const listY = [...Array(jmax)].map((k,index)=>[...Array(imax)].map(k=>index-15))
const listZ = [...Array(jmax)].map((k,index1)=>[...Array(imax)].map((k,index2)=>Math.sin((index1-15)/3)+Math.cos((index2-15)/3)))
const listF = [...Array(jmax)].map((k,index1)=>[...Array(imax)].map((k,index2)=>index1+index2))

const x=[]
const y=[]
const z=[]

for(let j=0;j<jmax;j++){
  for(let i=0;i<imax;i++){
    x.push(listX[j][i]) 
    y.push(listY[j][i]) 
    z.push(listZ[j][i]) 
  }
  x.push(null)
  y.push(null)
  z.push(null)
}
for(let i=0;i<imax;i++){
  for(let j=0;j<jmax;j++){
    x.push(listX[j][i]) 
    y.push(listY[j][i]) 
    z.push(listZ[j][i]) 
  }
  x.push(null)
  y.push(null)
  z.push(null)
}


const trace1 = {
  x: x,
  y: y,
  z: z,
  line: {
    color: 'black', 
    width: 1,
  }, 
  mode: 'lines', 
  type: 'scatter3d'
};
const trace2 = {
  x: listX,
  y: listY,
  z: listZ,
  surfacecolor: listF,
  colorbar:{
    title:"temp",
  },
  //cmin:0,
  //cmax:5,
  colorscale:"Jet",
  type: 'surface',

};
const data = [trace1,trace2];

const layout = {
  height: 500, 
  width: 500,
  scene: {
    /*aspectratio: {
      x: 1, 
      y: 1, 
      z: 1,
    },*/ 
    xaxis: {
      backgroundcolor: 'rgb(230, 230,230)', 
      gridcolor: 'rgb(255, 255, 255)', 
      showbackground: true, 
      zerolinecolor: 'rgb(255, 255, 255)'
    }, 
    yaxis: {
      backgroundcolor: 'rgb(230, 230,230)', 
      gridcolor: 'rgb(255, 255, 255)', 
      showbackground: true, 
      zerolinecolor: 'rgb(255, 255, 255)'
    }, 
    zaxis: {
      backgroundcolor: 'rgb(230, 230,230)', 
      gridcolor: 'rgb(255, 255, 255)', 
      showbackground: true, 
      zerolinecolor: 'rgb(255, 255, 255)'
    }
  }, 
 title: '3D colored surface', 
};

Plotly.plot('draw',data,layout,{
    editable: true,
    scrollZoom: true,
    showLink: false,
    displaylogo: false,
    modeBarButtonsToRemove: ['sendDataToCloud']
});