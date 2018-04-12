/*******************************************************************/
/* transPT.for                                                    */
/*  (given P and T calculate mu, nu, lambda, and Pr for all regions of
     IAPWS-IF97 except region 5) 
/*******************************************************************/

import {region_1} from "./IF97_1.mjs"
import {region_2} from "./IF97_2.mjs"
import {region_3} from "./IF97_3.mjs"
import {VPT_3} from "./Aux_3.mjs"
import {RegPT} from "./Reg_pt.mjs"
import {viscos, conduc} from "./transp.mjs"


"use strict"

export function transPT(SP){
  SP.NP=2;
  if(RegPT(SP)==-1){SP =null;return -1;}
  if(SP.M==1){
    if(region_1(SP)==-1){SP =null;return -1;}
  }
  else if(SP.M==2){
    if(region_2(SP)==-1){SP =null;return -1;}
  }
  else if(SP.M==3){
    if(VPT_3(SP)==-1){SP =null;return -1;}
    if(region_3(SP)==-1){SP =null;return -1;}
  }
  else if(SP.M==5){
    console.log("Region_5 is not applicable.\n");
    return -1;
  }
  else{
    console.log("Out of IF97 applicable range.\n");
    return -1;
  }
  if(viscos(SP)==-1){SP =null;return -1;}
  if(conduc(SP)==-1){SP =null;return -1;}
  SP.nu=SP.mu*SP.v;
  SP.Pr=SP.cp*SP.mu/SP.lambda*1.0e+3;
  
  return 1;
}
