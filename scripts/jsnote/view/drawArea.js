import {read} from "../viewModel.js"
const elements = {
  drawArea: document.getElementById("drawArea"),
  draw: document.getElementById("draw"),
}

export const initialize = () => {
}

const execute = (e) => {
}

export const refresh = () => {
  elements.drawArea.innerHTML = "<div id='draw'></div>"
}

export const openClose = (isChecked) => {
  const elem = elements.drawArea
  if(isChecked){
    elem.className =  "display"; 
  }
  else{ 
    elem.className =  "not_display";
  }
}
