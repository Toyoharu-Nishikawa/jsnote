//      program refsatP
//
//c  Link information
//c      refsatP.for (this file)
//c      physdisp.for
//c      refract.for
//c    * aux_3.for
//c    * IF97_1.for
//c    * IF97_2.for
//c    * IF97_3.for
//c    * IF97_Sat.for
//c    * IF97_B23.for
//
//c    This program calls IF97 subroutines in the files marked with *.
//
//c     P:      pressure in MPa
//c     T:      temperature in K
//c     lambda: wavelength in micron
//c     n: refractive index with respect to vacuum
//c     v:      specific volume in m^3/kg
//c     rho:    density in kg/m^3

import {PsatT,TsatP} from '../thermdyn/IF97_Sat.js'
import {Vsatl_3, Vsatg_3} from "../thermdyn/Aux_3.js"
import {region_3} from '../thermdyn/IF97_3.js'
import {region_1} from "../thermdyn/IF97_1.js"
import {region_2} from "../thermdyn/IF97_2.js"
import {refract} from "./refract.js"

export const refsatP = (P, lambda) => {
  const Tmin = 273.15
  const Pmin = PsatT(Tmin)

  if(P < Pmin){
    throw new RangeError('function refsatP P is lower than the minimum pressure in ressatP.js.')
  }
  if(P > 22.064){
    throw new RangeError('function refsatP P is lower than the maximum pressure in refsatP.js.')
  } 

  const T = TsatP(P)
  let state1
  let state2
  if(T <= 623.15){
    state1 = region_1(P, T)
    state2 = region_2(P, T)
  }
  else{
    const vl = Vsatl_3(T)
    const vg = Vsatg_3(T)
    state1 = region_3(vl, T)
    state2 = region_3(vg, T)
  }

  if (lambda < 0.2){ 
    throw new RangeError('function refracPT Wavelength is smaller than IAPWS endorsed limit in refracPT.js.')
  }
  if (lambda > 1.1){
    throw new RangeError('function refracPT Wavelength is lager than IAPWS endorsed limit in refracPT.js.')
  }

  const v1 = state1.v 
  const v2 = state2.v 

  const rho1 = 1 / v1
  const rho2 = 1 / v2

  const n1 = refract(T, rho1, lambda)
  const n2 = refract(T, rho2, lambda)

  const n = {
    l: n1,
    g: n2,
  }

  return n 
}
