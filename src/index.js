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
      fs.writeFile('/usr/share/sample/sample.json',JSON.stringify(list,null,'  '),(err)=>{
        if(err){
          console.log("error: disabl to overwrite file of /usr/share/sample/list.json")
          response.json({"state":"error: disabl to overwrite file of /usr/share/sample/list.json"});
        }
        else{
          console.log("successfully registered");
          response.json({"state":"successfully registered"});
        }
      });
    }
  }); 
}

const makeAndSave = (response, list, category,filename,code) =>{
  fs.access('/usr/share/sample/'+category, (err)=>{
    if(err){
      console.log("the dicretory of  "+ category + " is not foud. So make it.");
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
const saveExe = (response, category,filename,code) =>{
  fs.readFile('/usr/share/sample/sample.json', 'utf8',(err,data)=>{
    if(err){
      respose.json({"state":"error: /usr/share/sample/sample.json is not found"});
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
}

const checkPublicAndSave = (response, category ,filename, code)=>{
  fs.readFile('/usr/share/sample/list.json', 'utf8',(err,data)=>{
    if(err){
      console.log("error: /usr/share/sample/list.json is not found")
      response.json({"state":"error: /usr/share/sample/list.json is not found"});
    }
    else{
      let list = JSON.parse(data);
      const keys = list.map(k=>k.directory) 
      const keyNum = keys.indexOf(category);
      if(keyNum>-1){
        const fileNum = list[keyNum].list.indexOf(filename);
        if(fileNum>-1){
            console.log("disable to overwrite " + filename + " in the category of "+ category);
            response.json({"state":"error: disable to overwrite the public sample of " + filename + " in the category of "+ category + "."});
        }
        else{
          saveExe(response, category,filename,code);
        }
      }
      else{
        saveExe(response, category,filename,code);
      }
    }
  });
};

app.all('/node/jsnoteregister',(request,response)=>{
  //console.log(request.body); 
  const category = request.body.category; 
  const filename = request.body.filename; 
  const code = request.body.code; 
  console.log("merge request category : " + category)
  console.log("merge request filename : " + filename)
  checkPublicAndSave(response, category ,filename, code);
});

app.listen(app.get('port'), function() {
      console.log("Node app is running at localhost:" + app.get('port'))
});
