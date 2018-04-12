/*******************************************************************/
/*  trasatT.for                                                    */
/*(given T calculates mu, nu, lambda, and Pr for saturated liquid 
/* and satureted vapor) 
/*******************************************************************/



import {region_1} from "./IF97_1.mjs"
import {region_2} from "./IF97_2.mjs"
import {region_3} from "./IF97_3.mjs"
import {PsatT} from './IF97_Sat.mjs'
import {Vsatl_3, Vsatg_3} from "./Aux_3.mjs"
import {viscos, conduc} from "./transp.mjs"

"use strict"

export function transatT(T, SPl, SPg){
  
  if(T<273.15){
    console.log("Temperature is lower than the minimum temperature.\n");
    return -1;    
  }
  if(T>647.096){
    console.log("Temperature is higher than the maximum temperature.\n");
    return -1;    
  }
  
  SPl.T=T;
  SPg.T=T;
  if(PsatT(SPl)==-1){SPl = null;SPg = null;return -1;}
  if(PsatT(SPg)==-1){SPl = null;SPg = null;return -1;}
  if(SPl.T<=623.15){
    if(region_1(SPl)==-1){SPl = null;SPg = null;return -1;}
    if(region_2(SPg)==-1){SPl = null;SPg = null;return -1;}
  }
  else{
    if(Vsatl_3(SPl)==-1){SPl = null;SPg = null;return -1;}
    if(Vsatg_3(SPg)==-1){SPl = null;SPg = null;return -1;}
    if(region_3(SPl)==-1){SPl = null;SPg = null;return -1;}
    if(region_3(SPg)==-1){SPl = null;SPg = null;return -1;}    
  } 
  if(viscos(SPl)==-1){SPl = null;SPg = null;return -1;}
  if(conduc(SPl)==-1){SPl = null;SPg = null;return -1;}
  SPl.nu=SPl.mu*SPl.v;
  SPl.Pr=SPl.cp*SPl.mu/SPl.lambda*1.0e+3;

  if(viscos(SPg)==-1){SPl = null;SPg = null;return -1;}
  if(conduc(SPg)==-1){SPl = null;SPg = null;return -1;}
  SPg.nu=SPg.mu*SPg.v;
  SPg.Pr=SPg.cp*SPg.mu/SPg.lambda*1.0e+3;
  
  return 1;
}
