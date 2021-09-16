import {model} from "./model.js"

const selfUpdate = ()=>{
  return new Promise((resolve, reject)=>{
    document.addEventListener("self.input.update",async()=>{
      console.log("listen event of self.input.update")
      await model.run.execute()
      resolve()
    },{once:true})
    model.workbench.update()
  })
}

export const post = async (url, data)=>{
  switch(url){
    case "/connect": {
      const resData = {
        STATUS: "SUCCESS" 
      }  
      return resData
    }
    default:{
      const flag = window.workbenchUpdateChain
      if(flag){
        await selfUpdate()
        console.log("self update end")
      }
      const resData = {
        response: window.workbenchOutput 
      }  
      return resData
    }
  }
}
