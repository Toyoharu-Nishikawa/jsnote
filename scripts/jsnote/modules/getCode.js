import {parseParam} from "./hash.js"
import {view} from "../view.js"
import {model} from "../model.js"

export const getCode = async ()=>{
  const hash = location.hash.slice(1)
  const param = parseParam(hash)
 
  if(!param.has("sample")){
    const string = window.localStorage.getItem("jsnoteRemember")|| ""
    model.editor.setValue(string)
  }
  else{
    const url = param.get("sample")
    try{
      const res = await fetch(url)
      const st = res.status
      switch(st){
        case 200:{
          const text = await res.text()
          model.editor.setValue(text)
          break
        }
        default:{
          const string = window.localStorage.getItem("jsnoteRemember")|| ""
          model.editor.setValue(string)
          break
        }
      }
    } 
    catch(e){
      console.log(e.message)
      console.log("http request error")
      const string = window.localStorage.getItem("jsnoteRemember")|| ""
      model.editor.setValue(string)
    }
  }
}

