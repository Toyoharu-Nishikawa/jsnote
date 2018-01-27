/*******************************************************************/
/*  propHS.for
/*  (given P and S calculate properties of the regions 1, 2, 3, 5,
/*   and wet steam region) 
/*******************************************************************/

import {ZHS_2} from "./Aux_2HS.mjs"

"use strict"

export function  propHS(SP){
  
  if(SP.h<=0){
    console.log("enthalpy is lower than zero.");
    return -1;
  }
  if(ZHS_2(SP)==-1){SP = null;return -1;}
  
  //check validity
  if(SP.Nin==1){
    console.log("S is too high.");
    return -1;
  }
  if(SP.Nin==2){
    console.log("S is too low.");
    return -1;
  }
  if(SP.Nin==3){
    console.log("H is too high.");
    return -1;
  }
  if(SP.Nin==4){
    console.log("H is too low.");
    return -1;
  }

  //check validity
  if(SP.nx==0){
    console.log("Wet region");
  }
  else{
    console.log("Dry region");    
  }
  return 1;
}

    
