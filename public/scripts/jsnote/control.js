import {model} from "./model.js"
import {view} from "./view.js"
import {key} from "./modules/key.js"

export const control = {
  key:{
    execute:function(e){
      model.key.execute(e)
    },
    add:function(){
      document.onkeydown = this.execute
    },
  },
  view:{
    add:function(){
      view.elements.sampleArea.onclick = e=>{e.stopPropagation()}
      view.elements.registerArea.onclick = e=>{e.stopPropagation()}
    }
  },
  setWorkbench:{
    add:function(workbench){
      model.workbench = workbench
    }
  },
  workbenchUpdateEnd:{
    add:function(){
      document.addEventListener("Workbench.update.end", model.workbenchUpdateEnd)
    }
  },
  initialize: function(workbench){
    const controls = [
      this.read,
      this.save,
      this.import,
      this.export,
      this.sample,
      this.register,
      this.run,
      this.keyBinding,
      this.fontSize,
      this.drawCheckBox,
      this.key,
      this.view,
      this.workbenchUpdateEnd,
    ]
    controls.forEach(v=>v.add())
    model.initialize()
    this.setWorkbench.add(workbench)
  }//end of set
}

