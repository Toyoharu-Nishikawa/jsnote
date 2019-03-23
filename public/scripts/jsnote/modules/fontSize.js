import {parseParam} from "./hash.js"
import {view} from "../view.js"
import {model} from "../model.js"

export const fontSize = () => {
  const hash = location.hash.slice(1)
  const param = parseParam(hash)
 
  const fontSizeElem = view.elements.fontSize
  const fsOption =  param.has("fontSize") ? param.get("fontSize") :
    window.localStorage.getItem("fontSize")|| 3
  const fs =fontSizeElem.options[fsOption].value
  fontSizeElem.options[fsOption].selected =true
  model.editor.setOptions({fontSize: fs })
}

