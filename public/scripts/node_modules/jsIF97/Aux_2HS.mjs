/************************************************************************/
/*Aux_2HS.for (Regions 2 and wet but s>=5.85kJ/kgK)                     */
/*  deri_2HS(P,T,dhdt,dhdp,dsdt,dsdp)                                   */
/*    (given P and T calculate derivatives of h and s)                  */
/*  ZsatS(S,p,t,h)                                                      */
/*    (given S calculates p, t, and h for saturated vapor)              */
/*  ZmaxS(S,p,t,h)                                                      */
/*    (given S calculates p, t, and h along the isotherm 800 degC       */
/*     or isobar 100 MPa, i.e. limit of IF97)                           */
/*  ZHS_2(H,S,p,t,g,u,v,Cp,w,x,nx,Nin)                                  */
/*    (given H and S calculate properties in the region                 */
/*     s>=5.85kJ/kgK and p>=0.001MPa)                                   */
/*    (two dimensional Newton method)                                   */
/************************************************************************/   

"use strict"

import {region_1,Gibbs_1} from "./IF97_1.mjs" 
import {region_2,Gibbs_2} from "./IF97_2.mjs" 
import {Tph2,Tps2} from "./IF97_BK2.mjs" 
import {PsatT,TsatP} from './IF97_Sat.mjs'
import {ZPH_2,ZPS_2} from './Aux_2.mjs'


// Auxiliary subroutines for propHS
// The subroutines are applicable in the regions 2a and 2b.
function deri_2HS(SP){
//     input:  P:  pressure in MPa
//             T:  temperature in K
//     output: derivatives of enthalpy and entropy
//             dhdt: (dh/dt)@p in kJ/kgK (=Cp)
//             dhdp: (dh/dp)@t in kJ/kgMPa
//             dsdt: (ds/dt)@p in kJ/kgK^2
//             dsdp: (ds/dp)@t in kJ/kgMPaK
  var pai;
  var tau;
  var R;
  var Gibbs;
  var dhdt;
  var dhdp;
  var dsdt;
  var dsdp;
  
  R=0.461526;
  
  if(SP.P<=0.0 || SP.T<=0.0){SP = null;return -1;}

  pai=SP.P;
  tau=540.0/SP.T;
  
  Gibbs = {};
  if(Gibbs_2(pai,tau,Gibbs)==-1){SP = null;return -1;}
  
  dhdt=-R*tau*tau*Gibbs.Gtt;
  dhdp= R*540.0*Gibbs.Gpt;
  dsdt=-R*tau*tau*Gibbs.Gtt/SP.T;
  dsdp= R*(tau*Gibbs.Gpt-Gibbs.Gp);
  
  SP.dhdt=dhdt;
  SP.dhdp=dhdp;
  SP.dsdt=dsdt;
  SP.dsdp=dsdp;
  
  return 1;
}

function ZsatS(SP){
//     input:  S: entropy in kJ/kgK
//     output: properties on the saturation line
//             p: pressure in MPa
//             t: temperature in K
//             h: enthalpy in kJ/kg
  var n;
  var Flag;
  var t1;
  var t2;
  var dt;
  var s1;
  var s2;
  var del;
  var S;
  var SP1;
  
  t1=273.16; //start from triple povar
  dt=0.01;
  
  SP1 = {};
  
  S=SP.s;
  SP1.T=t1;
  if(PsatT(SP1)==-1){SP = null;return -1;}
  if(region_2(SP1)==-1){SP = null;return -1;};
  s1=SP1.s;
  Flag=0;
  for(n=1;n<=20;n++){
    t2=t1+dt;
    SP1.T=t2;
    if(PsatT(SP1)==-1){SP = null;return -1;}
    if(region_2(SP1)==-1){SP = null;return -1;}
    s2=SP1.s;
    del=S-s2;
    if(Math.abs(del)<=1.0E-9){
      Flag=1;
      break;
    }
    dt=del*dt/(s2-s1);
    t1=t2;
    s1=s2;
  }
  if(Flag==0){
    console.Math.log("ZsatS not converged");
    return -1;
  }
  SP.T=t2;
  SP.P=SP1.P;
  SP.h=SP1.h;
  return 1;
}

function ZmaxS(SP){
//     input:  S: entropy in kJ/kgK
//     output: properties on the isotherm 800 degC or isobar 100 MPa
//             p: pressure in MPa
//             t: temperature in K
//             h: enthalpy in kJ/kg  
  var S;
  var p;
  var t;
  var aa;
  var bb;
  var cc;
  var dd;
  var ee;
  var ff;
  var gg;
  
  var s100;
  
  S=SP.s;
  
  s100= 6.04048367171238; //entropy at 100 MPa, 800 degC
  
  aa =   0.028346255;
  bb =  -0.78039904 ;
  cc =   4.942691911;
  dd =  -3.00901258 ;
  ee =  24.36133988 ;
  ff =  -8.629021804;
  gg = 235.9643342  ;

  if(S>=s100){
    p=Math.exp(((S*aa+bb)*S+cc)*S+dd); // approximation of isotherm 800 degC
    t=1073.15;
  }
  else{
    p=100.0;
    t=(S*ee+ff)*S+gg;             // approximation of isobar 100 MPa
  }
  SP.P=p;
  SP.T=t;
  if(region_2(SP)==-1){SP = null;return -1;}
  
  return 1;
}

export function ZHS_2(SP){
//     input:  H: enthalpy in kJ/kg
//             S: entropy in kJ/kgK
//     output  p: pressure in MPa
//             t: temperature in K
//             g: Gibbs free energy in kJ/kg
//             u: varernal energy in kJ/kg
//             v: spe//ifi// volume in m^3/kg
//             Cp: spe//ifi// heat in kJ/kgK
//             w: speed of sound in m/s
//             x: dryness in fra//tion
//             nx: 1: dry region
//                 0: wet region
//             Nin: 0: calulation valid
//                  1: invalid, S is too high.
//                  2: invalid, S is too low.
//                  3: invalid, H is too high.
//                  4: invalid, H is too low.

  var nx;
  var Nin;
  var n;
  var Flag;
  
  var S;
  var H;
  
  var smax;
  var hmax;
  var pmax;
  var tsat;
  var ttrip;
  var hmin;
  var smin;
  var pmin;
  
  var g;
  var u;
  var v;
  var Cp;
  var w;
  
  var dhdt;
  var dhdp;
  var dsdt;
  var dsdp;
  var delh;
  var dels;
  var Dsum;
  var delp;
  var delt;
  
  var tmax;
  var tmin;
  var pmaxl;
  var psat;
  var psatl;
  var hsat;
  var rdeps;

  var d1;
  var d2;
  var dm;
  
  var x;
  var t;
  var p;
  
  var SP1;
  var SP2;
  var SP3;
  
  SP1 = {};
  SP2 = {};
  SP3 = {};
  
  S=SP.s;
  H=SP.h;
  
  smax  = 9.1555; // s" at triple povar
  ttrip = 273.16; // triple povar temperature
  smin  = 5.85;   // S, lower limit of region 2b
  pmin  = 0.001;  // pressure, lower limit
  
  Nin=0;
  if(S>smax){
    Nin=1;
    SP.Nin=Nin;
    return 1;
  }
  if(S<smin){
    Nin=2;
    SP.Nin=Nin;
    return 1;
  }
  SP1.s=S;
  if(ZmaxS(SP1)==-1){SP = null;return -1;}
  pmax=SP1.P;
  tmax=SP1.T;
  hmax=SP1.h;
  
  if(H>hmax*1.05){
    Nin=3;
    SP.Nin=Nin;
    return 1;
  }
  
  SP1.P=pmin;
  SP2.P=pmin;
  if(TsatP(SP1)==-1){SP = null;return -1;}
  tmin =SP1.T;
  SP2.T=tmin;
  if(region_1(SP1)==-1){SP = null;return -1;}
  if(region_2(SP2)==-1){SP = null;return -1;}
  
  x=(S-SP1.s)/(SP2.s-SP1.s);
  hmin=SP2.h*x+SP1.h*(1.0-x);
  if(H<hmin){
    Nin=4;
    SP.Nin=Nin;
    return 1;
  }
  SP3.s=S;
  if(ZsatS(SP3)==-1){SP = null;return -1;}
  psat=SP3.P;
  tsat=SP3.T;
  hsat=SP3.h;

  Flag=0;
  if(H>=hsat){
    //dry region
    nx=1;
    x=1.0;
    //first guess
    rdeps=(H-hsat)/(hmax-hsat);
    t=rdeps*(tmax-tsat)+tsat;
    pmaxl=Math.log(pmax);
    psatl=Math.log(psat);
    p=rdeps*(pmaxl-psatl)+psatl;
    p=Math.exp(p);
    for(n=1;n<=20;n++){
      SP3.P=p;
      SP3.T=t;
      if(region_2(SP3)==-1){SP = null;return -1;}
      delh=SP3.h-H;
      dels=SP3.s-S;
      if((Math.abs(delh/H)<=1.0E-8)&&(Math.abs(dels/S)<=1.0E-8)){
        Flag=1;
        g=SP3.g;
        u=SP3.u;
        v=SP3.v;
        Cp=SP3.cp;
        w=SP3.w;
        x=0.0;        
        break;
      }
      SP3.P=p;
      SP3.T=t;
      deri_2HS(SP3);
      dhdp=SP3.dhdp;
      dsdt=SP3.dsdt;
      dhdt=SP3.dhdt;
      dsdp=SP3.dsdp;
      
      Dsum=dhdp*dsdt-dhdt*dsdp;
      delp=(delh*dsdt-dhdt*dels)/Dsum;
      delt=(dhdp*dels-delh*dsdp)/Dsum;
      p   =p-delp;
      t   =t-delt;
    }
    if(Flag==0){
      console.Math.log("ZHS_2 not converged, dry region");
      return -1;
    }
  }
  else{
    //wet region
    nx=0;          
    d1=tsat;
    d2=ttrip;     
    for(n=1;n<=30;n++){
      dm=(d1+d2)*0.5;
      SP1.T=dm;
      SP2.T=dm;
      PsatT(SP1);
      PsatT(SP2);
      p=SP1.P;
      region_1(SP1);
      region_2(SP2);
      x=(S-SP1.s)/(SP2.s-SP1.s);
      SP2.h=x*SP2.h+(1.0-x)*SP1.h;
      if(SP2.h>=H){
        d1=dm;
      }
      else{
        d2=dm;
      }
    }
    t=dm;
    g=x*SP2.g+(1.0-x)*SP1.g;    
    u=x*SP2.u+(1.0-x)*SP1.u;    
    v=x*SP2.v+(1.0-x)*SP1.v;    
    Cp=0.0;
    w=0.0;    
  }
  
  SP.P=p;
  SP.T=t;
  SP.g=g;
  SP.u=u;
  SP.v=v;
  SP.cp=Cp;
  SP.w=w;
  SP.x=x;
  SP.Nin=Nin;
  SP.nx=nx;
  
  return 1;
}
