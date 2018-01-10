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

/*
let editor2 = ace.edit('draw');
editor2.setTheme("ace/theme/monokai");
editor2.getSession().setOptions({
  mode: "ace/mode/javascript",
  tabSize: 2,
  useSoftTabs: true
}); 
editor2.setKeyboardHandler("ace/keyboard/vim");
editor2.setOptions({
  fontSize: "13pt"
});

*/
let view = {
  drawBoxFlag: false,
  drawBoxHeight: 300,
  elements:{
    body: document.body, 
    header: document.getElementsByTagName("header")[0], 
    main: document.getElementsByTagName("main")[0], 
    menutab: document.getElementById("menutab"), 
    footer: document.getElementsByTagName("footer")[0], 
    run: document.getElementById("run"),
    keyBinding: document.getElementById("keyBinding"),
    fontSize: document.getElementById("fontSize"),
    editor: document.getElementById("editor"),
    draw: document.getElementById("draw"),
    drawCheckBox: document.getElementById("drawCheckBox"),
  },
  fitHeight: function(){
    let bodyBorderWidth = this.elements.body.style.borderWidth || 
      window.getComputedStyle(this.elements.body, null).getPropertyValue('border')
        .match(/(\d*).*px/)[1];
    let height = window.innerHeight
      - this.elements.header.getBoundingClientRect().height
      - this.elements.menutab.getBoundingClientRect().height
      - this.elements.footer.getBoundingClientRect().height
      - bodyBorderWidth*2 ;

    height = this.drawBoxFlag ? height - this.elements.draw.getBoundingClientRect().height : height;
    this.elements.editor.style.height = height + "px";
    return this;
  },
  showDrawBox: function(){
    this.elements.draw.style.height = this.drawBoxHeight + "px"
    this.fitHeight();
  },
  hideDrawBox: function(){
    this.elements.draw.style.height =  "0px";
    this.fitHeight();
  },
  initialize: function(){
    //this.svgResize.initEvent("svgResize",true,false);
    this.fitHeight();
    this.elements.drawCheckBox.addEventListener('change',(e)=>{
      let flag = e.target.checked;
      this.drawBoxFlag=flag;
      if(flag){ this.showDrawBox();console.log("checked") }
      else{ this.hideDrawBox();console.log("not-checked") }
      console.log(this.drawBoxFlag);
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


view.initialize();
control.set();
}
