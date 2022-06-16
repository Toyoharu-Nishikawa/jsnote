import {setKeyBinding} from "../viewModel.js"

const elements = {
    keyBinding: document.getElementById("keyBinding"),
}

export const initialize = () => {
  elements.keyBinding.onchange = execute
}

const execute = (e) => {
  e.stopPropagation() 

  const keyElem = elements.keyBinding
  const index = keyElem.selectedIndex
  const key = keyElem.options[index].value


  setKeyBinding(key, index)
}

export const getKeyBinding = (keyOption) => {
  const keyBinding = elements.keyBinding.options[keyOption].value
  return keyBinding 

}

export const selectOption = (keyOption) => {
  elements.keyBinding.options[keyOption].selected =true
}


