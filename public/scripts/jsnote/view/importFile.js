import {importFile} from "../viewModel.js"

const elements = {
  import: document.getElementById("import"),
  importFile: document.getElementById("importFile"),
}

export const initialize = () => {
  elements.import.onclick = execute
} 

const execute = () => {
  e.stopPropagation()
}


