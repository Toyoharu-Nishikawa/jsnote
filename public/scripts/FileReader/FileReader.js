"user strict"
var importFiles = function(elem,data, callback) {
  function readFile(file){
    return new Promise((resolve,reject)=>{
      let filename = file.name;
      let lastDotPosition = filename.lastIndexOf('.');
      let bareFilename = filename.substr(0, lastDotPosition);
      let fileExtension = filename.substr(lastDotPosition+1).toLowerCase();
      let reader = new FileReader();

      function dataInjection(e){
        let fileData = e.target.result;
        data.push({
          filename: filename,
          barefilename: filename,
          ext: fileExtension,
          text: fileData,
        });
        reader.removeEventListener('load',dataInjection,false);
        resolve(fileData);
        reject("error");
      }
      reader.addEventListener("load",dataInjection,false);
      reader.readAsText(file, 'UTF-8');
    });//end of Promise
  }//end of readFile
        
  function change(e){
    let filelist = e.target.files;
    let promise = [];
    for(let file of filelist){
      promise.push(readFile(file))
    }
    Promise.all(promise).then(function(value){
        callback && callback();
      },
      function(reason){
        console.log(reason);
      });
    elem.removeEventListener("change",change ,false);
  }//end of change
  function stop(e){
    e.stopPropagation();
    e.target.value = null;
    elem.removeEventListener('click',stop,false);
  }//end of stop 
  elem.addEventListener('change', change, false);
  elem.addEventListener('click', stop, false);
  elem.click(); //fire click event
}
