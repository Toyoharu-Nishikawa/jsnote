import {changeDrawBox} from "../viewModel.js"


const elements = {
  drawCheckBox: document.getElementById("drawCheckBox"),
}

export const initialize = () => {
  elements.drawCheckBox.onchange = execute
}

export const execute = (e) => {
   e.stopPropagation()
   const isChecked = elements.drawCheckBox.checked
   changeDrawBox(isChecked)
}

export const fromKey = () => {
   const isChecked = elements.drawCheckBox.checked
   elements.drawCheckBox.checked = !isChecked
   changeDrawBox(!isChecked)
}
export const check = (isChecked) => {
  const drawCheckBoxElem = elements.drawCheckBox
  drawCheckBoxElem.checked = isChecked
}

