/*******************************************************************/
/*  propHS.for
/*  (given P and S calculate properties of the regions 1, 2, 3, 5,
/*   and wet steam region) 
/*******************************************************************/

import {ZHS_1} from "./Aux_1HS.js"
import {ZHS_2a, ZHS_2b, ZHS_2c} from "./Aux_2HS.js"
import {ZHS_3a, ZHS_3b} from "./Aux_3HS.js"
import {ZHS_4} from "./Aux_4HS.js"
import {RegHS} from "./Reg_hs.js"

"use strict"

export const  propHS = (h, s) => {

  const M = RegHS(h, s) 

  switch(M){
    case 1:{
      const state = ZHS_1(h, s)
      return state
    } 
    case 21:{
      const state = ZHS_2a(h,s)
      return state
    } 
    case 22:{
      const state = ZHS_2b(h,s)
      return state
    } 
    case 23:{
      const state = ZHS_2c(h,s)
      return state
    } 
    case 31:{
      const state = ZHS_3a(h,s)
      return state
    } 
    case 32:{
      const state = ZHS_3b(h,s)
      return state
    } 
    case 4:{
      const state = ZHS_4(h,s)
      return state
    } 
    case 0:{
      const message = "function propHS enthalpy and entropy is out of range" + ` h is ${h}, s is ${s}`
      throw new RangeError(message);
    }
  }
}

    
