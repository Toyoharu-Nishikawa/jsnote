/*******************************************************************/
/*  ZPH_2(P,H,t,v,g,u,s,Cp,w)                                      */
/*  (given P and H, calculate t and other properties in the region2*/
/*  (Newton method)
/*  ZPS_2(P,S,t,v,g,u,h,Cp,w)                                      */
/*  (given P and S, calculate t and other properties in the region2*/
/*  (Newton method)
/*******************************************************************/

/* Backward functions for region 2*/
/* iteration process */
"use strict"
import {Tph2,Tps2} from "./IF97_BK2.mjs" 
import {region_2,Gibbs_2} from "./IF97_2.mjs" 

export function ZPH_2(SP){
  var n;
  var Flag;
  var H;
  var eps;
  var dlt;
  
  eps=1.0e-6;
  H=SP.h;
  
  if(Tph2(SP)==-1){SP = null;return -1;} // 1st guess using IF97 backward function

  Flag=0;
  for(n=1;n<=10;n++){
    if(region_2(SP)==-1){SP = null;return -1;}
    dlt = H - SP.h;
    if (Math.abs(dlt) <= eps){
      Flag=1;
      break;
    } 
    SP.T = SP.T + dlt/SP.cp;
  }
  if(Flag==0){
    console.log("ZPH_2 not converged");
    return -1;
  }  
  return 1;
}

export function ZPS_2(SP){
  var n;
  var Flag;
  var R;
  var S;
  var s1;
  var eps;
  var dlt;
  var pai;
  var tau;
  var dsdt;
  var w2;
  var Gibbs;
  Gibbs = {}; 
  eps=1.0e-9;
  R=0.461526;
  S=SP.s;
  
  if(Tps2(SP)==-1){SP = null;return -1;} // 1st guess using IF97 backward function
  if(SP.P<=0.0 || SP.T<=0.0){SP = null;return -1;}
  
  pai=SP.P;
  Flag=0;
  for(n=1;n<=10;n++){
    tau = 540.0 / SP.T;
    Gibbs_2(pai,tau,Gibbs);
    s1= (tau*Gibbs.Gt - Gibbs.G0) * R;
    dlt = S - s1;
    if (Math.abs(dlt) <= eps){
      Flag=1;
      break;
    } 
    dsdt=-R*tau*tau*Gibbs.Gtt/SP.T;
    SP.T = SP.T + dlt/dsdt;
   }      
  if(Flag==0){
    console.log("ZPS_2 not converged");
    return -1;
  }
  SP.g  =Gibbs.G0*R*SP.T;
  SP.u  = (tau*Gibbs.Gt - pai*Gibbs.Gp) * R * SP.T;
  SP.v  = pai * Gibbs.Gp * R * SP.T / (SP.P*1e+3);
  SP.h  = tau * Gibbs.Gt * R * SP.T;
  SP.cp = -tau*tau * Gibbs.Gtt * R;
  w2 = Gibbs.Gp*Gibbs.Gp/(Math.pow(Gibbs.Gp-tau*Gibbs.Gpt,2)/(tau*tau*Gibbs.Gtt)-Gibbs.Gpp)*R*SP.T*1e+3;
  if (w2 < 0.0){w2=0.0;}
  SP.w  = Math.sqrt(w2);
  
  return 1;
}
    
