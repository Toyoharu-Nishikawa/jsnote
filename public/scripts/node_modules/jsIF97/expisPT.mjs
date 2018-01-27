/*******************************************************************/
/*expisPT.for
/*  (given P and T calculate isentropic exponent, Cp, and Cv in the
/*   regions 1, 2, 3, and 5)
/*******************************************************************/

import {RegPT} from "./Reg_pt.mjs"
import {expisen1, expisen2, expisen3, expisen5} from "./expisen.mjs"
 
export function expisPT(SP){
  SP.NP=2;
  if(SP.P<=0){
    console.log("Pressure is lower thn zero");
    return -1;
  }
  if(RegPT(SP)==-1){SP = null;return -1;}
  if(SP.M==1){
    if(expisen1(SP)==-1){SP = null;return -1;}
  }
  else if(SP.M==2){
    if(expisen2(SP)==-1){SP = null;return -1;}
  }
  else if(SP.M==3){
    if(expisen3(SP)==-1){SP = null;return -1;}
  }
  else if(SP.M==5){
    if(expisen5(SP)==-1){SP = null;return -1;}
  }
  else{
    console.log("Out of IF97 applicable range.");
    return -1;
  }
  
  return 1;
}
