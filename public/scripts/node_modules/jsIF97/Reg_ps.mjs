/*******************************************************************/
/*RegPS(P, S, M)
/*  (given P and S find the region)
/*******************************************************************/

//     M= 1: region 1
//        2: region 2
//       12: wet steam region below 350 degC
//        5: region 5
//       30: region 3 above critical pressure
//       31: region 3 liquid
//       32: region 3 vapor
//       33: wet steam region above 350 degC
//        0: out of IF97

import {region_1} from "./IF97_1.mjs"
import {region_2} from "./IF97_2.mjs"
import {region_3} from "./IF97_3.mjs"
import {region_5} from "./IF97_5.mjs"
import {PsatT,TsatP} from './IF97_Sat.mjs'
import {Tb23P} from "./IF97_B23.mjs"
import {Vsatg_3,Vsatl_3} from "./Aux_3.mjs"



"use strict"

export function RegPS(SP){
  /* input P: MPa, S: kJ/kgK */
  /* output M                */
  var S;
  var P;
  var P1;
  var Stest;
  var SP1;
  
  SP1 = {};
  
  S=SP.s;
  P=SP.P;
  
  /* Test of maximum pressure */
  if(SP.P > 100){
    SP.M=0;
    return 1;
  }
  /* Test below 10 MPa */  
  if(SP.P <= 10){
    SP1.T=2273.15;
    SP1.P=SP.P;
    if(region_5(SP1)==-1){SP = null;return -1;}
    Stest=SP1.s;
    if(S > Stest){
      SP.M=0;
      return 1;
    }
    SP1.T=1073.15;
    SP1.P=SP.P;
    if(region_2(SP1)==-1){SP = null;return -1;}
    Stest=SP1.s;
    if(S > Stest){
      SP.M=5;
      return 1;
    }
    SP1.P=SP.P;
    TsatP(SP1);
    if(region_2(SP1)==-1){SP = null;return -1;}
    Stest=SP1.s;
    if(S >= Stest){
      SP.M=2;
      return 1;
    }
    if(region_1(SP1)==-1){SP = null;return -1;}
    Stest=SP1.s;
    if(S >= Stest){
      SP.M=12;
      return 1;
    }    
    SP1.T=273.15;
    SP1.P=SP.P;
    if(region_1(SP1)==-1){SP = null;return -1;}
    Stest=SP1.s;
    if(S >= Stest){
      SP.M=1;
      return 1;
    }
    else{
      SP.M=0;
      return 1;
    }  
  }    
  /*Test below saturation pressure at 350 degC */
  SP1.T = 623.15;
  SP1.P = SP.P;
  if(PsatT(SP1)==-1){SP = null;return -1;}
  P1=SP1.P;
  if(P<=P1){
    SP1.T = 1073.15;
    SP1.P = SP.P;
    if(region_2(SP1)==-1){SP = null;return -1;}
    Stest=SP1.s;        
    if(S > Stest){
      SP.M=0;
      return 1;
    }
    SP1.P = SP.P;
    if(TsatP(SP1)==-1){SP = null;return -1;}
    SP1.P = SP.P;
    if(region_2(SP1)==-1){SP = null;return -1;}
    Stest=SP1.s;        
    if(S>=Stest){
      SP.M=2;
      return 1;
    }
    if(region_1(SP1)==-1){SP = null;return -1;}
    Stest=SP1.s;        
    if(S>Stest){
      SP.M=12;
      return 1;
    }
    SP1.T = 273.15;
    SP1.P = SP.P;
    if(region_1(SP1)==-1){SP = null;return -1;}
    Stest=SP1.s;        
    if(S >= Stest){
      SP.M=1;
      return 1;
    }
    else{
      SP.M=0;
      return 1;
    }
  }
  
  /*Test below critical pressure*/
  SP1.T = 647.096;
  if(PsatT(SP1)==-1){SP = null;return -1;}
  P1=SP1.P;
  if(P<=P1){
    SP1.T = 1073.15;
    SP1.P = SP.P;
    if(region_2(SP1)==-1){SP = null;return -1;}
    Stest=SP1.s;
    if(S>Stest){
      SP.M=0;
      return 1;
    }
    SP1.P = SP.P;
    if(Tb23P(SP1)==-1){SP = null;return -1;}
    if(region_2(SP1)==-1){SP = null;return -1;}
    Stest=SP1.s;
    if(S>=Stest){
      SP.M=2;
      return 1;
    }
    SP1.P = SP.P;
    if(TsatP(SP1)==-1){SP = null;return -1;}
    if(Vsatg_3(SP1)==-1){SP = null;return -1;}
    if(region_3(SP1)==-1){SP = null;return -1;}
    Stest=SP1.s;
    if(S>=Stest){
      SP.M=32;
      return 1;
    }
    if(Vsatl_3(SP1)==-1){SP = null;return -1;}
    if(region_3(SP1)==-1){SP = null;return -1;}
    Stest=SP1.s;
    if(S>=Stest){
      SP.M=33;
      return 1;
    }
    SP1.P = SP.P;
    SP1.T = 623.15;
    if(region_1(SP1)==-1){SP = null;return -1;}
    Stest=SP1.s;
    if(S>=Stest){
      SP.M=31;
      return 1;
    }
    SP1.P = SP.P;
    SP1.T = 273.15;
    if(region_1(SP1)==-1){SP = null;return -1;}
    Stest=SP1.s;
    if(S>=Stest){
      SP.M=1;
      return 1;
    }
    else{
      SP.M=0;
      return 1;  
    }
  }
  /* Test above critical pressure   */
  SP1.T = 1073.15;
  SP1.P = SP.P;
  if(region_2(SP1)==-1){SP = null;return -1;}
  Stest=SP1.s;
  if(S>Stest){
      SP.M=0;
      return 1;      
  }
  SP1.P = SP.P;
  if(Tb23P(SP1)==-1){SP = null;return -1;}
  if(region_2(SP1)==-1){SP = null;return -1;}
  Stest=SP1.s;
  if(S>=Stest){
      SP.M=2;
      return 1;      
  }
  SP1.T = 623.15;
  SP1.P = SP.P;
  if(region_1(SP1)==-1){SP = null;return -1;}
  Stest=SP1.s;
  if(S>Stest){
      SP.M=30;
      return 1;      
  }
  SP1.T = 273.15;
  SP1.P = SP.P;
  if(region_1(SP1)==-1){SP = null;return -1;}
  Stest=SP1.s;
  if(S>Stest){
      SP.M=1;
      return 1;      
  }
  else{
      SP.M=0;
      return 1;      
  }
}
