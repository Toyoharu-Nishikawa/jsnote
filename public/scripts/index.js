import * as jsnote from "./jsnote/index.mjs"
import * as if97 from "./jsIF97/index.mjs"
import * as sci from "./sci/index.mjs"
import {login} from "/necoengine/scripts/necoengine/login/index.js"

login.setLoginButton()
login.visit()

window.if97= if97
window.sci=sci 

jsnote.key.add();
jsnote.view.initialize();
jsnote.control.set();
