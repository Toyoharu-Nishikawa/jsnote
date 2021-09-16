import {view} from "./view.js"
import {importFiles} from "../filereader/index.js"
import {key} from "./modules/key.js"
import {edit} from "./modules/edit.js"
import {changeSizeOfBox} from "./modules/changeSizeOfBox.js"
import {keyBinding} from "./modules/keyBinding.js"
import {fontSize} from "./modules/fontSize.js"
import {getCode} from "./modules/getCode.js"
import {drawCheckBox} from "./modules/drawCheckBox.js"
import {sample} from "./modules/sample.js"
import {register} from "./modules/register.js"
import {parseParam,addParamToHash,removeParamFromHash} from "./modules/hash.js"
import {saveStringAsFile} from "./modules/saveStringAsFile.js"

export const model = {
  editor: null,
  drawBoxHeight: null,
  drawBoxWidth: 500,
  sampleFlag: false,
  registerFlag: false,
  initialize:function(){
    const editor = edit.initialize()
    this.editor = editor

    const drawArea = view.elements.drawArea
    changeSizeOfBox()

    keyBinding()
    fontSize()
    getCode()
    drawCheckBox()

    window.onpopstate = ()=>{
      keyBinding()
      fontSize()
      getCode()
      drawCheckBox()
    }
  },
  workbenchUpdateEnd:function(e){
    console.log("listen event of workbench.update.end")
    const res = e.detail
    console.log(res)
    window.workbenchInput = res
    const ev = new CustomEvent("self.input.update") 
    document.dispatchEvent(ev)
  },
  read:{
    execute: async function(){
      const element = view.elements.importFile;
      model.editor.setValue('');
      const files = await importFiles(element)
      console.log(`read ${files[0].filename}`)
      model.editor.setValue(files[0].text)
    },
  },
  save:{
    execute:function(){
      const string = model.editor.getValue();
      const blob = new Blob([string],{type:'text/plain;charset=utf-8;'}) 
      saveAs(blob, 'jsnote.txt');
    },
  },
  import:{
    execute: async function(){
      const element = view.elements.readFile
      importTexts = [];
      importTexts = await importFiles(element)
      importTexts.forEach(v=>console.log(`read ${v.filename}`))
    },
  },
  export:{
    execute:function(){
      saveStringAsFile()
    }
  },
  sample: sample,
  register: register,
  run:{
    execute:async function(){
      let code = model.editor.getValue()
      const drawArea = view.elements.drawArea
      drawArea.innerHTML = "<div id='draw'></div>"
      window.localStorage.setItem("jsnoteRemember",code)
      window.onpopstate = getCode
      removeParamFromHash("sample")
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor
      await new AsyncFunction(code)()
    },
  },
  keyBinding:{
    execute:function(){
      let keyElem = view.elements.keyBinding;
      let key = keyElem.options[keyElem.selectedIndex].value;
      window.localStorage.setItem("keyBinding",keyElem.selectedIndex);
      window.onpopstate = keyBinding;
      addParamToHash("keyBinding",keyElem.selectedIndex);
    },
  },
  fontSize:{
    execute:function(){
      let fsElem = view.elements.fontSize;
      let fs = fsElem.options[fsElem.selectedIndex].value;
      window.localStorage.setItem("fontSize",fsElem.selectedIndex);
      window.onpopstate =fontSize;
      addParamToHash("fontSize",fsElem.selectedIndex);
    },
  },
  drawCheckBox:{
    execute: function(){
      const elem = view.elements.drawCheckBox
      const flag = elem.checked;
      if(flag){
        window.onpopstate =drawCheckBox;
        addParamToHash("drawCheckBox",1);
      }
      else{
        window.onpopstate =drawCheckBox;
        addParamToHash("drawCheckBox",0);
      }
    },//end of execute
    showDrawBox: function(){
      view.elements.drawArea.className =  "display";
      window.dispatchEvent(new Event('resize'));
      window.localStorage.setItem("drawCheckBox",1)
      return this;
    },
    hideDrawBox: function(){
      view.elements.drawArea.className =  "not_display";
      window.dispatchEvent(new Event('resize'));
      window.localStorage.setItem("drawCheckBox",0)
      return this;
    },
  },
  popstate:{
    execute:function(){
      keyBinding()
      fontSize()
      getCode()
      drawCheckBox()
    }
  },
  key: key
}


