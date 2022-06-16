import {setRegister,sendToRegister} from "../viewModel.js"

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

const execute = (e) => {
   e.stopPropagation()
}

export const show = () => {
  elements.registerArea.className = "display"
  setRegister()
}

export const hide = () => {
  elements.registerArea.className = "not_display";
}



export const setRegisterArea = (list) => {
  const keys = list.map(k=>k.directory) 
  const categoryInput = elements.categoryInput
  const category = elements.category
  const filenameInput = elements.filenameInput
  const filename = elements.filename 
  const exec = elements.registerExec
  category.innerHTML=null 
  filename.innerHTML=null 

  const categoryFragment = document.createDocumentFragment()
  const optionList = keys.reduce((pre,current)=>{
    const option = document.createElement("option")
    option.value = current
    pre.appendChild(option) 
    return pre;
  }, categoryFragment)
  category.appendChild(optionList)

  categoryInput.onchange= () => {
    filename.innerHTML=null; 
    const text = categoryInput.value
    const num = keys.indexOf(text)
    if(num>-1){
      const filenameFragment = document.createDocumentFragment()
      const optionList = list[num].list.reduce((pre,current)=>{
        const option = document.createElement("option")
        option.value = current
        pre.appendChild(option)
        return pre;
      }, filenameFragment)
      filename.appendChild(optionList)
    }
    checkText()
  } 

  filenameInput.onchange = () =>{
    checkText()
  }

  exec.onclick = () =>{
    const messageElem = elements.registerMessage;
    messageElem.textContent = null;
    const category = categoryInput.value;
    const filename = filenameInput.value;
    if(checkText()){
      const register = {
        category: category,
        filename: filename,
      }
      sendToRegister(register)
    }
  }
}

const checkText = () => {
  const messageElem = elements.registerMessage;
  messageElem.textContent = null;
  const category = elements.categoryInput.value;
  const filename = elements.filenameInput.value;
  const regExp = new RegExp(/[a-zA-Z0-9._]+$/) 
  const categoryFlag = regExp.test(category);
  const filenameFlag = regExp.test(filename);
  if(categoryFlag && filenameFlag){
    return true;
  }
  else{
    messageElem.textContent = "a-z A-Z 0-9 . and _ are only available for category and file name"
    return false;
  }
}



