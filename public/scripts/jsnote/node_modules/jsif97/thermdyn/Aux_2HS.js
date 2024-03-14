/************************************************************************/
/*Aux_2HS.for (Regions 2 and wet but s>=5.85kJ/kgK)                     */
/*  deri_2HS(P,T,dhdt,dhdp,dsdt,dsdp)                                   */
/*    (given P and T calculate derivatives of h and s)                  */
/*  ZsatS(S,p,t,h)                                                      */
/*    (given S calculates p, t, and h for saturated vapor)              */
/*  ZmaxS(S,p,t,h)                                                      */
/*    (given S calculates p, t, and h along the isotherm 800 degC       */
/*     or isobar 100 MPa, i.e. limit of IF97)                           */
/*  ZHS_2(H,S,p,t,g,u,v,Cp,w,x,nx,Nin)                                  */
/*    (given H and S calculate properties in the region                 */
/*     s>=5.85kJ/kgK and p>=0.001MPa)                                   */
/*    (two dimensional Newton method)                                   */
/************************************************************************/   

"use strict"

import {region_1,Gibbs_1} from "./IF97_1.js" 
import {region_2,Gibbs_2} from "./IF97_2.js" 
import {PsatT,TsatP} from './IF97_Sat.js'
import {ZPH_2,ZPS_2} from './Aux_2.js'
import {ZsatS} from "./satproS.js"
import {Back_2PHSa, Back_2PHSb, Back_2PHSc} from "./Back_2HS.js"

// Auxiliary subroutines for propHS
// The subroutines are applicable in the regions 2a and 2b.
const deri_2HS = (P, T) => {
//     input:  P:  pressure in MPa
//             T:  temperature in K
//     output: derivatives of enthalpy and entropy
//             dhdt: (dh/dt)@p in kJ/kgK (=Cp)
//             dhdp: (dh/dp)@t in kJ/kgMPa
//             dsdt: (ds/dt)@p in kJ/kgK^2
//             dsdp: (ds/dp)@t in kJ/kgMPaK

  if(P<=0.0 || T<=0.0){
    throw new RangeError("function reginon_2, P<=0,T<=0 in IF97_2.js")
  }
 
  const R=0.461526;

  const pai = P
  const tau = 540.0/T
  
  const {G0,Gp,Gpp,Gt,Gtt,Gpt}= Gibbs_2(pai, tau)

 
  const dhdt = -R * tau * tau * Gtt
  const dhdp = R * 540.0 * Gpt
  const dsdt = -R * tau * tau * Gtt / T
  const dsdp = R * (tau * Gpt - Gp)
  
  const deri = { 
    dhdt: dhdt,
    dhdp: dhdp,
    dsdt: dsdt,
    dsdp: dsdp,
  }
  
  return deri 
}


const ZmaxS = (s) => {
//     input:  S: entropy in kJ/kgK
//     output: properties on the isotherm 800 degC or isobar 100 MPa
//             p: pressure in MPa
//             t: temperature in K
//             h: enthalpy in kJ/kg  
  
  const s100 = 6.04048367171238; //entropy at 100 MPa, 800 degC
  
  const aa =   0.028346255
  const bb =  -0.78039904 
  const cc =   4.942691911
  const dd =  -3.00901258 
  const ee =  24.36133988 
  const ff =  -8.629021804
  const gg = 235.9643342  

  const {P, T} = s >= s100 ? Object({
    P : Math.exp(((s * aa + bb) * s + cc) * s + dd), // approximation of isotherm 800 degC
    T : 1073.15,
  }) :
  Object({
    P : 100.0,
    T : (s * ee + ff) * s + gg ,            // approximation of isobar 100 MPa
  })
  const state = region_2(P, T)
  
  return state 
}


export const ZHS_2a  = (h, s) => {
  const Pini = Back_2PHSa(h, s)
  const state = solve(h, s, Pini)
  return state
}

export const ZHS_2b  = (h, s) => {
  const Pini = Back_2PHSb(h, s)
  const state = solve(h, s, Pini)
  return state
}

export const ZHS_2c  = (h, s) => {
  const Pini = Back_2PHSc(h, s)
  const state = solve(h, s, Pini)
  return state
}

export const ZHS_2_ = (h, s) => {
  const smax  = 9.1555; // s" at triple povar
  const ttrip = 273.16; // triple povar temperature
  const smin  = 0//5.85;   // S, lower limit of region 2b
  const pmin  = 0.001;  // pressure, lower limit
  
  if(s > smax){
    return {Nin: 1} 
  }
  if(s < smin){
    return {Nin: 2} 
  }
  const stateMax = ZmaxS(s)
  const pmax=stateMax.P
  const tmax=stateMax.T
  const hmax=stateMax.h
  
  if(h > hmax*1.05){
    return {Nin: 3}
  }
  
  const Tmin = TsatP(pmin)
  const state1 = region_1(pmin, Tmin)
  const state2 = region_2(pmin, Tmin)
  
  let x = (s - state1.s) / (state2.s - state1.s);
  const hmin = state2.h * x + state1.h * (1.0 - x)

  if(h < hmin){
    return {Nin: 4}
  }

  const stateSat = ZsatS(s)
  const psat = stateSat.P
  const tsat = stateSat.T
  const hsat = stateSat.h

  //dry region
  //first guess
  const rdeps = (h - hsat) / (hmax - hsat)
  //let T = rdeps * (tmax - tsat) + tsat
  const pmaxl = Math.log(pmax)
  const psatl = Math.log(psat)
  const Pini = Math.exp(rdeps * (pmaxl - psatl) + psatl)
    
  const state = solve(h, s, Pini)
  return state
}


export const solve = (h, s, Pini) => {
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

  let P = Pini
  const state = ZPH_2(P, h) 
  let T = state.T

  
  let flag = 0
  for(let n=1;n<=20;n++){
    const state3 = region_2(P, T)
    const delh = state3.h - h
    const dels = state3.s - s
    flag = Math.abs(delh/h) <= 1.0E-8 
       &&  Math.abs(dels/s) <= 1.0E-8
    if(flag){
      state3.x = 1
      state3.nx = 1 
      state3.Nin = 0 
      state3.MM = 2
      return state3
    }
    const {dhdp, dsdt, dhdt, dsdp} = deri_2HS(P, T)
    
    const Dsum =dhdp * dsdt - dhdt * dsdp
    const delp = (delh * dsdt - dhdt * dels) / Dsum
    const delt = (dhdp * dels - delh * dsdp) / Dsum
    P -= delp
    T -= delt
  }
  if(flag==0){
    throw new RangeError("function ZHS_2, Flag in Aux_2HS.js")
  }
}
