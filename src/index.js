const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs')
const assert = require('assert')

app.use(bodyParser.urlencoded({
        extended: true
}));
app.use(bodyParser.json());



//conection URL

app.set('port', 5000);
app.use(express.static(__dirname + '/public'));

app.get('/node', function(request, response) {
  response.send("now running")
});

const save = (response, list, category,filename,code)=>{
  fs.writeFile('/usr/share/sample/'+category+'/'+filename, code, (err)=>{
    if(err){
       console.log("error: disabl to make file of /usr/share/sample/"+category+'/'+filename)
       response.json({"state":"error: disabl to make file of /usr/share/sample/"+category+'/'+filename});
    }
    else{
      fs.writeFile('/usr/share/sample/list.json',JSON.stringify(list,null,'  '),(err)=>{
        if(err){
          console.log("error: disabl to overwrite file of /usr/share/sample/list.json")
          response.json({"state":"error: disabl to overwrite file of /usr/share/sample/list.json"});
        }
        else{
          response.json({"state":"successfully registered"});
        }
      });
    }
  }); 
}

const makeAndSave = (response, list, category,filename,code) =>{
  fs.access('/usr/share/sample/'+category, (err)=>{
    if(err){
      console.log(err.code)
      fs.mkdir('/usr/share/sample/'+category,(err)=>{
        if(err){
          console.log("error: disabl to make directory of /usr/share/sample/"+category)
          response.json({"state":"error: disabl to make directory of /usr/share/sample/"+category});
        }
        else{
          save(response, list, category,filename,code);
        }
      });
    }
    else{
      save(response, list, category,filename,code);
    }
  })
}
app.all('/node/jsnoteregister',(request,response)=>{
  //console.log(request.body); 
  const category = request.body.category; 
  const filename = request.body.filename; 
  const code = request.body.code; 
  console.log("merge request category : " + category)
  console.log("merge request filename : " + filename)
  fs.readFile('/usr/share/sample/list.json', 'utf8',(err,data)=>{
    if(err){
      respose.json({"state":"error: /usr/share/sample/list.json is not found"});
    }
    else{
      let list = JSON.parse(data);
      const keys = list.map(k=>k.directory) 
      const keyNum = keys.indexOf(category);
      if(keyNum>-1){
        const fileNum = list[keyNum].list.indexOf(filename);
        if(fileNum>-1){
            console.log("over write " + filename + " in the category of "+ category)
        }
        else{
          list[keyNum].list.push(filename);
          console.log("add " + filename + " to " + category)
        }
      }
      else{
        console.log("add new category of  "+ category+ " and add " + filename + "to it");
        list.push({
          directory:category,
          list:[filename]
        })
      }
      makeAndSave(response,list,category,filename,code);
    }
  });
});

app.listen(app.get('port'), function() {
      console.log("Node app is running at localhost:" + app.get('port'))
});
