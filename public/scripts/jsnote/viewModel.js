import * as view from "./view.js"
//import * as model from "./model.js"

export const initialize = (workbench) => {
  view.drawCheckBox.initialize()
  view.editor.initialize()
  view.exportFile.initialize()
  view.fontSize.initialize()
  view.importFile.initialize()
  view.keyBinding.initialize()
  view.read.initialize()
  view.run.initialize()
  view.save.initialize()

  initializeCode()
  initializeDrawCheckBox()
  initializeFontSize()
  initializeKeyBinding()
}

export const read = () => {

}

export const save = () => {

}

export const importFile = () => {

}

export const exportFile = () => {

}

export const run = async () => {
  const code = view.editor.getValue()
  view.drawArea.refresh()
  const url = new URL(window.location.href)
  url.searchParams.delete("sample")
  history.replaceState('','',url.href);
  window.localStorage.setItem("jsnoteRemember",code)
  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor
  await new AsyncFunction(code)()
}

const initializeCode = async () => {
  const url = new URL(window.location.href)
 
  if(!url.searchParams.has("sample")){
    const string = window.localStorage.getItem("jsnoteRemember")|| ""
    view.editor.setValue(string)
  }
  else{
    const url = url.searchParams.get("sample")
    try{
      const res = await fetch(url)
      const st = res.status
      switch(st){
        case 200:{
          const text = await res.text()
          view.editor.setValue(text)
          break
        }
        default:{
          const string = window.localStorage.getItem("jsnoteRemember")|| ""
          veiw.editor.setValue(string)
          break
        }
      }
    } 
    catch(e){
      console.log(e.message)
      console.log("http request error")
      const string = window.localStorage.getItem("jsnoteRemember")|| ""
      view.editor.setValue(string)
    }
  }

}


const initializeFontSize = () => {
  const url = new URL(window.location.href)
  const params = url.searchParams
  const fsOption =  params.has("fontSize") ? params.get("fontSize") :
    (window.localStorage.getItem("fontSize") || 3)

  const fs = view.fontSize.getFontSize(fsOption)
  view.fontSize.selectOption(fsOption)
  view.editor.setFontSize(fs)
}

export const setFontSize = (fontSize, index) => {
  view.editor.setFontSize(fontSize)
  window.localStorage.setItem("fontSize", index)

  const url = new URL(window.location.href)
  const params = url.searchParams
  url.searchParams.set("fontSize", index) 
  history.replaceState('','',url.href);
}


const initializeKeyBinding = () => {
  const url = new URL(window.location.href)
  const params = url.searchParams
  const keyOption =  params.has("keyBinding") ? params.get("keyBinding") :
    (window.localStorage.getItem("keyBinding") || 0)

  const key =view.keyBinding.getKeyBinding(keyOption) 

  view.keyBinding.selectOption(keyOption)
  view.editor.setKeyBinding(key)
}

export const setKeyBinding = (key, index) => {
  view.editor.setKeyBinding(key)
  window.localStorage.setItem("keyBinding", index)

  const url = new URL(window.location.href)
  const params = url.searchParams
  url.searchParams.set("keyBinding", index) 
  history.replaceState('','',url.href);
}


export const initializeDrawCheckBox = ()=>{
  const url = new URL(window.location.href)
  const params = url.searchParams
 
  const flag =  params.has("drawCheckBox") ?params.get("drawCheckBox") :
    (window.localStorage.getItem("drawCheckBox") || 0)
  
  const isChecked = parseInt(flag)? true: false
  view.drawCheckBox.check(isChecked)
  view.drawArea.openClose(isChecked)


}

export const changeDrawBox = (isChecked) => {

  view.drawArea.openClose(isChecked)

  window.dispatchEvent(new Event('resize'));

  const url = new URL(window.location.href)
  const params = url.searchParams

  if(isChecked){
    url.searchParams.set("drawCheckBox", 1) 
    window.localStorage.setItem("drawCheckBox",1)
  }
  else{
    url.searchParams.set("drawCheckBox", 0) 
    window.localStorage.setItem("drawCheckBox",0)
  }
  history.replaceState('','',url.href);
}
