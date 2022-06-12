import {getSample, insertSampleURL} from "../viewModel.js"

const elements = {
  registerArea: document.getElementById("registerArea"),
  registerExec: document.getElementById("registerExec"),
  registerMessage: document.getElementById("registerMessage"),
  categoryInput: document.forms.register.category,
  category: document.getElementById("category"),
  filenameInput: document.forms.register.filename,
  filename: document.getElementById("filename"),
}


export const initialize = () => {
  elements.registerArea.onclick = execute
}

const execute = () => {
   e.stopPropagation()
}

export const show = () => {
  elements.registerArea.className = "display"
  getSample()
}

export const hide = () => {
  elements.registerArea.className = "not_display";
}



