import {show as showArea, hide as hideArea} from "./sampleArea.js"

const elements = {
    sample: document.getElementById("sample"),
    main: document.getElementsByTagName("main")[0], 
}

let sampleFlag = false

export const initialize = () => {
  elements.sample.onclick = execute
}

const execute = () => {
 if(sampleFlag){
    hide()
    removeEvent()
  }
  else {
    show()
    addEvent()
  }
}

const show =  ()=>{
  showArea()
  elements.sample.className = "ongoing"
  sampleFlag = true
}

const  hide = () => {
  hideArea()
  elements.sample.className = "";
  sampleFlag = false
}

const mainScreenClick = (e) => {
  e.stopPropagation()
  execute()
}
const addEvent = () => {
  elements.main.addEventListener("click", mainScreenClick)
}

const removeEvent = () => {
  elements.main.removeEventListener("click", mainScreenClick)
}





