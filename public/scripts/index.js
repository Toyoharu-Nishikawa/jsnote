import {jsnote} from "./jsnote/index.mjs"
import {post} from "./jsnote/applicationAPI.js"
import {connection} from "./workbench.js"
import * as if97 from "./jsIF97/index.mjs"
import * as sci from "./sci/index.mjs"
import {login} from "/necoengine/scripts/necoengine/login/index.js"
import {Workbench} from "/necoengine/scripts/necoengine/workbench/index.js"

login.setLoginButton()
login.visit()

window.if97= if97
window.sci=sci 

const workbench = new Workbench(connection, post)

jsnote.initialize(workbench)
