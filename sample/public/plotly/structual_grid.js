const imax = 10
const jmax = 10
const kmax = 10


const listX = [...Array(kmax)].map(k=>[...Array(jmax)].map(k=>[...Array(imax)].map((k,index)=>index)))
const listY = [...Array(kmax)].map(k=>[...Array(jmax)].map((k,index)=>[...Array(imax)].map(k=>index)))
const listZ = [...Array(kmax)].map((k,index)=>[...Array(jmax)].map(k=>[...Array(imax)].map((k,index2)=>index)))

const x=[]
const y=[]
const z=[]

for(let k=0;k<kmax;k++){
  for(let j=0;j<jmax;j++){
    for(let i=0;i<imax;i++){
      x.push(listX[k][j][i]) 
      y.push(listY[k][j][i]) 
      z.push(listZ[k][j][i]) 
    }
    x.push(null)
    y.push(null)
    z.push(null)
  }
}

for(let j=0;j<jmax;j++){
  for(let i=0;i<imax;i++){
    for(let k=0;k<kmax;k++){
      x.push(listX[k][j][i]) 
      y.push(listY[k][j][i]) 
      z.push(listZ[k][j][i]) 
    }
    x.push(null)
    y.push(null)
    z.push(null)
  }
}

for(let i=0;i<imax;i++){
  for(let k=0;k<kmax;k++){
    for(let j=0;j<jmax;j++){
      x.push(listX[k][j][i]) 
      y.push(listY[k][j][i]) 
      z.push(listZ[k][j][i]) 
    }
    x.push(null)
    y.push(null)
    z.push(null)
  }
}


const trace1 = {
  x: x,
  y: y,
  z: z,
  line: {
    color: 'blue', 
    width: 1,
  }, 
  mode: 'lines', 
  type: 'scatter3d'
};

const data = [trace1];

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
 title: '3D structual grid', 
};

Plotly.plot('draw',data,layout,{
    editable: true,
    scrollZoom: true,
    showLink: false,
    displaylogo: false,
    modeBarButtonsToRemove: ['sendDataToCloud']
});