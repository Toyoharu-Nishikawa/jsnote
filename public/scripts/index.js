import {initialize} from "./jsnote/index.js"
import * as if97 from "./jsIF97/index.js"
import * as sci from "./sci/index.js"


window.if97= if97
window.sci=sci 

const main = async () =>{
  try{
    const necoengine = await import("/necoengine/scripts/necoengine/index.js")
    necoengine.login.setLoginButton()
    necoengine.login.visit()
    const workbench = new necoengine.Workbench()
    initialize(workbench)
    window.workbench = workbench
  }
  catch(e){
    console.log("error",e.message)
    console.log("necoengine is not alive")
  }
}

main()


