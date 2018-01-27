/*********************************************************************/ 
/*spinl_3(T, Vspinl)
/*  (given T calculates V at liquid spinodal in the region 3)
/*  (bisection method)
/*sping_3(T, Vsping)
/*  (given T calculates V at vapor spinodal in the region 3)
/*  (bisection method)
/*VPT_3(P,T,V)
/*  (given P and T calculate V in the region 3)
/*  (This subroutine calls subroutines VPT_30, VPT_31, and VPT_32)
/*VPT_30(P,T,V)
/*  (given P and T calculate V in the region 3 above critical
/*   temperature)
/*  (bisection method)
/*VPT_31(P,T,V)
/*  (given P and T calculate V in the region 3 liquid phase
/*   including metastable state)
/*  (bisection method)
/*VPT_32(P,T,V)
/*  (given P and T calculate V in the region 3 vapor phase
/*   including metastable state)
/*  (bisection method)
/*Vsatl_3(T, Vl)
/*  (given T calculate V of saturated liquid in the region 3)
/*  (bisection method)
/*Vsatg_3(T, Vg)
/*  (given T calculate V of saturated vapor in the region 3)
/*  (bisection method)
/*ZPH_30(P,H,t,v,g,u,s,Cp,w)
/*  (given P and H calculate properties in the region 3
/*   above critical pressure)
/*ZPH_31(P,H,t,v,g,u,s,Cp,w)
/*  (given P and H calculate liquid properties in the region 3
/*   below critical pressure)
/*ZPH_32(P,H,t,v,g,u,s,Cp,w)
/*  (given P and H calculate vapor properties in the region 3
/*   below critical pressure)
/*ZPS_30(P,S,t,v,g,u,h,Cp,w)
/*  (given P and S calculate properties in the region 3
/*   above critical pressure)
/*ZPS_31(P,S,t,v,g,u,h,Cp,w)
/*  (given P and S calculate liquid properties in the region 3
/*   below critical pressure)
/*ZPS_32(P,S,t,v,g,u,h,Cp,w)
/*  (given P and S calculate vapor properties in the region 3
/*   below critical pressure)
/*           
/*********************************************************************/ 

import {region_3, PVT_3,dPdV_3} from './IF97_3.mjs'
import {PsatT,TsatP} from './IF97_Sat.mjs'
import {Pb23T} from './IF97_B23.mjs'

"use strict"

export function spinl_3(SP){
  var n;
  var Vmin;
  var Vcrt;
  var d1;
  var d2;
  var dm;
  var SP1;
  
  SP1 = {};
  
  Vmin = 1.3e-3;
  Vcrt = 1.0/322.0; 
  
  d1 = Vcrt;
  d2 = Vmin;
  
  SP1.T=SP.T;
  
  for(n=1;n<=30;n++){
    dm = (d1 + d2) * 0.5;
    SP1.v=dm;
    if(dPdV_3(SP1)==-1){SP = null;return -1;}
    if (SP1.dPdV >= 0.0){
      d1 = dm;
    }
    else{
      d2 = dm;
    }
  }
  SP.Vspinl = dm;
  return 1;
}

export function sping_3(SP){
  var n;
  var Vmax;
  var Vcrt;
  var d1;
  var d2;
  var dm;
  var SP1;
  
  SP1 = {};
  
  Vmax = 8.9e-3;
  Vcrt = 1.0/322.0; 
  
  d1 = Vmax;
  d2 = Vcrt;
  
  SP1.T=SP.T;
  
  for(n=1;n<=30;n++){
    dm = (d1 + d2) * 0.5;
    SP1.v=dm;
    if(dPdV_3(SP1)==-1){SP = null;return -1;}
    if (SP1.dPdV <= 0.0){
      d1 = dm;
    }
    else{
      d2 = dm;
    }
  }
  SP.Vsping = dm;
  
  return 1;
}

export function VPT_3(SP){
  var Tcrt;
  var SP1;

  SP1 = {}; 
  Tcrt  = 647.096;
  SP1.T=SP.T;
  
  if (SP.T >= Tcrt){
    if(VPT_30(SP)==-1){SP = null;return -1;}
  }
  else{
    PsatT(SP1);
    if (SP.P <= SP1.P){
      if(VPT_32(SP)==-1){SP = null;return -1;}
    }
    else{
      if(VPT_31(SP)==-1){SP = null;return -1;}
    }
  }

  return 1;
}

export function VPT_30(SP){
  var n;
  var Vmin;
  var Vmax;
  var d1;
  var d2;
  var dm;
  var SP1;
  
  SP1 = {};
  
  Vmin = 1.3e-3;
  Vmax = 8.9e-3; 
  
  d1 = Vmax;
  d2 = Vmin;
  
  SP1.T=SP.T;
  
  for(n=1;n<=40;n++){
    dm = (d1 + d2) * 0.5;
    SP1.v=dm;
    if(PVT_3(SP1)==-1){SP = null;return -1;}
    if (SP1.P <= SP.P){
      d1 = dm;
    }
    else{
      d2 = dm;
    }
  }
  SP.v = dm;
  return 1;
}

export function VPT_31(SP){
  var n;
  var Vmin;
  var Vspinl;
  var d1;
  var d2;
  var dm;
  var SP1;
  
  SP1 = {};
  
  if(spinl_3(SP)==-1){SP = null;return -1;}  
  
  Vmin = 1.3e-3;
  Vspinl =SP.Vspinl;
  
  d1 = Vspinl;
  d2 = Vmin;
  
  SP1.T=SP.T;
  
  for(n=1;n<=40;n++){
    dm = (d1 + d2) * 0.5;
    SP1.v=dm;
    if(PVT_3(SP1)==-1){SP = null;return -1;}
    if (SP1.P <= SP.P){
      d1 = dm;
    }
    else{
      d2 = dm;
    }
  }
  SP.v = dm;
  return 1;
}

export function VPT_32(SP){
  var n;
  var Vmax;
  var Vsping;
  var d1;
  var d2;
  var dm;
  var SP1;
  
  SP1 = {};
  
  if(sping_3(SP)==-1){SP = null;return -1;}  
  
  Vmax = 8.9e-3;
  Vsping =SP.Vsping;
  
  d1 = Vmax;
  d2 = Vsping;
  
  SP1.T=SP.T;
  
  for(n=1;n<=40;n++){
    dm = (d1 + d2) * 0.5;
    SP1.v=dm;
    if(PVT_3(SP1)==-1){SP = null;return -1;}
    if (SP1.P <= SP.P){
      d1 = dm;
    }
    else{
      d2 = dm;
    }
  }
  SP.v = dm;
  return 1;
}

export function Vsatl_3(SP){
  var n;
  var Vspinl;
  var Vmin;
  var d1;
  var d2;
  var dm;
  var Psat;
  var SP1;

  SP1 = {};

  SP1.T=SP.T;
  if(PsatT(SP1)==-1){SP = null;return -1;}  
  Psat=SP1.P;

  if(spinl_3(SP)==-1){SP = null;return -1;}
  
  Vspinl=SP.Vspinl;
  Vmin=1.3e-3;
  
  d1 = Vspinl;
  d2 = Vmin;

  for(n=1;n<=40;n++){
    dm = (d1 + d2) * 0.5;
    SP1.v=dm;
    if(PVT_3(SP1)==-1){SP = null;return -1;}
    if(SP1.P <=Psat){
      d1 = dm;
    }
    else{
      d2 = dm;
    }
  }
  SP.Vl = dm;
  
  return 1;
}

export function Vsatg_3(SP){
  var n;
  var Vsping;
  var Vmax;
  var d1;
  var d2;
  var dm;
  var Psat;
  var SP1;

  SP1 = {};

  SP1.T=SP.T;
  if(PsatT(SP1)==-1){SP = null;return -1;}  
  Psat=SP1.P;

  if(sping_3(SP)==-1){SP = null;return -1;}
    
  Vmax=8.9e-3;
  Vsping=SP.Vsping;
  
  d1 = Vmax;
  d2 = Vsping;
 
  for(n=1;n<=40;n++){
    dm = (d1 + d2) * 0.5;
    SP1.v=dm;
    if(PVT_3(SP1)==-1){SP = null;return -1;}
    if(SP1.P <=Psat){
      d1 = dm;
    }
    else{
      d2 = dm;
    }
  }
  SP.Vg = dm;
  
  return 1;
}

export function ZPH_30(SP){
  var n;
  var d1;
  var d2;
  var dm;
  var H;
  var SP1;
  
  SP1 = {};
  
  H=SP.h;
  SP1.P=SP.P;
  if(Tb23P(SP1)==-1){SP = null;return -1;}

  d1=SP1.T;
  d2=623.15;
  
  for(n=1;n<=40;n++){
    dm = (d1 + d2) * 0.5;
    SP1.T=dm;
    if(VPT_3(SP1)==-1){SP = null;return -1;}
    if(region_3(SP1)==-1){SP = null;return -1;}
    if(SP1.h >=H){
      d1 = dm;
    }
    else{
      d2 = dm;
    }
  }
  SP.T = dm;
  SP.v = SP1.v;
  if(region_3(SP)==-1){SP = null;return -1;}
  
  return 1;
}

export function ZPH_31(SP){
  var n;
  var d1;
  var d2;
  var dm;
  var H;
  var SP1;
  
  SP1 = {};
  
  H=SP.h;
  SP1.P=SP.P;
  if(TsatP(SP1)==-1){SP = null;return -1;}

  d1=SP1.T;
  d2=623.15;
  
  for(n=1;n<=40;n++){
    dm = (d1 + d2) * 0.5;
    SP1.T=dm;
    if(VPT_3(SP1)==-1){SP = null;return -1;}
    if(region_3(SP1)==-1){SP = null;return -1;}
    if(SP1.h >=H){
      d1 = dm;
    }
    else{
      d2 = dm;
    }
  }
  SP.T = dm;
  SP.v = SP1.v;
  if(region_3(SP)==-1){SP = null;return -1;}
  
  return 1;
}

export function ZPH_32(SP){
  var n;
  var d1;
  var d2;
  var dm;
  var H;
  var SP1;
  
  SP1 = {};
  
  H=SP.h;
  SP1.P=SP.P;

  if(Tb23P(SP1)==-1){SP = null;return -1;}
  d1=SP1.T;

  if(TsatP(SP1)==-1){SP = null;return -1;}
  d2=SP1.T;
  
  for(n=1;n<=40;n++){
    dm = (d1 + d2) * 0.5;
    SP1.T=dm;
    VPT_3(SP1);
    if(region_3(SP1)==-1){SP = null;return -1;}
    if(SP1.h >=H){
      d1 = dm;
    }
    else{
      d2 = dm;
    }
  }
  SP.T = dm;
  SP.v = SP1.v;
  if(region_3(SP)==-1){SP = null;return -1;}
  
  return 1;
}

export function ZPS_30(SP){
  var n;
  var d1;
  var d2;
  var dm;
  var S;
  var SP1;
  
  SP1 = {};
  
  S=SP.s;
  SP1.P=SP.P;
  if(Tb23P(SP1)==-1){SP = null;return -1;}

  d1=SP1.T;
  d2=623.15;
  
  for(n=1;n<=40;n++){
    dm = (d1 + d2) * 0.5;
    SP1.T=dm;
    if(VPT_3(SP1)==-1){SP = null;return -1;}
    if(region_3(SP1)==-1){SP = null;return -1;}
    if(SP1.s >=S){
      d1 = dm;
    }
    else{
      d2 = dm;
    }
  }
  SP.T = dm;
  SP.v = SP1.v;
  if(region_3(SP)==-1){SP = null;return -1;}
  
  return 1;
}

export function ZPS_31(SP){
  var n;
  var d1;
  var d2;
  var dm;
  var S;
  var SP1;
  
  SP1 = {};
  
  S=SP.s;
  SP1.P=SP.P;
  if(TsatP(SP1)==-1){SP = null;return -1;}

  d1=SP1.T;
  d2=623.15;
  
  for(n=1;n<=40;n++){
    dm = (d1 + d2) * 0.5;
    SP1.T=dm;
    if(VPT_3(SP1)==-1){SP = null;return -1;}
    if(region_3(SP1)==-1){SP = null;return -1;}
    if(SP1.s >=S){
      d1 = dm;
    }
    else{
      d2 = dm;
    }
  }
  SP.T = dm;
  SP.v = SP1.v;
  if(region_3(SP)==-1){SP = null;return -1;}
  
  return 1;
}

export function ZPS_32(SP){
  var n;
  var d1;
  var d2;
  var dm;
  var S;
  var SP1;
  
  SP1 = {};
  
  S=SP.s;
  SP1.P=SP.P;

  if(Tb23P(SP1)==-1){SP = null;return -1;}
  d1=SP1.T;

  if(TsatP(SP1)==-1){SP = null;return -1;}
  d2=SP1.T;
  
  for(n=1;n<=40;n++){
    dm = (d1 + d2) * 0.5;
    SP1.T=dm;
    if(VPT_3(SP1)==-1){SP = null;return -1;}
    if(region_3(SP1)==-1){SP = null;return -1;}
    if(SP1.s >=S){
      d1 = dm;
    }
    else{
      d2 = dm;
    }
  }
  SP.T = dm;
  SP.v = SP1.v;
  if(region_3(SP)==-1){SP = null;return -1;}
  
  return 1;
}
    
