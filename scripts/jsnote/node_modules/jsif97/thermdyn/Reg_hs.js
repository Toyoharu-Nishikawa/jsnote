/*******************************************************************/
/*RegHS(H, S, M)
/*  (given H and S find the region)
/*******************************************************************/

//     M= 1: region 1
//       21: region 2a 
//       22: region 2b 
//       23: region 2c 
//       31: region 3a below critical specific entropy 4.41202148223476 kJ/kgK 
//       32: region 3b below critical specific entropy 4.41202148223476 kJ/kgK
//        4: region 4 wet region 
//        0: out of IF97

import {satproT} from "./satproT.js" 
import {ZPS_1} from "./Aux_1.js" 
import {ZPS_2} from "./Aux_2.js" 
import {ZPS_30} from "./Aux_3.js" 
import {HS800C} from "./boundary/BTmax_HS.js" 
import {satS2H_1, satS2H_3a, satS2H_2ab,satS2H_2c3b} from "./boundary/Bsat_HS.js" 
import {HB13} from "./boundary/B13_HS.js" 
import {TB23} from "./boundary/B23_HS.js" 
import {Pb23T} from "./IF97_B23.js" 
import {Back_2PHSc} from "./Back_2HS.js" 

const minState = satproT(273.15)
const lmin = minState.l
const gmin = minState.g
const slmin = lmin.s
const sgmin = gmin.s
const hlmin = lmin.h
const hgmin = gmin.h

const Hmin = s => { 
  const x = (s-slmin)/(sgmin-slmin)
  const h = (1-x)*hlmin  + x*hgmin
  return h
}

const Hmin2 = s => { 
  const P = 0.000611
  const state = ZPS_2(P, s)
  const h = state.h
  return h
}


const Hmax = (s, MM) => {
  const P = 100
  const state = MM==1? ZPS_1(P, s):
                MM==2? ZPS_2(P, s):
                ZPS_30(P, s)
  const h = state.h
  return h
}

const Hmax2 = (s) => {
  const h = HS800C(s)
  return h
}



export const RegHS = ( h, s) => {
  /* input S: kJ/kg, H: kJ/kg */
  /* output M               */
  
  /* Test of maximum pressure */
  if(s < 0 ){
    const M = 0
    return M
  }
  else if(s<3.397782955){ //s1(100MPa, 623.15K)
    // 1 or 4 
    const hmin = Hmin(s)  
    const hsat = satS2H_1(s) 
    const hmax = Hmax(s, 1)  
    const M = h < hmin ? 0 :
             h < hsat ? 4 :
             h <= hmax ? 1 :
             0
    return M
  }
  else if(s<3.77828281340){ //s'(623.15K)
   //1 or 3a or 4
    const hmin = Hmin(s)  
    const hsat = satS2H_1(s) 
    const hb13 = HB13(s) 
    const hmax = Hmax(s, 3)  
    const M = h < hmin ? 0 :
              h < hsat ? 4 :
              h < hb13 ? 1 :
              h <= hmax ? 31 :
              0
    return M
  }
  else if(s<4.41202148223476){ //sc
    //3a or 4
    const hmin = Hmin(s)  
    const hsat =  satS2H_3a(s)
    const hmax = Hmax(s, 3)  
    const M = h < hmin ? 0 :
              h < hsat ? 4 :
              h <= hmax ? 31 :
              0
    return M

  }

  else if(s<5.048096828){ //sB23min
   //3b or4
    const hmin = Hmin(s)  
    const hsat = satS2H_2c3b(s)
    const hmax = Hmax(s, 3)  
    const M = h < hmin ? 0 :
              h < hsat ? 4 :
              h <= hmax ? 32 :
              0
    return M

  }
  else if(s<5.260578707){ //sB23max
   //3b or 2c or4
    const hmin = Hmin(s)  
    const hsat = satS2H_2c3b(s) 
    const hmax2c = Hmax(s, 2)  
    const hmax3b = Hmax(s, 3)  
    
    if(h<hmin ){
      const M = 0
      return M
    }
    else if(s < 5.097923719535122 &&  h>hmax3b){
      const M =0
      return M
    }
    else if(s > 5.097923719535122 &&  h>hmax2c){
      const M =0
      return M
    }
    else if(h<hsat){
      const M = 4
      return M
    }
    else if(h<2563.6){
      const M = 32
      return 32
      
    }
    else if(h>2812.9){
      const M = 23
      return M
    }
    else{
      const T = TB23(h, s)
      const P = Pb23T(T) 
      const P2c =  Back_2PHSc(h, s)  
      const M = P >= P2c ? 23 : 32
      return M
    }
  }
  else if(s<5.85){ //s2bcmin
   //2c or 4
    const hmin = Hmin(s)  
    const hsat = satS2H_2c3b(s) 
    const hmax = Hmax(s, 2)  
    const M = h < hmin ? 0 :
              h < hsat ? 4 :
              h <= hmax ?23 :
              0
    return M


  }
  else if(s<6.040483671712381){ //
   //2b or 4
    const hmin = Hmin(s)  
    const hsat =  satS2H_2ab(s)
    const hmax = Hmax(s,2)  
    const M = h < hmin ? 0 :
              h < hsat ? 4 :
              h <= hmax ?22 :
              0
    return M
  }
  else if(s<6.069709159519124){ //s2bcmin
   //2b or 4
    const hmin = Hmin(s)  
    const hsat = satS2H_2ab(s) 
    const hmax = Hmax2(s)  
    const M = h < hmin ? 0 :
              h < hsat ? 4 :
              h <= hmax ?22 :
              0
    return M
  }
  else if(s<7.852340399878508){ 
   //2b or 2a or 4
    const hmin = Hmin(s)  
    const hsat = satS2H_2ab(s) 
    const h2ab = ZPS_2(4, s).h 
    const hmax = Hmax2(s)  
    const M = h < hmin ? 0 :
              h < hsat ? 4 :
              h < h2ab ?21 :
              h <= hmax ?22 :
              0
    return M

  }
  else if(s<9.155759395){ //s''(273.15K)
   //2a or 4
    const hmin = Hmin(s)  
    const hsat = satS2H_2ab(s) 
    const hmax = Hmax2(s)  
    const M = h < hmin ? 0 :
              h < hsat ? 4 :
              h <= hmax ?21 :
              0
    return M
  }
  else if(s<11.92){  //s''(1073.15K)
   //2a
    const hmin = Hmin2(s)  
    const hmax = Hmax2(s)  
    const M = h < hmin ? 0 :
              h <= hmax ?21 :
              0
   return M
  }
  else{
    const M = 0
    return M
  }
}



