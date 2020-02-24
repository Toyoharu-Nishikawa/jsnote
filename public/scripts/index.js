import {jsnote} from "./jsnote/index.mjs"
import {post} from "./jsnote/applicationAPI.js"
import {connection} from "./workbench.js"
import * as if97 from "./jsIF97/index.mjs"
import * as sci from "./sci/index.mjs"

//import {login, Workbench} from "./necoengine/index.js"
//import {login, Workbench} from "/necoengine/scripts/necoengine/index.js"

window.if97= if97
window.sci=sci 
//login.setLoginButton()
//login.visit()
//
//const workbench = new Workbench(connection, post)
//jsnote.initialize(workbench)

jsnote.initialize()

const main = async () =>{
  try{
    const necoengine = await import("/necoengine/scripts/necoengine/index.js")
    necoengine.login.setLoginButton()
    necoengine.login.visit()
    const workbench = new necoengine.Workbench(connection, post)
    //jsnote.initialize(workbench)
    jsnote.setWorkbench.add(workbench)
  }
  catch(e){
    console.log("necoengine is not alive")
  }
}

main()


