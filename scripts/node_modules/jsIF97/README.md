# HOW TO USE
import * as if97 from "./jsIF97/index.js"
or
import * as if97 from "./node_modules/jsIF97/index.js"

if97.pt2h(1,800)


## caution
  .mjs cannaot reach to client brower in default setting of nginx 
   because mime type of .mjs is not set as application of javascript.
   add extension of mjs to application/javascript in mime.types file.
