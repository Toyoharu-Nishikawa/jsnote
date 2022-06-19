import {run} from "../viewModel.js"
const elements = {
  run: document.getElementById("run"),
}

export const initialize = () => {
  elements.run.onclick = execute
}

const execute = (e) => {
  e.stopPropagation() 
  run()
}


