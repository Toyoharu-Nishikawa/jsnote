/*******************************************************************/
/*  propPH.for
/*(given P and H calculate properties of the regions 1, 2, 3, 5, 
/* and wet steam region) 
/*******************************************************************/

import {region_1} from "./IF97_1.mjs"
import {region_2} from "./IF97_2.mjs"
import {region_3} from "./IF97_3.mjs"
import {TsatP} from './IF97_Sat.mjs'
import {ZPH_1} from "./Aux_1.mjs"
import {ZPH_2} from "./Aux_2.mjs"
import {Vsatl_3, Vsatg_3,ZPH_30, ZPH_31 ,ZPH_32} from "./Aux_3.mjs"
import {ZPH_5} from "./Aux_5.mjs"
import {RegPH} from "./Reg_ph.mjs"


"use strict"

export function propPH(SP){
  var SPl;
  var SPg;
  
  SPl = {};
  SPg = {};
  
  if(RegPH(SP)==-1){SP = null;return -1;}
  if(SP.M==1){
    SP.MM=1;
    if(ZPH_1(SP)==-1){SP = null;return -1;}
    SP.x=0.0;
  }
  else if(SP.M==2){
    SP.MM=2;
    if(ZPH_2(SP)==-1){SP = null;return -1;}
    if(SP.T>=647.096 && SP.P>=22.064){
          SP.x=-1;
    }
    else{
          SP.x=1;    
    }
  }
  else if(SP.M==30){
    SP.MM=3;
    if(ZPH_30(SP)==-1){SP = null;return -1;}
    SP.x=2;    
  }
  else if(SP.M==31){
    SP.MM=3;
    if(ZPH_31(SP)==-1){SP = null;return -1;}
    SP.x=0.0;    
  }
  else if(SP.M==32){
    SP.MM=3;
    if(ZPH_32(SP)==-1){SP = null;return -1;}
    SP.x=1.0;    
  }
  else if(SP.M==5){
    SP.MM=5;
    if(ZPH_5(SP)==-1){SP = null;return -1;}
    SP.x=1.0;    
  }
  else if(SP.M==12){
    SP.MM=4;
    SPl.P=SP.P;
    SPg.P=SP.P;
    if(TsatP(SPl)==-1){SP = null;return -1;}
    if(TsatP(SPg)==-1){SP = null;return -1;}
    if(region_1(SPl)==-1){SP = null;return -1;}
    if(region_2(SPg)==-1){SP = null;return -1;}
    SP.x=(SP.h-SPl.h)/(SPg.h-SPl.h);
    SP.g=SPg.g*SP.x+SPl.g*(1.0-SP.x);
    SP.u=SPg.u*SP.x+SPl.u*(1.0-SP.x);
    SP.v=SPg.v*SP.x+SPl.v*(1.0-SP.x);
    SP.s=SPg.s*SP.x+SPl.s*(1.0-SP.x);    
    SP.w=0.0;
    SP.T=SPl.T;
  }
  else if(SP.M==33){
    SP.MM=4;
    SPl.P=SP.P;
    SPg.P=SP.P;
    if(TsatP(SPl)==-1){SP = null;return -1;}
    if(TsatP(SPg)==-1){SP = null;return -1;}
    if(Vsatl_3(SPl)==-1){SP = null;return -1;}
    if(Vsatg_3(SPg)==-1){SP = null;return -1;}
    if(region_3(SPl)==-1){SP = null;return -1;}
    if(region_3(SPg)==-1){SP = null;return -1;}
    SP.x=(SP.h-SPl.h)/(SPg.h-SPl.h);
    SP.g=SPg.g*SP.x+SPl.g*(1.0-SP.x);
    SP.u=SPg.u*SP.x+SPl.u*(1.0-SP.x);
    SP.v=SPg.v*SP.x+SPl.v*(1.0-SP.x);
    SP.s=SPg.s*SP.x+SPl.s*(1.0-SP.x);    
    SP.w=0.0;
    SP.T=SPl.T;
  }
  else{
    console.log("Out of IF97 applicable range.");
    SP = null;
    return -1;
  }
  
  return 1;
}

