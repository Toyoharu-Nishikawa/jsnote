import {read} from "../viewModel.js"
const elements = {
  read: document.getElementById("read"),
  readFile: document.getElementById("readFile"),
}

export const initialize = () => {
  elements.read.onclick = execute
}

const execute = (e) => {
   e.stopPropagation()
   read() 
}

