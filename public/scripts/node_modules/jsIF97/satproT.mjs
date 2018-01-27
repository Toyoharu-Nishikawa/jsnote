/*******************************************************************/
/* satproT.for                                                     */
/*  (given T calculates properties of saturated liquid and vapor)
/*******************************************************************/

import {region_1} from "./IF97_1.mjs"
import {region_2} from "./IF97_2.mjs"
import {region_3} from "./IF97_3.mjs"
import {Vsatl_3, Vsatg_3} from "./Aux_3.mjs"
import {PsatT} from "./IF97_Sat.mjs"

"use strict"

export function satproT(T, SPl, SPg){
  /* input T: K  */
  var P;
  var SP1;
  
  SP1 = {};
  
  if(T<0){
    console.log("Temperature is lower than the minimum temperature(273.15K)");
    return -1;
  } 
  if(T>647.096){
    console.log("Temperature is higher than the maximam pressure(critical povar)");
    return -1;
  }
  SP1.T=T;
  if(PsatT(SP1)==-1){SPl = null;SPg = null;return -1;}
  P=SP1.P;
  if(T<=623.15){
    SPl.P=P;
    SPl.T=T;
    SPg.P=P;
    SPg.T=T;
    if(region_1(SPl)==-1){SPl = null;SPg = null;return -1;}
    if(region_2(SPg)==-1){SPl = null;SPg = null;return -1;}
  }
  else{
    if(Vsatl_3(SP1)==-1){SPl = null;SPg = null;return -1;}
    SPl.v=SP1.Vl;
    SPl.T=T;
    if(Vsatg_3(SP1)==-1){SPl = null;SPg = null;return -1;}
    SPg.v=SP1.Vg;
    SPg.T=T;
    if(region_3(SPl)==-1){SPl = null;SPg = null;return -1;}
    if(region_3(SPg)==-1){SPl = null;SPg = null;return -1;}
  }
  
  return 1;
}

    
