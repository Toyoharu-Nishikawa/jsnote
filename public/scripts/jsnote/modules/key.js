import {model} from "../model.js"
import {view} from "../view.js"

export const key = {
  execute: function(e){
    switch(e.keyCode){
      //keydown shift + Enter
      case 13:{ //key code 13: Enter
        if(e.shiftKey){
          e.preventDefault()
          //console.log("shift+Enter")
          model.run.execute()
        }
        break
      }
      case 9:{ //key code 9: Tab
        if(e.shiftKey){
          e.preventDefault();
          //console.log("shift+Tab")
          view.elements.drawCheckBox.click()
        }
        break
       }
      default:{
        break
      }
    }
  },
}

