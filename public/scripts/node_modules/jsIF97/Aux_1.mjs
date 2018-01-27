/*******************************************************************/
/*  ZPH_1(P,H,t,v,g,u,s,Cp,w)                                      */
/*  (given P and H, calculate t and other properties in the region1*/
/*  (Newton method)                                                */
/*  ZPS_1(P,S,t,v,g,u,h,Cp,w)                                      */
/*  (given P and S, calculate t and other properties in the region1*/ 
/*******************************************************************/

/* Backward functions for region 1*/
/* iteration process */
"use strict" 
import {Tph1,Tps1} from "./IF97_BK1.mjs" 
import {region_1,Gibbs_1} from "./IF97_1.mjs" 
export function ZPH_1(SP){
  var n;
  var Flag;
  var H;
  var eps;
  var dlt;
  
  eps=1.0e-6;
  H=SP.h;
  
  if(Tph1(SP)==-1){SP = null;return -1;} // 1st guess using IF97 backward function

  Flag=0;
  for(n=1;n<=10;n++){
    if(region_1(SP)==-1){SP = null;return -1;}
    dlt = H - SP.h;
    if (Math.abs(dlt) <= eps){
      Flag=1;
      break;
    } 
    SP.T = SP.T + dlt/SP.cp;
  }
  if(Flag==0){
    console.log("ZPH_1 not converged");
    return -1;
  }  
  return 1;
}

export function ZPS_1(SP){
  var n;
  var Flag;
  var R;
  var P;
  var S;
  var T;
  var s1;
  var eps;
  var dlt;
  var pai;
  var tau;
  var dsdt;
  var w2;
  var SP1;
  var Gibbs;
  
  eps=1.0e-9;
  R=0.461526;

  P=SP.P;
  S=SP.s;
  
  SP1 = {};
  Gibbs = {};
  
  SP1.P=SP.P;
  SP1.s=SP.s;
  
  if(Tps1(SP1)==-1){SP = null;return -1;} // 1st guess using IF97 backward function
  T=SP1.T;
  pai=P/16.53;
  
  if(P<=0.0 || T<=0.0){SP = null;return -1;}
  
  Flag=0;
  for(n=1;n<=10;n++){
    tau = 1386.0 / T;
    Gibbs_1(pai,tau,Gibbs);
    s1= (tau*Gibbs.Gt - Gibbs.G0) * R;
    dlt = S - s1;
    if (Math.abs(dlt) <= eps){
      Flag=1;
      break;
    } 
    dsdt=-R*tau*tau*Gibbs.Gtt/T;
    T = T + dlt/dsdt;
  }
  if(Flag==0){
    console.log("ZPS_1 not converged");
    return -1;  
  }
  
  SP.T  = T;
  SP.g  =Gibbs.G0*R*T;
  SP.u  = (tau*Gibbs.Gt - pai*Gibbs.Gp) * R * T;
  SP.v  = pai * Gibbs.Gp * R * T / (P*1e+3);
  SP.h  = tau * Gibbs.Gt * R * T;
  SP.cp = -tau*tau * Gibbs.Gtt * R;
  w2 = Gibbs.Gp*Gibbs.Gp/(Math.pow(Gibbs.Gp-tau*Gibbs.Gpt,2)/(tau*tau*Gibbs.Gtt)-Gibbs.Gpp)*R*T*1e+3;
  if (w2 < 0.0) w2=0.0;
  SP.w  = Math.sqrt(w2);
  
  return 1;
  }
    
