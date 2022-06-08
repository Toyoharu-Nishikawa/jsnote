export * as save from "./model/save.js"



///import {view} from "./view.js"
///import {importFiles} from "../filereader/index.js"
///import {key} from "./modules/key.js"
///import {edit} from "./modules/edit.js"
///import {changeSizeOfBox} from "./modules/changeSizeOfBox.js"
///import {keyBinding} from "./modules/keyBinding.js"
///import {fontSize} from "./modules/fontSize.js"
///import {getCode} from "./modules/getCode.js"
///import {drawCheckBox} from "./modules/drawCheckBox.js"
///import {sample} from "./modules/sample.js"
///import {register} from "./modules/register.js"
///import {parseParam,addParamToHash,removeParamFromHash} from "./modules/hash.js"
///import {saveStringAsFile} from "./modules/saveStringAsFile.js"

//const model = {
//  editor: null,
//  drawBoxHeight: null,
//  drawBoxWidth: 500,
//  sampleFlag: false,
//  registerFlag: false,
//  initialize:function(){
//    const drawArea = view.elements.drawArea
//    changeSizeOfBox()
//
//    keyBinding()
//    fontSize()
//    getCode()
//    drawCheckBox()
//
//    window.onpopstate = ()=>{
//      keyBinding()
//      fontSize()
//      getCode()
//      drawCheckBox()
//    }
//  },
//  workbenchUpdateEnd:function(e){
//    console.log("listen event of workbench.update.end")
//    const res = e.detail
//    console.log(res)
//    window.workbenchInput = res
//    const ev = new CustomEvent("self.input.update") 
//    document.dispatchEvent(ev)
//  },
//
//  sample: sample,
//  register: register,
//  run:{
//    execute:async function(){
//    },
//  },
//  popstate:{
//    execute:function(){
//      keyBinding()
//      fontSize()
//      getCode()
//      drawCheckBox()
//    }
//  },
//  key: key
//}


