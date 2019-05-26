import {view} from "../view.js"
import {model} from "../model.js"

export const  register = {
  sampleList: null,
  execute: function(){
    if(view.registerFlag){
      this.hide();
      this.removeEvent();
    }
    else {
      this.show();
      this.addEvent();
      this.getSample();
    }
  },//end of execute
  show: function(){
    view.elements.register.className = "ongoing";
    view.registerFlag = true;
    view.elements.registerArea.className = "display";
  },
  hide: function(){
    view.elements.register.className = "";
    view.registerFlag = false;
    view.elements.registerArea.className = "not_display";
  },
  mainScreenClick: function(e){
    e.stopPropagation();
    view.elements.register.click();
  },
  addEvent: function(){
    view.elements.main.addEventListener("click",this.mainScreenClick,false);
  },
  removeEvent: function(){
    view.elements.main.removeEventListener("click",this.mainScreenClick,false);
  },
  getSample: function(){
    let req = new XMLHttpRequest();
    req.open("GET","sample/private/sample.json",true);
    req.onload = (e)=>{
      switch(req.status){
        case 200:
          this.setRegisterArea(req.response);
          break;
        default:
          console.log("Your private sample is not yet registered. Register your sample code by pushing the bution of register")
          this.setRegisterArea("[]");
          break;
      }     
    };
    req.onerror = (e)=>{
      console.log("http request error")
    };
    req.setRequestHeader("content-type","application/text");
    req.responseType ="text";
    req.send();
  },
  setRegisterArea: function(json){
    const list = JSON.parse(json)
    const keys = list.map(k=>k.directory); 
    const categoryInput = view.elements.categoryInput; 
    const category = view.elements.category; 
    const filenameInput = view.elements.filenameInput; 
    const filename = view.elements.filename; 
    const exec = view.elements.registerExec;
    category.innerHTML=null; 
    filename.innerHTML=null; 

    let categoryFragment = document.createDocumentFragment();
    const optionList = keys.reduce((pre,current)=>{
      const option = document.createElement("option");
      option.value = current;
      pre.appendChild(option); 
      return pre;
    }, categoryFragment);
    category.appendChild(optionList);

    categoryInput.onchange= () => {
      filename.innerHTML=null; 
      const text = categoryInput.value
      const num = keys.indexOf(text)
      if(num>-1){
        let filenameFragment = document.createDocumentFragment();
        const optionList = list[num].list.reduce((pre,current)=>{
          const option = document.createElement("option");
          option.value = current;
          pre.appendChild(option); 
          return pre;
        }, filenameFragment);
        filename.appendChild(optionList);
      }
      this.checkText();
    }; 
    filenameInput.onchange = () =>{
      this.checkText();
    }
    exec.onclick = () =>{
      const messageElem = view.elements.registerMessage;
      messageElem.textContent = null;
      const category = categoryInput.value;
      const filename = filenameInput.value;
      if(this.checkText()){
        const code = model.editor.getValue();
        if(code){
          const register = {
            category: category,
            filename: filename,
            code: code, 
          }
          this.send(register);
        }
        else{
          messageElem.textContent ="the contents of editor is empty.";
        }
      }
    };
  },
  send: function(json){
    const messageElem = view.elements.registerMessage;
    const req = new XMLHttpRequest();
    req.open("POST","node/jsnoteregister",true);
    req.onload = (e)=>{
      switch(req.status){
        case 200:
          const respose = req.response;
          console.log(respose)
          messageElem.textContent = respose.state;
          break;
        default:
          //console.log(`request status : ${req.status}. Check your API server is working.`)
          messageElem.textContent = `request status: ${req.status}. Check your API server is  working. If API server cannot be found, you have to build local API server with docker-compose. Register does not work without API server.`;
          break;
      }
    };
    req.onerror = e=>{
      //console.log("http request error")
      messageElem.textContent = "http request error";
    };
    req.setRequestHeader("content-type","application/json");
    req.responseType ="json";
     req.send(JSON.stringify(json));
  },
  checkText: function(){
    const messageElem = view.elements.registerMessage;
    messageElem.textContent = null;
    const category = view.elements.categoryInput.value;
    const filename = view.elements.filenameInput.value;
    const regExp = new RegExp(/[a-zA-Z0-9._]+$/) 
    const categoryFlag = regExp.test(category);
    const filenameFlag = regExp.test(filename);
    if(categoryFlag && filenameFlag){
      return true;
    }
    else{
      messageElem.textContent = "a-z A-Z 0-9 . and _ are only available for category and file name"
      return false;
    }
  },
}

