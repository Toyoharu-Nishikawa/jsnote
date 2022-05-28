//      program ionPT
//c  Link information
//c      ionPT.for (this file)
//c      physdisp.for
//c      ionpro.for
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
//c     ion :   logarithm, in unit of 10, of ion product Kw/(mol kg^-1)^2
//c     pH :    pH = -(1/2)log10(Kw)
//c     v:      specific volume in m^3/kg
//c     rho:    density in kg/m^3

import {RegPT} from "../thermdyn/Reg_pt.js"
import {region_3} from '../thermdyn/IF97_3.js'
import {region_1} from "../thermdyn/IF97_1.js"
import {region_2} from "../thermdyn/IF97_2.js"
import {VPT_3} from "../thermdyn/Aux_3.js"
import {ionpro} from "./ionpro.js"


export const ionPT = (P, T) => {
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

  const rho = 1 / state.v
  const ion =  ionpro(T, rho)
  const pH = -0.5 * ion

  return pH
}
