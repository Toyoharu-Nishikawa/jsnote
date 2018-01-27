/*******************************************************************/
/*expisen1(p,t,kappa,Cp,Cv)
/*  (given p and t calculate isentropic exponent, Cp, and Cv
/*   in the region 1)
/*expisen2(p,t,kappa,Cp,Cv)
/*  (given p and t calculate isentropic exponent, Cp, and Cv
/*   in the region 2)/
/*expisen3(p,t,kappa,Cp,Cv)
/*  (given p and t calculate isentropic exponent, Cp, and Cv
/*   in the region 3)
/*expsatL3(t,kappa,Cp,Cv)
/*  (given t calculates isentropic exponent, Cp, and Cv of
/*   saturated liquid in the region 3)
/*expsatG3(t,kappa,Cp,Cv)
/*  (given t calculates isentropic exponent, Cp, and Cv of
/*   saturated vapor in the region 3)
/*expisen3h(v,t,kappa,Cp,Cv)
/*  (given v and t calculate isentropic exponent, Cp, and Cv
/*   in the region 3)
/*expisen5(p,t,kappa,Cp,Cv)
/*  (given p and t calculate isentropic exponent, Cp, and Cv
/*   in the region 5)
/*******************************************************************/

import {region_1, Gibbs_1} from "./IF97_1.mjs"
import {region_2, Gibbs_2} from "./IF97_2.mjs"
import {region_3, Helm_3} from "./IF97_3.mjs"
import {region_5, Gibbs_5} from "./IF97_5.mjs"
import {Vsatl_3, Vsatg_3, VPT_3} from "./Aux_3.mjs"


"use strict"

/*isentropic exponent, Cp, and Cv in region 1, 2, 3, and 5 */
export function  expisen1(SP){
  var R;
  var Tn;
  var Pn;
  var tau;
  var pai;
  var v;
  var dvdp;
  var dpdv;
  var dpdvs;
  var Cp;
  var Cv;
  var kappa;
  var Gibbs;
  
  Tn=1386.0;
  Pn=16.53;  
  R=0.461526;
  
  if(SP.P<=0.0 || SP.T<=0.0){SP = null;return -1;}
  
  pai=SP.P/Pn;
  tau=Tn/SP.T;

  Gibbs = {};
  Gibbs_1(pai,tau,Gibbs);

  v    = R*SP.T*Gibbs.Gp*1.0e-3/Pn;
  dvdp = R*SP.T*Gibbs.Gpp*1.0e-3/(Pn*Pn);
  dpdv = 1.0/dvdp;
  Cp   = -tau*tau*Gibbs.Gtt*R;
  Cv   = (-tau*tau*Gibbs.Gtt+Math.pow(Gibbs.Gp-tau*Gibbs.Gpt,2)/Gibbs.Gpp)*R;
  dpdvs= Cp/Cv*dpdv;
  kappa=-dpdvs*v/SP.P;
  
  SP.cp=Cp;
  SP.cv=Cv;
  SP.kappa=kappa;
  
  return 1;
}



export function expisen2(SP){
  var R;
  var Tn;
  var tau;
  var v;
  var p;
  var dvdp;
  var dpdv;
  var dpdvs;
  var Cp;
  var Cv;
  var kappa;
  var Gibbs;
  
  Tn=540.0;
  R=0.461526;
  
  if(SP.P<=0.0 || SP.T<=0.0){SP = null;return -1;}
  p=SP.P;
  tau=Tn/SP.T;

  Gibbs = {};
  Gibbs_2(p,tau,Gibbs);
  v    = R*SP.T*Gibbs.Gp*1.0e-3;
  dvdp = R*SP.T*Gibbs.Gpp*1.0e-3;
  dpdv = 1.0/dvdp;
  Cp   = -tau*tau*Gibbs.Gtt*R;
  Cv   = (-tau*tau*Gibbs.Gtt+Math.pow(Gibbs.Gp-tau*Gibbs.Gpt,2)/Gibbs.Gpp)*R;
  dpdvs= Cp/Cv*dpdv;
  kappa=-dpdvs*v/SP.P;
  
  SP.cp=Cp;
  SP.cv=Cv;
  SP.kappa=kappa;
  
  return 1;
}

/* isentropic exponent, Cp, and Cv in region 3, p and T as main variables*/
export function expisen3(SP){
  var SP1;
  
  SP1 = {};
  
  SP1.P=SP.P;
  SP1.T=SP.T;
  VPT_3(SP1);
  if(expisen3h(SP1)==-1){SP = null;return -1;}
  
  SP.cp    = SP1.cp;
  SP.cv    = SP1.cv;
  SP.kappa = SP1.kappa;
  
  return 1;
}

/* isentropic exponent, Cp, and Cv of saturated liquid in region 3*/
export function expsatL3(SP){
  var SP1;
  
  SP1 = {};

  SP1.T=SP.T;
  if(Vsatl_3(SP1)==-1){SP = null;return -1;}
  if(expisen3h(SP1)==-1){SP = null;return -1;}
  
  SP.cp    = SP1.cp;
  SP.cv    = SP1.cv;
  SP.kappa = SP1.kappa;
  
  return 1;
}

/* isentropic exponent, Cp, and Cv of saturated liquid in region 3*/
export function expsatG3(SP){
  var SP1;
  
  SP1 = null;
  
  SP1.T=SP.T;
  if(Vsatg_3(SP1)==-1){SP = null;return -1;}
  if(expisen3h(SP1)==-1){SP = null;return -1;}
  
  SP.cp    = SP1.cp;
  SP.cv    = SP1.cv;
  SP.kappa = SP1.kappa;
  
  return 1;
}

/* isentropic exponent, Cp, and Cv in region 3, v and T as main variables*/
export function expisen3h(SP){
  var rho;
  var Tn;
  var tau;
  var rhon;
  var dlt;
  var R;
  var p;
  var t;
  var v;
  var dpdd;
  var dpdv;
  var dpdvs;
  var Cp;
  var Cv;
  var kappa;
  var SP1;
  var Helm;
  
  SP1 = {};
  Helm = {};
  
  Tn  = 647.096;
  rhon= 322.0;
  R   = 0.461526;
  
  if(SP.v<=0.0 || SP.T<=0.0){SP = null;return -1;}
  rho = 1.0/SP.v;
  dlt = rho/rhon;
  tau = Tn/SP.T;

  if(Helm_3(dlt,tau,Helm)==-1){SP = null;return -1;}
  p    = dlt*Helm.Fd*R*SP.T*rho*1.0e-3;
  t    = SP.T;
  v    = SP.v;
  dpdd = R*t*rhon*(2.0*dlt*Helm.Fd+dlt*dlt*Helm.Fdd)*1.0e-3;
  dpdv = -dpdd/(rhon*v*v);
  Cp   = (-tau*tau*Helm.Ftt+Math.pow(dlt*Helm.Fd-dlt*tau*Helm.Fdt,2)/(2.0*dlt*Helm.Fd+dlt*dlt*Helm.Fdd))*R;
  Cv   = (-tau*tau*Helm.Ftt)*R;
  dpdvs= Cp/Cv*dpdv;
  kappa= -dpdvs*v/p;
  
  SP.cp    = Cp;
  SP.cv    = Cv;
  SP.kappa = kappa;
  
  return 1;
}

export function expisen5(SP){
  var R;
  var Tn;
  var tau;
  var p;
  var v;
  var dvdp;
  var dpdv;
  var dpdvs;
  var Cp;
  var Cv;
  var kappa;
  var Gibbs;
  
  Tn=1000.0;
  R=0.461526;
  
  
  if(SP.P<=0.0||SP.T<=0.0){SP = null;return -1;}
  tau=Tn/SP.T;
  p  = SP.P;
  
  Gibbs = {};
  if(Gibbs_5(p,tau,Gibbs)==-1){SP = null;return -1;}
  
  v    = R*SP.T*Gibbs.Gp*1.0e-3;
  dvdp = R*SP.T*Gibbs.Gpp*1.0e-3;
  dpdv = 1.0/dvdp;
  Cp   = -tau*tau*Gibbs.Gtt*R;
  Cv   = (-tau*tau*Gibbs.Gtt+Math.pow(Gibbs.Gp-tau*Gibbs.Gpt,2)/Gibbs.Gpp)*R;
  dpdvs= Cp/Cv*dpdv;
  kappa=-dpdvs*v/SP.P;
  
  SP.cp=Cp;
  SP.cv=Cv;
  SP.kappa=kappa;
  
  return 1;
}
    
