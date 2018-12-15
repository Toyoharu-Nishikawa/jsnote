"user strict"

const readFile = (file)=>{
  const reader = new FileReader();
  return new Promise((resolve,reject)=>{
    reader.onerror = (e)=>{
      reject("error",file.name, e)
    }
    reader.onload= (e)=>{
      const filename = file.name;
      const lastDotPosition = filename.lastIndexOf('.');
      const bareFilename = filename.substr(0, lastDotPosition);
      const fileExtension = filename.substr(lastDotPosition+1).toLowerCase();
      const fileData = e.target.result;
      const data = {
        filename: filename,
        barefilename: filename,
        ext: fileExtension,
        text: fileData,
      }         
      console.log("read", filename)
      resolve(data)
    }
    reader.readAsText(file, 'UTF-8')
  })
}//end of readFile

const stop = (e)=>{
  e.stopPropagation()
  e.target.value =null
}
      
var importFiles = (elem, callback)=> {
  return new Promise((resolve, reject)=>{
    elem.onchange = async (e)=>{
      const filelist = [...e.target.files]
      console.log("start to read files")
      const fileData = await Promise.all(filelist.map(async (v)=>await readFile(v)))
      console.log(fileData[0].text)
      data = fileData
      console.log(data)
      console.log("finish reading files")
      callback && callback(fileData);
      resolve(fileData)
    }
    elem.onclick= stop 
    elem.click(); //fire click event
  })
}
