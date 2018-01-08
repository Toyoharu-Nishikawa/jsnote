//jsnote namespace
"use strict"
{
/*reference url about addCommand
https://github.com/ajaxorg/ace/issues/91
*/
let editor = ace.edit('editor');
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");
editor.setKeyboardHandler("ace/keyboard/vim");
editor.setOptions({
  fontSize: "13pt"
});

let view = {
  elements:{
    run: document.getElementById("run"),
    keyBinding: document.getElementById("keyBinding"),
    fontSize: document.getElementById("fontSize"),
    editor: document.getElementById("editor"),
    plotly: document.getElementById("plotly"),
  }
};


let control = {
  func: {
    run: {
      execute: function(){
        let code = editor.getValue();
        new Function(code)();
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


control.set();
}
