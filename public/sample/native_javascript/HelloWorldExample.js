// 3-line-message
//write here what you wanto to tell the world
// javascript is what a wonderful language !! i'm lovin' it.


/*
-----------------
   READ ME
-----------------

-- SHORTCUT KEY --
- Shift + Enter
  is equal to click the button of "run" 
  to run your code written in the editor

- Shift + Tab
  is equal to check draw box on or off 
  to show or hide draw area
  draw area's DOM id is "drawArea" including "draw"
 
- Shift + Delete
  clears all words in the editor

-- FUNCTION BUTTON --
- run
  runs you code written in the editor
  and record the code to local storage of WEB browser

- read
  read a text file form your local file system 
  to paste contents to the editor

- save
  save a text file as "jsnote.txt" to your local file system, 
  "Downloads" in default, 

- import
  imports one or more text files
  to assing the name and the contents of file to array of "importTexts"
  Ex.
  importTexts[i].filename      : filename
  importTexts[i].barefilename  : filename without extention
  importTexts[i].ext           : extention of file
  importTexts[i].text          : contents of file

- export
  exports a text file including a string data of "exportText"
  assign a string data to "exportText" and click the buttion of export
  Ex.
  exportText = "welcome to jsnote"

- sample
  suggests you a lot of sample codes
*/

var text = document.createTextNode("welcome to jsnote");
document.getElementById("draw").appendChild(text);
console.log("welcome to jsnote");

console.log("imported file names are")
importTexts.forEach((file,index,array)=>{
  if(file.hasOwnProperty("filename")){
    console.log(file.filename);
  }
});
exportText = "welcome to jsnote";
console.log("click export to download file")
