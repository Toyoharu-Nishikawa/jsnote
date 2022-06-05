/************************************************************************/
/*Aux_4HS.for (Regions 4  wet region )                                  */
/*  ZHS_4(H,S)                                                          */
/*    (given H and S calculate properties in the region                 */
/*    (Bisection method)                                                */
/************************************************************************/   

import {region_1,Gibbs_1} from "./IF97_1.js" 
import {region_2,Gibbs_2} from "./IF97_2.js" 
import {PsatT,TsatP} from './IF97_Sat.js'
import {propPS} from './propPS.js'
import {ZsatS} from "./satproS.js"
import {satproT} from "./satproT.js"
import {Back_4THS} from "./Back_4HS.js"

"use strict"

export const ZHS_4 = (h, s) => {
//     input:  h: enthalpy in kJ/kg
//             s: entropy in kJ/kgK
//     output  P: pressure in MPa
//             T: temperature in K
//             g: Gibbs free energy in kJ/kg
//             u: varernal energy in kJ/kg
//             v: specific volume in m^3/kg
//             cp: specific heat in kJ/kgK
//             w: speed of sound in m/s
//             x: dryness in fra//tion
//             nx: 1: dry region
//                 0: wet region
//             Nin: 0: calulation valid
//                  1: invalid, S is too high.
//                  2: invalid, S is too low.
//                  3: invalid, H is too high.
//                  4: invalid, H is too low.


   //wet region

  const smin = 5.210887825 // [kJ/kgK]  = s''(623.15 K) is  vapor side saturated line 
  const ttrip = 273.16 // [K] triple povar temperature

  let d1 
  let d2
 
  if(s>smin){
    const Tini =Back_4THS(h,s)     
    d1 = Tini + 2e-3
    d2 = Tini - 2e-3
  }
  else{
    const state = ZsatS(s)     
    const tsat = state.T 
    d1 = tsat 
    d2 = ttrip
  }

  let dm
  let x
  let state1
  let state2

  for(let n=1;n<=30;n++){
    dm = (d1 + d2) * 0.5
    const state = satproT(dm) 

    state1 = state.l 
    state2 = state.g 

    x = (s-state1.s) / (state2.s - state1.s)
    const htmp = state2.h * x + state1.h * (1.0 - x)
    const error = Math.abs((htmp-h)/h)
    const flag = error < 1e-10
    if(flag){
        break
    }

    if(htmp >= h ){
     d1=dm
    }
    else{
      d2=dm
    }
  }

  const P = state2.P
  const T = dm
  const nx = 0          
  const Nin = 0
  const g = state2.g * x + state1.g * (1.0-x)   
  const u = state2.u * x + state1.u * (1.0-x)   
  const v = state2.v * x + state1.v * (1.0-x)  
  const cp = -1 

  const del = 1e-6
  const Ptmp = P + del
  const stateTmp = propPS(Ptmp, s)

  const kappa = -Math.log(Ptmp / P) / Math.log(stateTmp.v / v);
  const w = Math.sqrt(kappa * v * P * 1.0e+6)


  const state = {
    g: g,
    u: u,
    v: v,
    P: P,
    T: T,
    h: h,
    s: s,
    cp: cp,
    w: w,
    x: x,
    nx: nx,
    Nin: Nin,
    MM: 4,
  }

  return state

}

