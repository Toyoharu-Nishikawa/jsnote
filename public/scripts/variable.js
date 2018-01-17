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


