//region 1 based on Eq.(7) of IAPWS-IF97
/*
  International Steam Tables pulished from Springer
  2.3.5.6 Backward Equation Ts and Backward Function Ps and x for
  the Techinically important Part of The Two-Phase-Region 4
  for above 5.210 887 825 [kJ/kgK] = s''(623.15 K)
  page 101
*/

"use strict"


  const II = [] // lengthen is 37
  const JJ = [] // lengthen is 37
  const an = [] // lengthen is 37

  II[ 1]= 0; JJ[ 1]= 0;  an[ 1]=  0.179882673606601   ; 
  II[ 2]= 0; JJ[ 2]= 3;  an[ 2]= -0.267507455199603   ; 
  II[ 3]= 0; JJ[ 3]=12;  an[ 3]=  0.116276722612600e+1; 
  II[ 4]= 1; JJ[ 4]= 0;  an[ 4]=  0.147545428713616   ; 
  II[ 5]= 1; JJ[ 5]= 1;  an[ 5]= -0.512871635973248   ; 
  II[ 6]= 1; JJ[ 6]= 2;  an[ 6]=  0.421333567697984   ; 
  II[ 7]= 1; JJ[ 7]= 5;  an[ 7]=  0.563749522189870   ; 
  II[ 8]= 2; JJ[ 8]= 0;  an[ 8]=  0.429274443819153   ; 
  II[ 9]= 2; JJ[ 9]= 5;  an[ 9]= -0.335704552142140e+1; 
  II[10]= 2; JJ[10]= 8;  an[10]=  0.108890916499278e+2; 
  II[11]= 3; JJ[11]= 0;  an[11]= -0.248483390456012   ; 
  II[12]= 3; JJ[12]= 2;  an[12]=  0.304153221906390   ; 
  II[13]= 3; JJ[13]= 3;  an[13]= -0.494819763939905   ; 
  II[14]= 3; JJ[14]= 4;  an[14]=  0.107551674933261e+1; 
  II[15]= 4; JJ[15]= 0;  an[15]=  0.733888415457688e-1; 
  II[16]= 4; JJ[16]= 1;  an[16]=  0.140170545411085e-1; 
  II[17]= 5; JJ[17]= 1;  an[17]= -0.106110975998808   ; 
  II[18]= 5; JJ[18]= 2;  an[18]=  0.168324361811875e-1; 

  II[19]= 5; JJ[19]= 4;  an[19]=  0.125028363714877e+1 ; 
  II[20]= 5; JJ[20]=16;  an[20]=  0.101316840309509e+4 ; 
  II[21]= 6; JJ[21]= 6;  an[21]= -0.151791558000712e+1 ; 
  II[22]= 6; JJ[22]= 8;  an[22]=  0.524277865990866e+2 ; 
  II[23]= 6; JJ[23]=22;  an[23]=  0.230495545563912e+5 ; 
  II[24]= 8; JJ[24]= 1;  an[24]=  0.249459806365456e-1 ; 
  II[25]=10; JJ[25]=20;  an[25]=  0.210796467412137e+7 ; 
  II[26]=10; JJ[26]=36;  an[26]=  0.366836848613065e+9 ; 
  II[27]=12; JJ[27]=24;  an[27]= -0.144814105365163e+9 ; 
  II[28]=14; JJ[28]= 1;  an[28]= -0.179276373003590e-2 ; 
  II[29]=14; JJ[29]=28;  an[29]=  0.489955602100459e+10; 
  II[30]=16; JJ[30]=12;  an[30]=  0.471262212070518e+3 ; 
  II[31]=16; JJ[31]=32;  an[31]= -0.829294390198652e+11; 
  II[32]=18; JJ[32]=14;  an[32]= -0.171545662263191e+4 ; 
  II[33]=18; JJ[33]=22;  an[33]=  0.355777682973575e+7 ; 
  II[34]=18; JJ[34]=36;  an[34]=  0.586062760258436e+12; 
  II[35]=20; JJ[35]=24;  an[35]= -0.129887635078195e+8 ; 
  II[36]=28; JJ[36]=36;  an[36]=  0.317247449371057e+11; 

       

export const Back_4THS = (h, s) => {

  const T_ = 550 //[K] T*
  const h_ = 2800 //[kJ/kg] 
  const s_ = 9.2 //[kJ/(kgK)] 

  const eta0 = 0.119
  const sigma0 = 1.07

  const etaPow = []
  const sigmaPow = []

  const eta = h/h_
  const sigma = s/s_

  const eta1 = eta - eta0
  const sigma1 = sigma - sigma0
  for(let i=1;i<=36;i++){
    etaPow[i] = Math.pow(eta1, II[i])
    sigmaPow[i] = Math.pow(sigma1, JJ[i])
  }

  let theta = 0
  for(let i=1;i<=36;i++){
    theta += an[i] * etaPow[i] * sigmaPow[i] 
  }
  const T = theta * T_

  return T
}

