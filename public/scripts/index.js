//jsnote namespac
"use strict"
{
/*reference url about ace editor 
https://github.com/ajaxorg/ace/issues/91
https://stackoverflow.com/questions/29620161/how-to-set-indent-size-in-ace-editor
*/

let saveStringAsFile = function (string,filename){
  var blob = new Blob([string], {type: 'text/plain; charset=utf-8'});
  saveAs(blob, filename);
}

let view = {
  drawBoxFlag: false,
  drawBoxHeight: null,
  drawBoxWidth: 500,
  sampleFlag: false,
  elements:{
    body: document.body, 
    header: document.getElementsByTagName("header")[0], 
    main: document.getElementsByTagName("main")[0], 
    menutab: document.getElementById("menutab"), 
    footer: document.getElementsByTagName("footer")[0], 
    read: document.getElementById("read"),
    readFile: document.getElementById("readFile"),
    save: document.getElementById("save"),
    import: document.getElementById("import"),
    importFile: document.getElementById("importFile"),
    export: document.getElementById("export"),
    sample: document.getElementById("sample"),
    run: document.getElementById("run"),
    keyBinding: document.getElementById("keyBinding"),
    fontSize: document.getElementById("fontSize"),
    editor: document.getElementById("editor"),
    drawArea: document.getElementById("drawArea"),
    draw: document.getElementById("draw"),
    drawCheckBox: document.getElementById("drawCheckBox"),
    sampleArea: document.getElementById("sampleArea"),
  },
  fitHeight: function(){
    let bodyBorderWidth = (this.elements.body.style.borderWidth || 
      window.getComputedStyle(this.elements.body, null)
      .getPropertyValue('border'))
      .match(/(\d*).*px/)[1];
    let height = window.innerHeight
      - this.elements.header.getBoundingClientRect().height
      - this.elements.menutab.getBoundingClientRect().height
      - this.elements.footer.getBoundingClientRect().height
      - bodyBorderWidth*2 ;

    this.elements.editor.style.height = height + "px";
    this.elements.drawArea.style.height = height + "px";
    this.elements.drawArea.style.width = this.drawBoxWidth + "px";
    this.elements.draw.style.height = height + "px";
    this.elements.draw.style.width = this.drawBoxWidth + "px";
    return this;
  },
  changeSizeOfBox: function(elem){
    let self = this;
    let drag = {
      element: elem,
      flag: false,
      originalX: null,
      originalWidth: null,
      setElement: function(element){
        this.element = element;
      },
      add:function(){
        //console.log("add drag")
        this.element.addEventListener('mousedown',this.mouseDown,false);
        this.element.addEventListener('mouseup',this.mouseUp,false);
      },
      remove: function(){
        //console.log("remove drag")
        this.element.removeEventListener('mousedown',this.mouseDown,false);
        this.element.removeEventListener('mousemove',this.mouseMove,false);
        this.element.removeEventListener('mouseup',this.mouseUp,false);
      },
      mouseDown: function(e){
        //console.log("mousedown");
        let me = drag; 
        me.flag = true;
        me.originalX =  e.clientX;
        me.originalWidth =  self.drawBoxWidth;
        me.element.addEventListener('mousemove',me.mouseMove,false);
      },
      mouseUp: function(e){
        //console.log("mouseup");
        let me = drag; 
        me.originalWidth =  null;
        me.flag = false;
        me.remove(me.element);
      },
      mouseMove: function(e){
        //console.log("mousemove")
        let me = drag; 
        let currentX =  e.clientX;
        self.drawBoxWidth = me.originalX - currentX + me.originalWidth;
        self.elements.drawArea.style.width = self.drawBoxWidth + "px";
        self.elements.draw.style.width = self.drawBoxWidth + "px";
      }
    };
    let online = {
      flag: false,
      element:null,
      setElement:function(element){
        this.element = element;
      },
      add: function(){
        this.element.addEventListener('mouseenter',this.mouseEnter,false);
        this.element.addEventListener('mouseleave',this.mouseLeave,false);
      },
      remove: function(){
        this.element.removeEventListener('mouseenter',this.mouseEnter,false);
        this.element.removeEventListener('mouseleave',this.mouseLeave,false);
        this.element.removeEventListener('mousemove',this.mouseMove,false);
      },
      mouseEnter: function(){
        //console.log("mouse enter")
        let me = online;
        me.element.addEventListener('mousemove',me.mouseMove,false);
      },
      mouseLeave: function(e){
        //console.log("mouse leave")
        let me = online;
        me.flag = false;
        e.currentTarget.style.cursor = "default";
        me.element.removeEventListener('mousemove',me.mouseMove,false);
        if(!drag.flag){drag.remove();} 
      },
      mouseMove: function(e){
        let me = online;
        let originX = e.offsetX;
        if(originX<10){
          if(!me.flag){
            me.flag = true;
            e.currentTarget.style.cursor = "w-resize";
            if(!drag.flag){drag.add();} 
          }
        }
        else{
          if(me.lag) {
            me.flag = false;
            e.currentTarget.style.cursor = "default";
            if(!drag.flag){drag.remove();} 
          }
        }
      },
    };
    drag.setElement(document.body)
    online.setElement(elem);
    online.add();
  },
  showDrawBox: function(){
    this.elements.drawArea.className =  "display";
    window.dispatchEvent(new Event('resize'));
    return this;
  },
  hideDrawBox: function(){
    this.elements.drawArea.className =  "not_display";
    //this.fitHeight();
    window.dispatchEvent(new Event('resize'));
    return this;
  },
  initialize: function(){
//    this.fitHeight();
    this.changeSizeOfBox(this.elements.drawArea);
    this.elements.drawCheckBox.addEventListener('change',(e)=>{
      let flag = e.target.checked;
      this.drawBoxFlag=flag;
      if(flag){ this.showDrawBox(); }
      else{ this.hideDrawBox(); }
    });
   /*
    window.addEventListener('resize', (e)=> {
      view.resizeTimer = setTimeout(()=>{
        this.fitHeight();
      }, 10);
    },false);
   */
    return this;
  },
};

let control = {
  func: {
    read: {
      execute: function(){
        let element = view.elements.importFile;
        editor.setValue('');
        let text = [];
        importFiles(element,text,()=>{
          editor.setValue(text[0].text);
        });
      },//end of execute
      add: function(){
        view.elements.read.addEventListener('click',(e)=>{
          e.stopPropagation();
          this.execute();
        },false);
      },//end of add
    },//end of read
    save: {
      execute: function(){
        let string = editor.getValue();
        saveStringAsFile(string, 'jsnote.txt');
      },//end of execute
      add: function(){
        view.elements.save.addEventListener('click',(e)=>{
          e.stopPropagation();
          this.execute();
        },false);
      },//end of add
    },//end of save
    import: {
      execute: function(){
        let element = view.elements.readFile;
        importTexts = [];
        importFiles(element, importTexts)
      },//end of execute
      add: function(){
        view.elements.import.addEventListener('click',(e)=>{
          e.stopPropagation();
          this.execute();
        },false);
      },//end of add
    },//end of import
    export: {
      execute: function(){
        let string = exportText || 'assign string data to the variable, exportText ';
        saveStringAsFile(string, 'jsnote_export.txt');
      },//end of execute
      add: function(){
        view.elements.export.addEventListener('click',(e)=>{
          e.stopPropagation();
          this.execute();
        },false);
      },//end of add
    },//end of clear
    sample: {
      getFlag: false,
      sampleList: null,
      execute: function(){
        if(view.sampleFlag){this.hide();}
        else {
          this.show();
          if(!this.getFlag){
            this.getSample();
            this.getFlag= true;
          }
        }
      },//end of execute
      show: function(){
        view.elements.sample.className = "ongoing";
        view.sampleFlag = true;
        view.elements.sampleArea.className = "display";
      },
      hide: function(){
        view.elements.sample.className = "";
        view.sampleFlag = false;
        view.elements.sampleArea.className = "not_display";
      },
      getSample: function(){
        let req = new XMLHttpRequest();
        req.open("GET","sample/list.json",true);
        req.onload = (e)=>{
          this.setSampleArea(req.response);
        };
        req.setRequestHeader("content-type","application/text");
        req.responseType ="text";
        req.send();
      },
      setSampleArea: function(json){
        let list = JSON.parse(json)
        let divContainer = document.createElement("div");
        divContainer.className = "swiper-container";
        let divWrapper = document.createElement("div");
        divWrapper.className = "swiper-wrapper";
        list.forEach((value,index,array)=>{
          let divSlide = document.createElement("div");
           divSlide.className = "swiper-slide";
          let h2 = document.createElement("h2");
          let title = document.createTextNode(value.category);
          let article = document.createElement("article")
          let ul = Array.from(Array(3), ()=>
            document.createElement("ul")
          );
          value.list.forEach((value2,index2,array2)=>{
            let sample = document.createTextNode(value2.title);
            let li = document.createElement("li");
            li.appendChild(sample);
            li.onclick = this.insertSample(value.directory, value2.code);
            ul[index2%3].appendChild(li);
          });
          h2.appendChild(title);
          divSlide.appendChild(h2);
          ul.forEach((value3,index3,array3)=>{
            article.appendChild(value3);
          })
          divSlide.appendChild(article);
          divWrapper.appendChild(divSlide);
        });
        let divPagination = document.createElement("div");
        divPagination.className = "swiper-pagination";
        let divButtonPrev = document.createElement("div");
        divButtonPrev.className = "swiper-button-prev";
        let divButtonNext = document.createElement("div");
        divButtonNext.className = "swiper-button-next";
        divContainer.appendChild(divWrapper);
        divContainer.appendChild(divPagination);
        divContainer.appendChild(divButtonPrev);
        divContainer.appendChild(divButtonNext);
        view.elements.sampleArea.appendChild(divContainer);
        let swiper = new Swiper(".swiper-container",{
          slidesPerView: 1,
          spaceBetween: 30,
          loop: false,
          observer: true,
          pagination: {
            el:'.swiper-pagination',
            ckickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
      },//end of setSample
      insertSample: function(directory, code){
        return (e)=>{
          e.stopPropagation();
          let req = new XMLHttpRequest();
          let url = "sample/" + directory + "/" +code;
          req.open("GET",url,true);
          req.onload = (e)=>{
            editor.setValue(req.response);
          };
          req.setRequestHeader("content-type","application/text");
          req.responseType ="text";
          req.send();
        }
      },//end of insertSample
      add: function(){
        view.elements.sample.addEventListener('click',(e)=>{
          e.stopPropagation();
          this.execute();
        });
      },//end of add 
    },//end of sample
    run: {
      execute: function(){
        let code = editor.getValue();
        drawArea.innerHTML = "<div id='draw'></div>";
        window.localStorage.setItem("remember",code);
        new Function(code)();
        //view.fitHeight();
        //eval(code)();
      },//end of execute
      add: function(){
        view.elements.run.addEventListener("click",(e)=>{
          e.stopPropagation();
          this.execute();
        },false);
      },//end of add
    },//end of run
    keyBinding:{
      execute: function(){
        let keyElem = view.elements.keyBinding;
        let key = keyElem.options[keyElem.selectedIndex].value;
        key = key !=="" ? "ace/keyboard/"+key : null;
        editor.setKeyboardHandler(key);
      },//end of execute
      add: function(){
        view.elements.keyBinding.addEventListener("change",(e)=>{
          e.stopPropagation();
          this.execute();
        },false)
      },//end of add
    },//end of keyBinding
    fontSize: {
      execute: function(){
        let fsElem = view.elements.fontSize;
        let fs = fsElem.options[fsElem.selectedIndex].value;
        editor.setOptions({
          fontSize: fs 
        });
      },//end of execute
      add: function(){
        view.elements.fontSize.addEventListener("change",(e)=>{
          e.stopPropagation();
          this.execute();
        },false)
      },//end of add
    },//end of fontSize
  },//end of func
  set: function(){
    for(let any in this.func){
      control.func[any].add();
    }
  }//end of set
};

let key = {
  keyDown: function(e){
    switch(e.keyCode){
      //keydown shift + Enter
      case 13: //key code 13: Enter
        if(e.shiftKey){
          e.preventDefault();
          //console.log("shift+Enter")
          control.func.run.execute();
        }
        break;
      case 9: //key code 9: Tab
        if(e.shiftKey){
          e.preventDefault();
          //console.log("shift+Tab")
          view.elements.drawCheckBox.click();
        }
        break;

     default:
        break;
    }
  },
  add: function(){
    document.addEventListener("keydown", this.keyDown, false)
  }
}

editor.commands.addCommand({
  name:'run',
  bindKey: {win:'Shift-Return',mac:'Shift-Return'},
  exec: control.func.run.execute,
});

editor.commands.addCommand({
  name:'draw',
  bindKey: {win:'Shift-Tab',mac:'Shift-Tab'},
  exec: function(){
    view.elements.drawCheckBox.click();
  },
});
  
editor.commands.addCommand({
  name:'clearAll',
  bindKey: {win:'Shift-Delete',mac:'Shift-Delete'},
  exec: function(){
    editor.setValue("");
  },
});
key.add();
view.initialize();
control.set();
}
