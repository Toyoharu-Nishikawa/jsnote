/*******************************************************************/
/*  propPT.for
/*  (given P and T calculate properties of the regions 1, 2, 3, and 5) 
/*******************************************************************/

import {region_1} from "./IF97_1.mjs"
import {region_2} from "./IF97_2.mjs"
import {region_3} from "./IF97_3.mjs"
import {region_5} from "./IF97_5.mjs"
import {VPT_3} from "./Aux_3.mjs"
import {RegPT} from "./Reg_pt.mjs"

"use strict"

export function propPT(SP){
  SP.NP=2;
  if(RegPT(SP)==-1){
    SP = null;return -1;
  }
  if(SP.M==1){
    SP.MM = 1;
    if(region_1(SP)==-1){SP = null;return -1;}
  }
  else if(SP.M==2){
    SP.MM = 2;
    if(region_2(SP)==-1){SP = null;return -1;}
  }
  else if(SP.M==3){
    SP.MM = 3;
    if(VPT_3(SP)==-1){SP = null;return -1;}
    if(region_3(SP)==-1){SP = null;return -1;}
  }
  else if(SP.M==5){
    SP.MM = 5;
    if(region_5(SP)==-1){SP = null;return -1;}
  }
  else{
    console.log("Out of IF97 applicable range.");
    return -1;
  }
  
  return 1;
}

    
