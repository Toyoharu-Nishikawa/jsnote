/*******************************************************************/
/* satproP.for                                                     */
/*  (given P calculates properties of saturated liquid and vapor)
/*******************************************************************/

import {region_1} from "./IF97_1.mjs"
import {region_2} from "./IF97_2.mjs"
import {region_3} from "./IF97_3.mjs"
import {Vsatl_3, Vsatg_3} from "./Aux_3.mjs"
import {TsatP, PsatT} from "./IF97_Sat.mjs"

"use strict"

export function satproP(P, SPl, SPg){
  /* input P: MPa  */
  var Pmin;
  var T;
  var SP1;
  
  SP1 = {};
  
  SP1.T=273.15; 
  if(PsatT(SP1)==-1){SPl = null;SPg = null;return -1;}
  Pmin=SP1.P;
  if(P<=0){
    console.log("Pressure is lower than zero");
    return -1;
  }
  if(P<Pmin){
    console.log("Pressure is lower than the minimum pressure");
    return -1;
  }
  if(P>22.064){
    console.log("Pressure is higher than the maximam pressure(critical povar)");
    return -1;
  }
  SP1.P=P;
  if(TsatP(SP1)==-1){SPl = null;SPg = null;return -1;}   
  T=SP1.T;       
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

    
