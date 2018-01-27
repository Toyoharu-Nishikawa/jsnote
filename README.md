jsnote
========

## Overview
javascript is what a wonderful language!!  
I believe we can change the world by javascript.  
i'm lovin' it

## Dsescription
jsnote will present you easy and fast coding place.    
You can code javascript briefly and display the draw space freely.  
jsnote is simple javascript editor running on web browsers.  


## Demo
Go to [jsnote](https://toyoharu-nishikawa.github.io/jsnote/public/index.html)

## Usage

####  FUNCTION BUTTON 
  
- "run"  
    runs your code written in the editor and record the code to local storage of WEB browser.

- "read"  
    read a text file form your local file system  to paste contents to the editor.

- "save"  
    save a text file as "jsnote.txt" to your local file system.  
    the default directory is "Downloads". 

- "import"  
     imports one or more text files to assing the name and the contents of file to array of "importTexts".  
     Ex.  
     importTexts[i].filename      : filename  
     importTexts[i].barefilename  : filename without extention  
     importTexts[i].ext           : extention of file  
     importTexts[i].text          : contents of file  

- "export"  
    exports the value of "exportText" assigned string data as a text file.  
    Assign string data to "exportText" before clicking the buttion of export.  
    Ex.  
    exportText = "welcome to jsnote" //before clicking the button of export

- "sample"  
    suggests you a lot of sample codes

#### SHORTCUT KEY 

- "Shift + Enter"  
    is equal to click the button of "run" to run your code written in the editor.

- "Shift + Tab"  
    is equal to check draw box on or off to show or hide draw area.  
    The DOM ID of draw area is "drawArea". It includs DOM of "draw".
 
- "Shift + Delete"  
    clears all words in the editor.


## Lisence