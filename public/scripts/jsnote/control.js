import {model} from "./model.js"
import {view} from "./view.js"
import {key} from "./modules/key.js"

export const control = {
  read: {
    execute:function(e){
      e.stopPropagation()
      model.read.execute() 
    },//end of execute
    add: function(){
      view.elements.read.onclick = this.execute
    },//end of add
  },//end of read
  save: {
    execute: function(e){
      e.stopPropagation()
      model.save.execute()
    },//end of execute
    add: function(){
      view.elements.save.onclick = this.execute
    },//end of add
  },//end of save
  import: {
    execute: function(e){
      e.stopPropagation();
      model.import.execute()
    },//end of execute
    add: function(){
      view.elements.import.onclick = this.execute
    },//end of add
  },//end of import
  export: {
    execute: function(e){
      e.stopPropagation();
      model.export.execute()
    },//end of execute
    add: function(){
      view.elements.export.onclick = this.execute
    },//end of add
  },//end of clear
  sample: {
    execute:function(e){
      e.stopPropagation();
      model.sample.execute()
    },
    add: function(e){
      view.elements.sample.onclick = this.execute
    },//end of add 
  },//end of sample
  register: {
    execute:function(e){
      e.stopPropagation();
      model.register.execute()
    },
    add: function(){
      view.elements.register.onclick = this.execute
    }
  }, //end of register
  run: {
    execute: function(e){
      e.stopPropagation()
      model.run.execute()
    },//end of execute
    add: function(){
      view.elements.run.onclick = this.execute
    },//end of add
  },//end of run
  keyBinding:{
    execute: function(e){
      e.stopPropagation()
      model.keyBinding.execute()
    },//end of execute
    add: function(){
      view.elements.keyBinding.onchange = this.execute
    },//end of add
  },//end of keyBinding
  fontSize: {
    execute: function(e){
      e.stopPropagation();
      model.fontSize.execute()
    },//end of execute
    add: function(){
      view.elements.fontSize.onchange = this.execute
    },//end of add
  },//end of fontSize
  drawCheckBox: {
    execute:function(e){
      e.stopPropagation()
      model.drawCheckBox.execute()
    },
    add: function(){
      view.elements.drawCheckBox.onchange = this.execute
    },//end of add
  },//end of drawCheckBox
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
  workbenchUpdate:{
    add:function(){
      document.addEventListener("Workbench.update.end", model.workbenchUpdate)
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
      this.workbenchUpdate
    ]
    controls.forEach(v=>v.add())
    model.initialize()
    this.setWorkbench.add(workbench)
  }//end of set
}

