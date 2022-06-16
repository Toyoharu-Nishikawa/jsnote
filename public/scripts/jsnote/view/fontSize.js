import {setFontSize} from "../viewModel.js"

const elements = {
    fontSize: document.getElementById("fontSize"),
}

export const initialize = () => {
  elements.fontSize.onchange = execute
}

const execute = (e) => {
  e.stopPropagation() 
  const fsElem = elements.fontSize
  const index = fsElem.selectedIndex
  const fs = fsElem.options[index].value

  setFontSize(fs, index)
}

export const getFontSize = (fsOption)=> {
  const fontSize = elements.fontSize.options[fsOption].value
  return fontSize 
}

export const selectOption = (fsOption) => {
  elements.fontSize.options[fsOption].selected =true
}




