var importTexts = [];
var exportText = "";
var editor = ace.edit('editor');
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
(()=>{
  let keyBindingElem = document.getElementById("keyBinding");
  let fontSizeElem = document.getElementById("fontSize");
  let keyOption = window.localStorage.getItem("deyBinding") || 0;
  let fsOption = window.localStorage.getItem("fontSize")|| 3;
  let key =keyBindingElem.options[keyOption].value;
  let fs =fontSizeElem.options[fsOption].value;
  let string = window.localStorage.getItem("jsnoteRemember")|| "";

  keyBindingElem.options[keyOption].selected =true
  fontSizeElem.options[fsOption].selected =true
  
  key = key !=="" ? "ace/keyboard/"+key : null;
  editor.setKeyboardHandler(key);
  editor.setOptions({
    fontSize: fs 
  });
  editor.setValue(string);
})();
