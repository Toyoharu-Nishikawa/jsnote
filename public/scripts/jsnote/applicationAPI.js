import {model} from "./model.js"

export const post = async (url, data)=>{
  switch(url){
    default:{
      await model.workbench.update()
      model.run.execute()
      const resData = {
        response: window.workbenchOutput 
      }  
      console.log("update")
      console.log(resData)
      return resData
    }
  }
}
