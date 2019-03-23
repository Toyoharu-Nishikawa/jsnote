export const  changeSizeOfBox = elem => {
  let self = this
  let drag = {
    element: elem,
    flag: false,
    originalX: null,
    originalWidth: null,
    setElement: function(element){
      this.element = element;
    },
    add:function(){
      //console.log("add drag")
      this.element.addEventListener('mousedown',this.mouseDown,false);
      this.element.addEventListener('mouseup',this.mouseUp,false);
    },
    remove: function(){
      //console.log("remove drag")
      this.element.removeEventListener('mousedown',this.mouseDown,false);
      this.element.removeEventListener('mousemove',this.mouseMove,false);
      this.element.removeEventListener('mouseup',this.mouseUp,false);
    },
    mouseDown: function(e){
      //console.log("mousedown");
      let me = drag; 
      me.flag = true;
      me.originalX =  e.clientX;
      me.originalWidth =  self.drawBoxWidth;
      me.element.addEventListener('mousemove',me.mouseMove,false);
    },
    mouseUp: function(e){
      //console.log("mouseup");
      let me = drag; 
      me.originalWidth =  null;
      me.flag = false;
      me.remove(me.element);
    },
    mouseMove: function(e){
      //console.log("mousemove")
      let me = drag; 
      let currentX =  e.clientX;
      self.drawBoxWidth = me.originalX - currentX + me.originalWidth;
      self.elements.drawArea.style.width = self.drawBoxWidth + "px";
      self.elements.draw.style.width = self.drawBoxWidth + "px";
    }
  };
  let online = {
    flag: false,
    element:null,
    setElement:function(element){
      this.element = element;
    },
    add: function(){
      this.element.addEventListener('mouseenter',this.mouseEnter,false);
      this.element.addEventListener('mouseleave',this.mouseLeave,false);
    },
    remove: function(){
      this.element.removeEventListener('mouseenter',this.mouseEnter,false);
      this.element.removeEventListener('mouseleave',this.mouseLeave,false);
      this.element.removeEventListener('mousemove',this.mouseMove,false);
    },
    mouseEnter: function(){
      //console.log("mouse enter")
      let me = online;
      me.element.addEventListener('mousemove',me.mouseMove,false);
    },
    mouseLeave: function(e){
      //console.log("mouse leave")
      let me = online;
      me.flag = false;
      e.currentTarget.style.cursor = "default";
      me.element.removeEventListener('mousemove',me.mouseMove,false);
      if(!drag.flag){drag.remove();} 
    },
    mouseMove: function(e){
      let me = online;
      let originX = e.offsetX;
      if(originX<10){
        if(!me.flag){
          me.flag = true;
          e.currentTarget.style.cursor = "w-resize";
          if(!drag.flag){drag.add();} 
        }
      }
      else{
        if(me.flag) {
          me.flag = false;
          e.currentTarget.style.cursor = "default";
          if(!drag.flag){drag.remove();} 
        }
      }
    },
  };
  drag.setElement(document.body)
  online.setElement(elem);
  online.add();
}

