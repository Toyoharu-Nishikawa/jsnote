import {parseParam} from "./hash.js"
import {view} from "../view.js"
import {model} from "../model.js"

export const drawCheckBox = ()=>{
  const hash = location.hash.slice(1)
  const param = parseParam(hash)
 
  const flag =  param.has("drawCheckBox") ?param.get("drawCheckBox") :
    (window.localStorage.getItem("drawCheckBox") || 0)
  
  const drawBoxFlag = parseFloat(flag)? true: false
  const drawCheckBoxElem = view.elements.drawCheckBox
  drawCheckBoxElem.checked = drawBoxFlag

  const elem = view.elements.drawArea
  if(drawBoxFlag){
    elem.className =  "display"; 
    window.dispatchEvent(new Event('resize'));
    window.localStorage.setItem("drawCheckBox",1)
  }
  else{ 
    elem.className =  "not_display";
    window.dispatchEvent(new Event('resize'));
    window.localStorage.setItem("drawCheckBox",0)
  }
}

