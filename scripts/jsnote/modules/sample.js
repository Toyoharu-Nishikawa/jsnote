import {view} from "../view.js"
import {getCode} from "./getCode.js"
import {parseParam,addParamToHash, removeParamFromHash} from "./hash.js"

export const   sample ={
  sampleList: null,
  clickCount: 0,
  execute: function(){
    if(view.sampleFlag){
      this.hide();
      this.removeEvent();
    }
    else {
      this.show();
      this.addEvent();
      this.getSample();
    }
  },//end of execute
  show: function(){
    view.elements.sample.className = "ongoing";
    view.sampleFlag = true;
    view.elements.sampleArea.className = "display";
  },
  hide: function(){
    view.elements.sample.className = "";
    view.sampleFlag = false;
    view.elements.sampleArea.className = "not_display";
  },
  mainScreenClick: function(e){
    e.stopPropagation();
    view.elements.sample.click();
  },
  addEvent: function(){
    view.elements.main.addEventListener("click",this.mainScreenClick,false);
  },
  removeEvent: function(){
    view.elements.main.removeEventListener("click",this.mainScreenClick,false);
  },
  getSample: function(){
    let req = new XMLHttpRequest();
    req.open("GET","sample/public/list.json",true);
    req.onload = (e)=>{
      this.setSampleArea(req.response, "public", true);
      req.open("GET","sample/private/sample.json", true);
      req.onload = (e)=>{
        switch(req.status){
          case 200:
            this.setSampleArea(req.response, "private", false);
            break;
          default:
            console.log("Your private sample is not yet registered. Register your sample code by pushing the bution of register")
            break;
        }     
      };
      req.onerror = (e)=>{
        console.log("http request error")
      };
      req.send();
    };
    req.setRequestHeader("content-type","application/text");
    req.responseType ="text";
    req.send();
  },
  setSampleArea: function(json, PoP ,deleteFlag){
    let list = JSON.parse(json)
    const sampleArea = view.elements.sampleArea;

    let divContainer = null;
    let divWrapper = null;
    if(deleteFlag){
      divContainer = document.createElement("div");
      divContainer.className = "swiper-container";
      divContainer.id = "sampleAreaSwiperContainer";
      divWrapper = document.createElement("div");
      divWrapper.className = "swiper-wrapper";
      divWrapper.id = "sampleAreaSwiperWrapper";
    }
    else{
      divContainer = document.getElementById("sampleAreaSwiperContainer");
      divWrapper = document.getElementById("sampleAreaSwiperWrapper");
    }
    list.forEach((value,index,array)=>{
      const categoryElem = [...divWrapper.childNodes];
      const categoryNum = categoryElem.length>0 ?
         categoryElem.map(k=>k.querySelector("h2").textContent).indexOf(value.directory):
         -1; 
      let  divSlide = null;
      if(categoryNum >-1){
          divSlide = categoryElem[categoryNum];
      }
      else{
        divSlide = document.createElement("div");
        divSlide.className = "swiper-slide";
        let h2 = document.createElement("h2");
        let title = document.createTextNode(value.directory);
        h2.appendChild(title);
        divSlide.appendChild(h2);
      }
      let article = document.createElement("article")
      let ul = Array.from(Array(3), ()=>
        document.createElement("ul")
      );
      value.list.forEach((value2,index2,array2)=>{
        let sample = document.createTextNode(value2);
        let li = document.createElement("li");
        li.appendChild(sample);
        li.onclick = this.insertSample(PoP, value.directory, value2);
        ul[index2%3].appendChild(li);
      });
      ul.forEach((value3,index3,array3)=>{
        article.appendChild(value3);
      })
      divSlide.appendChild(article);
      if(categoryNum<0)divWrapper.appendChild(divSlide);
    });
    if(deleteFlag){
      let divPagination = document.createElement("div");
      divPagination.className = "swiper-pagination";
      let divButtonPrev = document.createElement("div");
      divButtonPrev.className = "swiper-button-prev";
      let divButtonNext = document.createElement("div");
      divButtonNext.className = "swiper-button-next";
      divContainer.appendChild(divWrapper);
      divContainer.appendChild(divPagination);
      divContainer.appendChild(divButtonPrev);
      divContainer.appendChild(divButtonNext);
      sampleArea.innerHTML ="";
    }
    sampleArea.appendChild(divContainer);
    let swiper = new Swiper(".swiper-container",{
      slidesPerView: 1,
      spaceBetween: 30,
      loop:false, 
      observer: true,
      pagination: {
        el:'.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  },//end of setSample
  insertSample: function(PoP, directory, code){
    return (e)=>{
      e.stopPropagation();
      let req = new XMLHttpRequest();
      let url = "sample/" + PoP + "/" + directory + "/" +code;
      window.onpopstate = getCode
      addParamToHash("sample",url)
     if(!this.clickCount){
        ++this.clickCount
        setTimeout(()=>this.clickCount=0, 350)
      }
      else {
        view.elements.sample.click()
        this.clickCount =0
      }
    }
  },//end of insertSample
}
