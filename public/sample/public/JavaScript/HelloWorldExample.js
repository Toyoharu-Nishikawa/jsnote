//hello world 
//I will start to code javascript
//have a nice day 


const text = document.createTextNode("welcome to jsnote");
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
