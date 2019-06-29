
workbenchUpdateChain = false


const update = ()=> new Promise((resolve,reject)=>{
  document.addEventListener("self.input.update",resolve)
  const ev = new CustomEvent("Workbench.update.fire")
  document.dispatchEvent(ev)
})

const value = [1,2,3,4,5] 

const main = async()=>{
  for(let i=0;i<5;i++){
    
    const output = value[i]
    workbenchOutput = output
    await update()  
    const input = workbenchInput[0][1].response
    
    console.log("input",output)
    console.log("result", input)
  
  }
}
main()