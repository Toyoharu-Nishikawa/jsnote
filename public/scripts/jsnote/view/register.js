import {show as showArea, hide as hideArea} from "./registerArea.js"

const elements = {
    register: document.getElementById("register"),
    main: document.getElementsByTagName("main")[0], 
}

let registerFlag = false
export const initialize = () => {
  elements.register.onclick = execute
}

const execute = () => {
 if(registerFlag){
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
  elements.register.className = "ongoing"
  registerFlag = true
}

const  hide = () => {
  hideArea()
  elements.register.className = "";
  registerFlag = false
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

