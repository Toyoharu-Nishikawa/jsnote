/*******************************************************************/
/*viscos(T,rho,mu)
/*  (given T and rho calculate viscosity mu) 
/*conduc(T,rho,lambda)
/*  (given T and rho calculate thermal conductivity lambda)
/*******************************************************************/

"use strict"

export function viscos(SP){
//     input
//         T:   temperature in K
//         rho: density in kg/m^3
//     output
//         mu:  viscosity in Pa-s

//     This subroutine is based on;
//     "Revised Release on The IAPWS Formulation 1985 for the Viscosity
//      of Ordinary Water Substance", September 1997
  var   i;
  var   j;
  var rho;
  var Tast;
  var rhoast;
  var muast;
  var tauR;
  var tauR1;
  var rx;
  var rx1;
  var vis0;
  var x;
  var mu;
  var Hi= [];
  var Hij = [];
  for(i=0;i<6;i++){Hij[i]=[];}
  
  if(SP.v<=0.0||SP.T<=0.0){SP = null;return -1;}
  
  Tast=647.226;
  rhoast=317.763;
  muast = 55.071e-6;
    
  
  Hi[0] =  1.0 ;
  Hi[1] =  0.978197 ;
  Hi[2] =  0.579829 ;
  Hi[3] = -0.202354 ;

  Hij[0][0] =  0.5132047 ;
  Hij[1][0] =  0.3205656 ;
  Hij[2][0] =  0.0 ;
  Hij[3][0] =  0.0 ;
  Hij[4][0] = -0.7782567 ;
  Hij[5][0] =  0.1885447 ;

  Hij[0][1] =  0.2151778 ;
  Hij[1][1] =  0.7317883 ;
  Hij[2][1] =  1.241044 ;
  Hij[3][1] =  1.476783 ;
  Hij[4][1] =  0.0 ;
  Hij[5][1] =  0.0 ;

  Hij[0][2] = -0.2818107 ;
  Hij[1][2] = -1.070786 ;
  Hij[2][2] = -1.263184 ;
  Hij[3][2] =  0.0 ;
  Hij[4][2] =  0.0 ;
  Hij[5][2] =  0.0 ;

  Hij[0][3] =  0.1778064 ;
  Hij[1][3] =  0.4605040 ;
  Hij[2][3] =  0.2340379 ;
  Hij[3][3] = -0.4924179 ;
  Hij[4][3] =  0.0 ;
  Hij[5][3] =  0.0 ;

  Hij[0][4] = -0.04176610 ;
  Hij[1][4] =  0.0 ;
  Hij[2][4] =  0.0 ;
  Hij[3][4] =  0.1600435 ;
  Hij[4][4] =  0.0 ;
  Hij[5][4] =  0.0 ;

  Hij[0][5] =  0.0 ;
  Hij[1][5] = -0.01578386 ;
  Hij[2][5] =  0.0 ;
  Hij[3][5] =  0.0 ;
  Hij[4][5] =  0.0 ;
  Hij[5][5] =  0.0 ;

  Hij[0][6] =  0.0 ;
  Hij[1][6] =  0.0 ;
  Hij[2][6] =  0.0 ;
  Hij[3][6] = -0.003629481 ;
  Hij[4][6] =  0.0 ;
  Hij[5][6] =  0.0 ;  

  tauR =Tast/SP.T;
  tauR1=tauR-1.0;
  rho=1/SP.v;
  rx=rho/rhoast;
  rx1=rx-1.0;
  
  vis0=0.0;
  for(i=0;i<=3;i++){
    vis0=vis0+Hi[i]*Math.pow(tauR,i);
  }
  vis0=Math.sqrt(SP.T/Tast)/vis0;
  
  x=0.0;
  for(i=0;i<=5;i++){
    for(j=0;j<=6;j++){
      x=x+Hij[i][j]*Math.pow(tauR1,i)*Math.pow(rx1,j);
    }
  }
  
  mu=vis0*Math.exp(rx*x);
  mu=mu*muast;
  SP.mu=mu;
  
  return 1;
}

export function conduc(SP){
//     input
//          T: temperature in K
//          rho: density in kg/m^3
//     output
//          lambda: thermal conductivity in W/(m-K)

//     This subroutine is based on;
//     "Revised Release on The IAPS Formulation 1985 for the Thermal
//      Conductivity of Ordinary Water Substance", September 1998
  var i;
  var T;
  var rho;
  var lambda;

  var Tast;
  var rhoast;

  var B1;
  var B2;
  var C1;
  var C2;
  var C3;
  var C4;
  var C5;
  var C6;

  var a = [];
  var b = [];
  var d = [];

  var tau;
  var tauR;
  var rx;
  var con0;
  var con1;
  var deltaT;
  var Q;
  var R;
  var S;
  
  var con21;
  var con22;
  var con23;
  
  if(SP.v<=0.0||SP.T<=0.0){SP = null;return -1;}

  T=SP.T;
  rho=1/SP.v;
  
  Tast=647.26;
  rhoast=317.7;
    
  B1   = -0.171587e+0  ;
  B2   =  2.392190e+0  ;
  C1   =  0.642857e+0  ;
  C2   = -4.11717e+0   ;
  C3   = -6.17937e+0   ;
  C4   =  0.00308976e+0;
  C5   =  0.0822994e+0 ;
  C6   = 10.0932e+0    ;

  a[0] =  1.02811e-2   ;
  a[1] =  2.99621e-2   ;
  a[2] =  1.56146e-2   ;
  a[3] = -4.22464e-3   ;

  b[0] = -3.97070e-1   ;
  b[1] =  4.00302e-1   ;
  b[2] =  1.06e+0      ;

  d[1] =  7.01309e-2   ;
  d[2] =  1.1852e-2    ;
  d[3] =  1.69937e-3   ;
  d[4] = -1.020e+0     ;

  tau=T/Tast;
  tauR=Tast/T;
  rx=rho/rhoast;
  
  con0=0.0;
  for(i=0;i<=3;i++){
    con0=con0+a[i]*Math.pow(tau,i);
  }
  con0=Math.sqrt(tau)*con0;
  con1=b[0]+b[1]*rx+b[2]*Math.exp(B1*(rx+B2)*(rx+B2));
  
  deltaT=Math.abs(tau-1.0)+C4;
  Q=2.0+C5/Math.pow(deltaT,0.6);
  R=Q+1.0;
  if(tau>=1.0){
    S=1.0/deltaT;
  }
  else{
    S=C6/Math.pow(deltaT,0.6);
  }
  
  con21=(d[1]*Math.pow(tauR,10)+d[2])*Math.pow(rx,1.8)*Math.exp(C1*(1.0-Math.pow(rx,2.8)));
  con22=d[3]*S*Math.pow(rx,Q)*Math.exp(Q/R*(1.0-Math.pow(rx,R)));
  con23=d[4]*Math.exp(C2*Math.pow(tau,1.5)+C3/Math.pow(rx,5));
  
  lambda=con0+con1+con21+con22+con23;
  SP.lambda=lambda;
  
  return 1;
}
    
