//jsnote namespac
"use strict"
{
/*reference url about ace editor 
https://github.com/ajaxorg/ace/issues/91
https://stackoverflow.com/questions/29620161/how-to-set-indent-size-in-ace-editor
*/

let editor = ace.edit('editor');
editor.setTheme("ace/theme/monokai");
editor.getSession().setOptions({
  mode: "ace/mode/javascript",
  tabSize: 2,
  useSoftTabs: true
}); 
editor.setKeyboardHandler("ace/keyboard/vim");
editor.setOptions({
  fontSize: "13pt"
});
editor.$blockScrolling = Infinity; 

let saveStringAsFile = function (string,filename){
  var blob = new Blob([string], {type: 'text/plain; charset=utf-8'});
  saveAs(blob, filename);
}

let view = {
  drawBoxFlag: false,
  drawBoxHeight: null,
  drawBoxWidth: 500,
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
    run: document.getElementById("run"),
    keyBinding: document.getElementById("keyBinding"),
    fontSize: document.getElementById("fontSize"),
    editor: document.getElementById("editor"),
    drawArea: document.getElementById("drawArea"),
    draw: document.getElementById("draw"),
    drawCheckBox: document.getElementById("drawCheckBox"),
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
    this.fitHeight();
    window.dispatchEvent(new Event('resize'));
    return this;
  },
  initialize: function(){
    this.fitHeight();
    this.changeSizeOfBox(this.elements.drawArea);
    this.elements.drawCheckBox.addEventListener('change',(e)=>{
      let flag = e.target.checked;
      this.drawBoxFlag=flag;
      if(flag){ this.showDrawBox(); }
      else{ this.hideDrawBox(); }
    });
    window.addEventListener('resize', (e)=> {
      view.resizeTimer = setTimeout(()=>{
        this.fitHeight();
      }, 10);
    },false);
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
    run: {
      execute: function(){
        let code = editor.getValue();
        new Function(code)();
        view.fitHeight();
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

view.initialize();
control.set();
}
