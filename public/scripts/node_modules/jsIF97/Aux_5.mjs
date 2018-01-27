/*******************************************************************/
/*ZPH_5(P,H,t,v,g,u,s,Cp,w)
/*  (given P and H calculate t and other properties in the region 5)
/*  (Newton method)
/*ZPS_5(P,S,t,v,g,u,h,Cp,w)
/*  (given P and S calculate t and other properties in the region 5)
/*  (Newton method)
/*******************************************************************/

import {region_5, Gibbs_5} from "./IF97_5.mjs"

/* Backward functions for region 2*/
/* iteration process */
export function ZPH_5(SP){
  var n;
  var Flag;
  var H;
  var eps;
  var dlt;
  
  eps=1.0E-6;
  H=SP.h;
  
  SP.T=(H-1240.0)*0.37; // 1st guess using linear function

  Flag=0;
  for(n=1;n<=10;n++){
    if(region_5(SP)==-1){SP = null;return -1;}
    dlt = H - SP.h;
    if (Math.abs(dlt) <= eps){
      Flag=1;
      break;
    } 
    SP.T = SP.T + dlt/SP.cp;
  }
  if(Flag==0){
    console.Math.log("ZPH_5 not converged");
    return -1;
  }  
  return 1;
}

export function ZPS_5(SP){
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
  var a;
  var b;
  var c;
  var w2;
  var  Gibbs;

  Gibbs = {}; 
  eps=1.0E-9;
  R=0.461526;
  a=-0.463569131;
  b= 0.001662109;
  c= 6.705653717;
  
  S=SP.s;
  pai=SP.P;
  SP.T=(S-a*Math.log(SP.P)-c)/b; //1st guess using linear function

  Flag=0;
  for(n=1;n<=10;n++){
          tau = 1000.0 / SP.T;
          if(Gibbs_5(pai,tau,Gibbs)==-1){SP = null;return -1;}
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
    console.Math.log("ZPS_5 not converged");
    return -1;
  }
  SP.g  =Gibbs.G0*R*SP.T;
  SP.u  = (tau*Gibbs.Gt - pai*Gibbs.Gp) * R * SP.T;
  SP.v  = pai * Gibbs.Gp * R * SP.T / (SP.P*1E+3);
  SP.h  = tau * Gibbs.Gt * R * SP.T;
  SP.s  = (tau* Gibbs.Gt - Gibbs.G0) * R;
  SP.cp = -tau*tau * Gibbs.Gtt * R;
      w2 = Gibbs.Gp*Gibbs.Gp/(Math.pow(Gibbs.Gp-tau*Gibbs.Gpt,2)/(tau*tau*Gibbs.Gtt)-Gibbs.Gpp)*R*SP.T*1E+3;
      if (w2 < 0.0) w2=0.0;
  SP.w  = Math.sqrt(w2);
  
  return 1;
}
    
