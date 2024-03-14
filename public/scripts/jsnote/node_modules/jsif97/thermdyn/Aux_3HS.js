import {region_3,Helm_3} from "./IF97_3.js" 
import {ZPS_30, ZPS_31, ZPS_32} from "./Aux_3.js" 
import {Back_3PHSa, Back_3PHSb} from "./Back_3HS.js" 

const Pc = 22.064 //MPa
const sc = 4.41202148223476 //kJ/kgK



const deri_3HS = (v, T) => {
//     input:  v:  specific volume in m^3/kg 
//             T:  temperature in K
//     output: derivatives of enthalpy and entropy
//             dhdt: (dh/dt)@p in kJ/kgK (=Cp)
//             dhdv: (dh/dv)@t in kJ/m^3
//             dsdt: (ds/dt)@p in kJ/kgK^2
//             dsdv: (ds/dv)@t in kJ/Km-3

  if(v<=0.0 || T<=0.0){
    throw new RangeError("function reginon_2, P<=0,T<=0 in IF97_2.js")
  }
 
  const R=0.461526;

  const rho = 1/v
  const dlt = rho/332
  const tau = 647.096/T
  
  const {F0, Fd , Fdd, Ft, Ftt, Fdt} = Helm_3(dlt, tau)
 
  const dhdv = -rho * R * T * dlt * (Fd + tau*Fdt + dlt*Fdd) 
  const dhdt = -R * tau**2 * Ftt + R*dlt * (Fd - tau*Fdt) 
  const dsdv = rho * R * dlt * (Fd - tau*Fdt)
  const dsdt = -R/T * tau**2 * Ftt 
  
  const deri = { 
    dhdv: dhdv,
    dhdt: dhdt,
    dsdv: dsdv,
    dsdt: dsdt,
  }
  
  return deri 
}

export const ZHS_3 = (h, s) => {
  const state = s < sc ? ZHS_3a(h, s): ZHS_3b(h, s)
  return state
} 

export const ZHS_3a = (h, s) => {
  const Pini = Back_3PHSa(h, s)
  const state = solve(h, s, Pini)
  return state
}  

export const ZHS_3b = (h, s) => {
  const Pini = Back_3PHSb(h, s)
  const state = solve(h, s, Pini)
  return state
} 

const solve = (h, s, Pini) => {
//     input:  h: enthalpy in kJ/kg
//             s: entropy in kJ/kgK
//             Pini: pressure in MPa
//     output  P: pressure in MPa
//             T: temperature in K
//             g: Gibbs free energy in kJ/kg
//             u: varernal energy in kJ/kg
//             v: specific volume in m^3/kg
//             cp: specific heat in kJ/kgK
//             w: speed of sound in m/s
//             x: dryness in fraction
//             nx: 1: dry region
//                 0: wet region
//             Nin: 0: calulation valid
//                  1: invalid, S is too high.
//                  2: invalid, S is too low.
//                  3: invalid, H is too high.
//                  4: invalid, H is too low.

  
  //dry region
  //first guess
  let P = Pini

  const state = P > Pc ? ZPS_30(P, s)  :
                s < sc ? ZPS_31(P, s) :
                ZPS_32(P, s) 

  let T = state.T
  let v = state.v
  let flag = 0

  for(let n=1;n<=20;n++){
    const state3 = region_3(v, T)
    const delh = state3.h - h
    const dels = state3.s - s
    flag = Math.abs(delh/h) <= 1.0E-8 
       &&  Math.abs(dels/s) <= 1.0E-8
    if(flag){
      state3.Nin = 0 
      return state3
    }
    const {dhdv, dhdt, dsdv, dsdt} = deri_3HS(v, T)
    
    const Dsum =dhdv * dsdt - dhdt * dsdv
    const delv = ( dsdt * delh - dhdt * dels) / Dsum
    const delt = (-delh * dsdv + dhdv * dels) / Dsum
    v -= delv
    T -= delt
  }
  if(flag==0){
    throw new RangeError("function ZHS_3, Flag in Aux_3HS.js")
  }
}
