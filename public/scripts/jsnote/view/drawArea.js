import {read} from "../viewModel.js"
const elements = {
  drawArea: document.getElementById("drawArea"),
  draw: document.getElementById("draw"),
  body: document.body,
}

let drawBoxWidth = 500

export const initialize = () => {
  online.add()
}


export const refresh = () => {
  elements.drawArea.innerHTML = "<div id='draw'></div>"
}

export const openClose = (isChecked) => {
  const elem = elements.drawArea
  if(isChecked){
    elem.className =  "display"; 
  }
  else{ 
    elem.className =  "not_display";
  }
}


const drag = {
  flag: false,
  originalX: null,
  originalWidth: null,
  add(){
    //console.log("add drag")
    elements.body.onmousedown = this.mouseDown.bind(this)
    elements.body.onmouseup = this.mouseUp.bind(this)
  },
  remove(){
    //console.log("remove drag")
    elements.body.onmousedown = null
    elements.body.onmousemove = null
    elements.body.onmouseup = null
  },
  mouseDown(e){
    //console.log("mousedown");
    this.flag = true;
    this.originalX =  e.clientX;
    this.originalWidth =  drawBoxWidth
    elements.body.onmousemove = this.mouseMove.bind(this)
  },
  mouseUp(e){
    //console.log("mouseup");
    this.originalWidth =  null
    this.flag = false
    this.remove(this.element)
  },
  mouseMove(e){
    //console.log("mousemove")
    const currentX =  e.clientX;
    drawBoxWidth = this.originalX - currentX + this.originalWidth;
    elements.drawArea.style.width = drawBoxWidth + "px";
    elements.draw.style.width = drawBoxWidth + "px";
  }
}

const online = {
  flag: false,
  add(){
    elements.drawArea.onmouseenter = this.mouseEnter.bind(this)
    elements.drawArea.onmouseleave = this.mouseLeave.bind(this)
  },
  mouseEnter(){
    //console.log("mouse enter")
    elements.drawArea.onmousemove = this.mouseMove.bind(this)
  },
  mouseLeave(e){
    //console.log("mouse leave")
    this.flag = false;
    e.currentTarget.style.cursor = "default";
    elements.drawArea.onmousemove = null
    if(!drag.flag){
      drag.remove()
    }
  },
  mouseMove(e){
    const originX = e.offsetX
    if(originX<10){
      if(!this.flag){
        this.flag = true;
        e.currentTarget.style.cursor = "w-resize";
        if(!drag.flag){
          drag.add()
        }
      }
    }
    else{
      if(this.flag) {
        this.flag = false;
        e.currentTarget.style.cursor = "default";
        if(!drag.flag){
          drag.remove()
        }
      }
    }
  }
}

