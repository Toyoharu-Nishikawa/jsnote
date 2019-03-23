import {parseParam} from "./hash.js"
import {view} from "../view.js"
import {model} from "../model.js"

export const keyBinding = ()=> {
  const hash = location.hash.slice(1)
  const param = parseParam(hash)
  const keyBindingElem = view.elements.keyBinding 
  const keyOption =  param.has("keyBinding") ? param.get("keyBinding"):
    window.localStorage.getItem("keyBinding") || 0

  const key =keyBindingElem.options[keyOption].value
  keyBindingElem.options[keyOption].selected =true
  const editorKey = key !=="" ? "ace/keyboard/"+key : null
  model.editor.setKeyboardHandler(editorKey)
}

