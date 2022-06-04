import {save} from "../viewModel.js"

const elements = {
  save: document.getElementById("save"),
}

export const initialize = () => {
  elements.save.onclick = execute
}

const execute = () => {
  e.stopPropagation()
  save()
}
