/*******************************************************************/
/*  Pb23T(T,P)                                                     */
/*  Tb23P(P,T)                                                     */
/*******************************************************************/

/*************************************/
/*       Sub Routine                 */
/*************************************/
/* boundary between regions 2 and 3*/
/* based on Eqs.(5) and (6) of IAPWS-IF97*/
"use strict"
export function Pb23T(SP){
  var P;
  var N1;
  var N2;
  var N3;  
  
  N1  =  0.34805185628969e+3;
  N2  = -0.11671859879975e+1;
  N3  =  0.10192970039326e-2;

  
  P=(N3 * SP.T + N2) * SP.T + N1;
  SP.P=P;

  return 1;
}

export function Tb23P(SP){
  var D;
  var T;
  var N3;
  var N4;
  var N5;
  
  N3  =  0.10192970039326e-2;
  N4  =  0.57254459862746e+3;
  N5  =  0.13918839778870e+2;  
  
  D = (SP.P - N5) / N3;
  if(D<0.0){
    SP = null;
    return -1;
  }
  else{
    T = N4 + Math.sqrt(D);  
  }
  SP.T=T;
  
  return 1;
}

    
