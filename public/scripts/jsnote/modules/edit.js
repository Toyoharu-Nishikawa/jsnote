import {model} from "../model.js"
import {view} from "../view.js"

export const edit = {
  initialize:function(){
    const editor = ace.edit('editor')
    editor.setTheme("ace/theme/monokai")
    editor.getSession().setOptions({
      mode: "ace/mode/javascript",
      tabSize: 2,
      useSoftTabs: true
    }) 
    
    editor.$blockScrolling = Infinity
    
    editor.commands.addCommand({
      name:'run',
      bindKey: {win:'Shift-Return',mac:'Shift-Return'},
      exec: model.run.execute,
    })
    
    editor.commands.addCommand({
      name:'draw',
      bindKey: {win:'Shift-Tab',mac:'Shift-Tab'},
      exec: function(){
        view.elements.drawCheckBox.click()
      },
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
}

