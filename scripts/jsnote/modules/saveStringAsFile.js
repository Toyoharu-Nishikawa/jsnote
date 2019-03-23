
export const saveStringAsFile = function (){
  const filename = window.exportFileName || "jsnote_export.txt"
  if(Array.isArray(filename)){
    if(Array.isArray(exportText)){
      let count = 0
      const save = ()=>{
        const name = filename.length > count ? filename[count] :
           `jsnote_export_${count}.txt`
        const text = exportText[count]
        const blob = new Blob([text], {type: 'text/plain; charset=utf-8'});
        saveAs(blob, name, exportFileBOM);

        const id = setTimeout(save, 100);
        count++
        if(count > exportText.length-1){　
          exportText = null;
          exportFileName = null;
          exportFileBOM = true;
          clearTimeout(id)
        }
       
      }
      save()
    }
    else{
      const blob = new Blob([exportText], {type: 'text/plain; charset=utf-8'});
      saveAs(blob, filename[0],exportFileBOM);

      exportText = null;
      exportFileName = null
      exportFileBOM = true 
    }
  }
  else{
    if(Array.isArray(exportText)){
      const size = exportText.reduce((p,c)=>p+c.length, 0);
      if(size<10**9){
        console.log(`file size: ${size/10**9} GB`)
        console.log("download a file")
        const newList = ["["]
        exportText.forEach((text)=>{
          newList.push(text)
          newList.push(",")
        })
        newList.pop()
        newList.push("]")
        const blob = new Blob([...newList], {type: 'text/plain; charset=utf-8'})
        saveAs(blob, filename, exportFileBOM)

        exportText = null;
        exportFileName = null;
        exportFileBOM = true 
      }
      else{
        console.log(`file size: ${size/10**9} GB`)
        console.log("download each files")
        const lastDotPosition = filename.lastIndexOf('.');
        const bare = filename.substr(0, lastDotPosition);
        const extension = filename.substr(lastDotPosition+1).toLowerCase();
  
        exportText.forEach((text,index)=>{
            const blob = new Blob([text], {type: 'text/plain; charset=utf-8'});
            const newFileName = bare + "_" + index + "." +extension;
            saveAs(blob, newFileName, exportFileBOM);
        })

        exportText = null;
        exportFileName = null;
        exportFileBOM = true 
      }
    }
    else{
      const blob = new Blob([exportText], {type: 'text/plain; charset=utf-8'});
      saveAs(blob, filename, exportFileBOM);

      exportText = null;
      exportFileName = null;
      exportFileBOM = true 
    }
  }
};

