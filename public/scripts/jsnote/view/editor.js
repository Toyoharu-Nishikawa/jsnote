import {run} from "../viewModel.js"
import {fromKey} from "./drawCheckBox.js"

const elements = {
    editor: document.getElementById("editor"),
}

let editor = null
export const initialize = () => {
  editor = ace.edit('editor')
  editor.setTheme("ace/theme/monokai")
  editor.getSession().setOptions({
    mode: "ace/mode/javascript",
    tabSize: 2,
    useSoftTabs: true,
  }) 

  editor.setOptions({
    fontSize: "13pt",
  })
  
  editor.$blockScrolling = Infinity
  
  editor.commands.addCommand({
    name:'run',
    bindKey: {win:'Shift-Return',mac:'Shift-Return'},
    exec: run,
  })
  
  editor.commands.addCommand({
    name:'draw',
    bindKey: {win:'Shift-Tab',mac:'Shift-Tab'},
    exec:fromKey
  })
    
  editor.commands.addCommand({
    name:'clearAll',
    bindKey: {win:'Shift-Delete',mac:'Shift-Delete'},
    exec: function(){
      editor.setValue("")
    },
  })

  return editor
}

export const getValue = () => {
  const code = editor.getValue()
  return code
}

export const setValue = (string) => {
  editor.setValue(string)
}

export const setFontSize = (fontSize) => {
  editor.setOptions({fontSize: fontSize })
}

export const setKeyBinding = (key) => {
  const editorKey = key !=="" ? "ace/keyboard/"+key : null
  editor.setKeyboardHandler(editorKey)
}

