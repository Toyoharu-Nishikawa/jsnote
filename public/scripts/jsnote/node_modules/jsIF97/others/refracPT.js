//      program refracPT
//c  Link information
//c      refracPT.for (this file)
//c      physdisp.for
//c      refract.for
//c      reg_pt.for
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

import {RegPT} from "../thermdyn/Reg_pt.js"
import {region_3} from '../thermdyn/IF97_3.js'
import {region_1} from "../thermdyn/IF97_1.js"
import {region_2} from "../thermdyn/IF97_2.js"
import {VPT_3} from "../thermdyn/Aux_3.js"
import {refract} from "./refract.js"

export const refracPT = (P, T, lambda) => {
  const NP=2  
  if(P <=  0){
    throw new RrangeError("function ionPT P<=0 in ionPT.js")
  }
  const M = RegPT(P, T, NP)
 
  let state
  switch(M){
    case 1: { 
      state = region_1(P, T)
      break
    }
    case 2: {
      state = region_2(P, T)
      break
    }
    case 3 : { 
      const v = VPT_3(P, T)
      state = region_3(v, T)
      break
    }
    case 5: { 
      throw new RrangeError("function dielpt M=5 in ionPT.js")
      break
    }
    default : { 
      throw new RrangeError("function dielpt M in ionPT.js")
      break
    }
  }
  if (lambda < 0.2){ 
    throw new RangeError('function refracPT Wavelength is smaller than IAPWS endorsed limit in refracPT.js.')
  }
  if (lambda > 1.1){
    throw new RangeError('function refracPT Wavelength is lager than IAPWS endorsed limit in refracPT.js.')
  }

  const v = state.v
  const rho = 1 / v
  const n = refract(T,rho,lambda)

  return n
}
