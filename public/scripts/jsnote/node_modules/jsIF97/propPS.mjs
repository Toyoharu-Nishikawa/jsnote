/*******************************************************************/
/*  propPS.for
/*  (given P and S calculate properties of the regions 1, 2, 3, 5,
/*   and wet steam region)
/*******************************************************************/

import {region_1} from "./IF97_1.mjs"
import {region_2} from "./IF97_2.mjs"
import {region_3} from "./IF97_3.mjs"
import {TsatP} from './IF97_Sat.mjs'
import {ZPS_1} from "./Aux_1.mjs"
import {ZPS_2} from "./Aux_2.mjs"
import {Vsatl_3, Vsatg_3,ZPS_30, ZPS_31 ,ZPS_32} from "./Aux_3.mjs"
import {ZPS_5} from "./Aux_5.mjs"
import {RegPS} from "./Reg_ps.mjs"

"use strict"

export function propPS(SP){
  var SPl;
  var SPg;

  SPl = {};
  SPg = {};
  
  RegPS(SP);
  if(SP.M==1){
    SP.MM=1;
    ZPS_1(SP);
    SP.x=0.0;
  }
  else if(SP.M==2){
    SP.MM=2;
    ZPS_2(SP);
    if(SP.T>=647.096 && SP.P>=22.064){
          SP.x=-1;
    }
    else{
          SP.x=1;    
    }
  }
  else if(SP.M==30){
    SP.MM=3;
    ZPS_30(SP);
    SP.x=-1;//super critical region    
  }
  else if(SP.M==31){
    SP.MM=3;
    ZPS_31(SP);
    SP.x=0.0;    
  }
  else if(SP.M==32){
    SP.MM=3;
    ZPS_32(SP);
    SP.x=1.0;    
  }
  else if(SP.M==5){
    SP.MM=5;
    ZPS_5(SP);
    SP.x=1.0;    
  }
  else if(SP.M==12){
    SP.MM=4;
    SPl.P=SP.P;
    SPg.P=SP.P;
    TsatP(SPl);
    TsatP(SPg);
    region_1(SPl);
    region_2(SPg);
    SP.x=(SP.s-SPl.s)/(SPg.s-SPl.s);
    SP.g=SPg.g*SP.x+SPl.g*(1.0-SP.x);
    SP.u=SPg.u*SP.x+SPl.u*(1.0-SP.x);
    SP.v=SPg.v*SP.x+SPl.v*(1.0-SP.x);
    SP.h=SPg.h*SP.x+SPl.h*(1.0-SP.x);    
    SP.T=SPl.T;
  }
  else if(SP.M==33){
    SP.MM=4;
    SPl.P=SP.P;
    SPg.P=SP.P;
    TsatP(SPl);
    TsatP(SPg);
    Vsatl_3(SPl);
    Vsatg_3(SPg);
    region_3(SPl);
    region_3(SPg);
    SP.x=(SP.s-SPl.s)/(SPg.s-SPl.s);
    SP.g=SPg.g*SP.x+SPl.g*(1.0-SP.x);
    SP.u=SPg.u*SP.x+SPl.u*(1.0-SP.x);
    SP.v=SPg.v*SP.x+SPl.v*(1.0-SP.x);
    SP.h=SPg.h*SP.x+SPl.h*(1.0-SP.x);    
    SP.T=SPl.T;
  }
  else{
    console.log("Out of IF97 applicable range.");
    return -1;
  }
  
  return 1;
}
