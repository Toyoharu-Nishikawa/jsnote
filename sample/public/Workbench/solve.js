
workbenchUpdateChain = false


const update = ()=> new Promise((resolve,reject)=>{
  document.addEventListener("self.input.update",resolve)
  const ev = new CustomEvent("Workbench.update.fire")
  document.dispatchEvent(ev)
})

const f = async (x)=>{
  workbenchOutput = x 
  await update()  
  const res = workbenchInput[0][1].response
  return res 
}

const main = async()=>{
  const x0 = 1   
  const dfdx0 = 2  
  const res = await sci.solve.asyncLineSplitMethod(x0, f, dfdx0, 20, 1E-5)
  console.log(res) 
}
main()