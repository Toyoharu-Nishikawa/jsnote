
import {region_1,Gibbs_1} from "./IF97_1.js" 
import {ZPH_1} from "./Aux_1.js" 
import {Back_1PHS} from "./Back_1HS.js" 

const deri_1HS = (P, T) => {
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

  const pai = P/16.53
  const tau = 1386.0/T
  
  const {G0,Gp,Gpp,Gt,Gtt,Gpt}= Gibbs_1(pai, tau)

 
  const dhdt = -R * tau * tau * Gtt
  const dhdp = R * 1386.0/16.53 * Gpt
  const dsdt = -R * tau * tau * Gtt / T
  const dsdp = R/16.53 * (tau * Gpt - Gp)
  
  const deri = { 
    dhdt: dhdt,
    dhdp: dhdp,
    dsdt: dsdt,
    dsdp: dsdp,
  }
  
  return deri 
}


export const ZHS_1 = (h, s) => {
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

  
  //dry region
  //first guess
  let P = Back_1PHS(h, s) 
  const state = ZPH_1(P, h) 
  let T = state.T

  let flag = 0

  for(let n=1;n<=20;n++){
    const state3 = region_1(P, T)
    const delh = state3.h - h
    const dels = state3.s - s
    flag = Math.abs(delh/h) <= 1.0E-8 
       &&  Math.abs(dels/s) <= 1.0E-8
    if(flag){
      state3.x = 1
      state3.nx = 1 
      state3.Nin = 0 
      state3.MM =1 
      return state3
    }
    const {dhdp, dsdt, dhdt, dsdp} = deri_1HS(P, T)
    
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
