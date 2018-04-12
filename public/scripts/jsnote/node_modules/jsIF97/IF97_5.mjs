/*******************************************************************/
/* region_5(P,T,g,u,v,h,s,Cp,w)                                    */
/* Gibbs_5(pai, tau, G0, Gp, Gpp, Gt, Gtt, Gpt)                    */
/*******************************************************************/

// region 5 based on Eq.(32) of IAPWS-IF97
"use strict"
export function region_5(SP){
  var P;
  var T;

  var pai;
  var tau;
  var R;  //gas constant in in kJ/kgK
  var w2;  

  var G0 ;
  var Gp ;
  var Gpp;
  var Gt ;
  var Gtt;
  var Gpt;
  var Gibbs;
  
  P = SP.P;
  T = SP.T;
  
  if(P<=0.0 || T<=0.0){
    SP = null;
    return -1;
  }
  else{
    pai = P;
    tau = 1000 / T;
  }
  R   = 0.461526;
  
  Gibbs = {};
  if(Gibbs_5(pai,tau, Gibbs)==-1){
    SP = null;
    return -1;
  }

  G0 = Gibbs.G0;
  Gp = Gibbs.Gp;
  Gpp= Gibbs.Gpp;
  Gt = Gibbs.Gt;
  Gtt= Gibbs.Gtt;
  Gpt= Gibbs.Gpt;

  SP.g  = G0*R*SP.T;
  SP.u  = (tau*Gt - pai*Gibbs.Gp) * R * SP.T;
  SP.v  = pai * Gp * R * T / (P*1E+3);
  SP.h  = tau * Gt * R * T;
  SP.s  = (tau* Gt - G0) * R;
  SP.cp = -tau*tau * Gtt * R;
  w2 = Gp*Gp/(Math.pow(Gp-tau*Gpt,2)/(tau*tau*Gtt)-Gpp)*R*T*1e+3;
  if (w2 < 0.0){w2=0.0;}
  SP.w  = Math.sqrt(w2);

  return 1;
}


export function Gibbs_5(pai, tau, Gibbs){
  var i;
  var J = [];
  var an = [];
  var II = [];
  var JJ = [];
  var bn = [];
  

  var G0 ;
  var Gp ;
  var Gpp;
  var Gt ;
  var Gtt;
  var Gpt;
  
  J[ 1]=  0  ;  an[ 1]=  -0.13179983674201e+2  ;
  J[ 2]=  1  ;  an[ 2]=   0.68540841634434e+1  ;
  J[ 3]= -3  ;  an[ 3]=  -0.24805148933466e-1  ;
  J[ 4]= -2  ;  an[ 4]=   0.36901534980333e+0  ;
  J[ 5]= -1  ;  an[ 5]=  -0.31161318213925e+1  ;
  J[ 6]=  2  ;  an[ 6]=  -0.32961626538917e+0  ;
  
  II[ 1]=  1  ;  JJ[ 1]=  0  ;  bn[ 1]=  -0.12563183589592e-3  ;
  II[ 2]=  1  ;  JJ[ 2]=  1  ;  bn[ 2]=   0.21774678714571e-2  ;
  II[ 3]=  1  ;  JJ[ 3]=  3  ;  bn[ 3]=  -0.45942820899910e-2  ;
  II[ 4]=  2  ;  JJ[ 4]=  9  ;  bn[ 4]=  -0.39724828359569e-5  ;
  II[ 5]=  3  ;  JJ[ 5]=  3  ;  bn[ 5]=   0.12919228289784e-6  ;
 
  
  G0 = 0.0;
  Gp = 0.0;
  Gpp= 0.0;
  Gt = 0.0;
  Gtt= 0.0;
  Gpt= 0.0;

  /*first calculate residual part*/
  for(i=1;i<=5;i++){
    G0 = G0 + bn[i]*Math.pow(pai,II[i])*Math.pow(tau,JJ[i]);
    Gp = Gp + bn[i]*II[i]*Math.pow(pai,II[i]-1)*Math.pow(tau,JJ[i]);
  }
  for(i=4;i<=5;i++){
    Gpp= Gpp + bn[i]*II[i]*(II[i]-1)*Math.pow(pai,II[i]-2)*Math.pow(tau,JJ[i]);
  }
  for(i=2;i<=5;i++){
    Gt = Gt + bn[i]*Math.pow(pai,II[i])*JJ[i]*Math.pow(tau,JJ[i]-1);
    Gpt= Gpt+ bn[i]*II[i]*Math.pow(pai,II[i]-1)*JJ[i]*Math.pow(tau,JJ[i]-1);
  }
  for(i=3;i<=5;i++){
    Gtt= Gtt+ bn[i]*Math.pow(pai,II[i])*JJ[i]*(JJ[i]-1)*Math.pow(tau,JJ[i]-2);
  }

  /*second calculate second term of ideal gas part */
  for(i=1;i<=6;i++){
    G0 = G0 + an[i]*Math.pow(tau,J[i]);
    Gt = Gt + an[i]*J[i]*Math.pow(tau,J[i]-1);
    Gtt= Gtt+ an[i]*J[i]*(J[i]-1)*Math.pow(tau,J[i]-2);
  }

  /*finally add first term of ideal gas part*/
  if(pai<=0.0){
    Gibbs = null;
    return -1;
  }
  else{
    G0 = G0 + Math.log(pai);
    Gp = Gp + 1.0/pai;
    Gpp= Gpp- 1.0/(pai*pai);
  }
  
  Gibbs.G0 =G0;
  Gibbs.Gp =Gp;
  Gibbs.Gpp=Gpp;
  Gibbs.Gt =Gt;
  Gibbs.Gtt=Gtt;
  Gibbs.Gpt=Gpt;

  return 1;
}
