import {getSample, insertSampleURL} from "../viewModel.js"

const elements = {
    sampleArea: document.getElementById("sampleArea"),
}

const initialize = () => {
  elements.sampleArea.onclick = execute
}

const execute = () => {
   e.stopPropagation()
}

export const show = () => {
  elements.sampleArea.className = "display"
  getSample()
}

export const hide = () => {
  elements.sampleArea.className = "not_display";
}



export const setSampleArea =  (list, PoP ,deleteFlag) => {
  const sampleArea = elements.sampleArea

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
    const article = document.createElement("article")
    const ul = Array.from(Array(3), ()=>
      document.createElement("ul")
    )
    value.list.forEach((value2,index2,array2)=>{
      const sample = document.createTextNode(value2)
      const li = document.createElement("li")
      li.appendChild(sample);
      li.onclick = insertSample(PoP, value.directory, value2)
      ul[index2%3].appendChild(li);
    });
    ul.forEach((value3,index3,array3)=>{
      article.appendChild(value3)
    })
    divSlide.appendChild(article)
    if(categoryNum<0)divWrapper.appendChild(divSlide)
  });
  if(deleteFlag){
    let divPagination = document.createElement("div")
    divPagination.className = "swiper-pagination"
    let divButtonPrev = document.createElement("div")
    divButtonPrev.className = "swiper-button-prev"
    let divButtonNext = document.createElement("div")
    divButtonNext.className = "swiper-button-next"
    divContainer.appendChild(divWrapper)
    divContainer.appendChild(divPagination)
    divContainer.appendChild(divButtonPrev)
    divContainer.appendChild(divButtonNext)
    sampleArea.innerHTML ="";
  }
  sampleArea.appendChild(divContainer)
  const swiper = new Swiper(".swiper-container",{
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
  })
}

const insertSample = (PoP, directory, code) => {
  return (e)=>{
    e.stopPropagation()
    insertSampleURL(PoP, directory, code)
  }
}

//   if(!this.clickCount){
//      ++this.clickCount
//      setTimeout(()=>this.clickCount=0, 350)
//    }
//    else {
//      view.elements.sample.click()
//      this.clickCount =0
//    }
//  }


