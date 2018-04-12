/*******************************************************************/
/* RegPT(P, T, M, NP)
/*  (given P and T find the region)
/*******************************************************************/

import {TsatP,PsatT} from "./IF97_Sat.mjs"
import {Tb23P} from "./IF97_B23.mjs"

//     M=1: region 1
//       2: region 2
//       3: region 3
//       5: region 5
//       0: out of IF97

export function RegPT(SP){
  /* input P: MPa, H: kJ/kg */
  /* output M               */
  var T;
  var P;
  var P1;
  var Ttest;
  var SP1;
  
  SP1 = {};
  
  T=SP.T;
  P=SP.P;
  
  /* Test of maximum pressure */
  if(P > 100){
    SP.M=0;
    return 1;
  }
  /* Test below 10 MPa */  
  if(SP.P <= 10){
    if(T>2273.15){
      SP.M=0;
      return 1;
    }
    if(T>1073.15){
      SP.M=5;
      return 1;
    }
    SP1.P=SP.P;
    if(TsatP(SP1)==-1){
      SP = null;return -1;
    }
    Ttest=SP1.T;
    if(SP.NP !=1){
      if(T>=Ttest){
        SP.M=2;
        return 1;
      }
    }
    else{
      if(T>Ttest){
        SP.M=2;
        return 1;
      }
    }
    if(T>=273.15){
      SP.M=1;
      return 1;
    }
    else{
      SP.M=0;
      return 1;
    }
  }
  /*Test below saturation pressure at 350 degC*/
  SP1.T=623.15;
  if(PsatT(SP1)==-1){SP = null;return -1;}
  P1=SP1.P;
  if(P<=P1){
    if(T>1073.15){
      SP.M=0;
      return 1;
    }
    SP1.P=P;
    if(TsatP(SP1)==-1){SP = null;return -1;}
    Ttest=SP1.T;
    if(SP.NP !=1){
      if(T>=Ttest){
        SP.M=2;
        return 1;  
      }
    }
    else{
      if(T>Ttest){
        SP.M=2;
        return 1;          
      }
    }
    if(T>=273.15){
        SP.M=1;
        return 1;            
    }
    else{
        SP.M=0;
        return 1;                
    }
  }
  /*Test above saturation pressure at 350 degC*/
  if(T>1073.15){
    SP.M=0;
    return 1;  
  }
  SP1.P=P;  
  if(Tb23P(SP1)==-1){SP = null;return -1;}
  Ttest=SP1.T;
  if(T>=Ttest){
    SP.M=2;
    return 1;      
  }
  if(T>623.15){
    SP.M=3;
    return 1;      
  }  
  if(T>=273.15){
    SP.M=1;
    return 1;      
  }
  else{
    SP.M=0;
    return 1;
  }  
}
