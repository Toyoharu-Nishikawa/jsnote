import {exportFile} from "../viewModel.js"

const elements = {
  export: document.getElementById("export"),
}

export const initialize = () => {
  elements.export.onclick = execute
}

const execute = (e) => {
  e.stopPropagation()
  exportFile()
}
