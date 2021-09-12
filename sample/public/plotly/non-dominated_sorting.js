console.clear()
const makeList = (l) => {
  const list = [...Array(l)].map(v=>Math.round(Math.random()*1E2)) 
  return list
}

const main = ()=>{

  const NS = sci.optimize.FastNonDominatedSorting
 
  const L = 2
  const N =200
  const data = [...Array(N)].map(v=>makeList(2))
  const data2 = [...Array(N)].map(v=>makeList(2))
   
  const ns = new NS(data) 
  
  const start = performance.now()
  ns.solve()
  ns.addOneDataAndSolve(data2[0])
  ns.addDataListAndSolve(data2)
  const end = performance.now()
  const elapsedTime = end -start
  console.log("elapedTime",elapsedTime,"ms")
   
  
  
  const paretoData = ns.getParetoDataList()
  console.log("paretoData",paretoData)
  
  const paretoDataIds = ns.getParetoDataIdList()
  console.log("paretoDataIds",paretoDataIds)

  plot(paretoData)
}


const plot = (paretoRankData) => {
  const plotData = paretoRankData.map((list,i)=>{
    list.sort((a,b)=>a[0]<b[0]?-1:1)
    const name = "Rank" + `${i+1}`
    const obj = {
      x: list.map(v=>v[0]),
      y: list.map(v=>v[1]),
      marker: {size: 8}, 
      mode: 'lines+markers', 
      name: name,
      type: 'scatter', 
    } 
    return obj
  })

  const layout = {
    autosize: true, 
    height: 800, 
    title: 'Sample of Non-Dominated Sorting', 
    width: 800, 
    xaxis: {
      autorange: true, 
      title: 'x [-]', 
      type: 'linear'
    }, 
    yaxis: {
      autorange: true, 
      title: 'y [-]', 
      type: 'linear'
    }
  }
  Plotly.newPlot('draw',plotData, layout,{
      editable: true,
      scrollZoom: true,
      showLink: false,
      displaylogo: false,
      modeBarButtonsToRemove: ['sendDataToCloud']
    }
  )  
}

main()
