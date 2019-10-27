
let drawBoxWidth = 500

const elements = {
  drawArea: document.getElementById("drawArea"),
  draw: document.getElementById("draw"),
  body: document.body,
}

const drag = {
  element: null,
  flag: false,
  originalX: null,
  originalWidth: null,
  setElement: function(element){
    this.element = element;
  },
  add:function(){
    //console.log("add drag")
    elements.body.onmousedown = this.mouseDown.bind(this)
    elements.body.onmouseup = this.mouseUp.bind(this)
  },
  remove: function(){
    //console.log("remove drag")
    elements.body.onmousedown = null
    elements.body.onmousemove = null
    elements.body.onmouseup = null
  },
  mouseDown: function(e){
    //console.log("mousedown");
    this.flag = true;
    this.originalX =  e.clientX;
    this.originalWidth =  drawBoxWidth
    elements.body.onmousemove = this.mouseMove.bind(this)
  },
  mouseUp: function(e){
    //console.log("mouseup");
    this.originalWidth =  null
    this.flag = false
    this.remove(this.element)
  },
  mouseMove: function(e){
    //console.log("mousemove")
    const currentX =  e.clientX;
    drawBoxWidth = this.originalX - currentX + this.originalWidth;
    elements.drawArea.style.width = drawBoxWidth + "px";
    elements.draw.style.width = drawBoxWidth + "px";
  }
}

const online = {
  flag: false,
  element:null,
  setElement:function(element){
    this.element = element
  },
  add: function(){
    elements.drawArea.onmouseenter = this.mouseEnter.bind(this)
    elements.drawArea.onmouseleave = this.mouseLeave.bind(this)
  },
  remove: function(){
    this.element.onmouseenter = null 
    this.element.onmouseleave = null
    this.element.onmousemove = null
  },
  mouseEnter: function(){
    //console.log("mouse enter")
    elements.drawArea.onmousemove = this.mouseMove.bind(this)
  },
  mouseLeave: function(e){
    //console.log("mouse leave")
    this.flag = false;
    e.currentTarget.style.cursor = "default";
    elements.drawArea.onmousemove = null 
    if(!drag.flag){
      drag.remove()
    } 
  },
  mouseMove: function(e){
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

export const  changeSizeOfBox = () => {
  online.add()
}

