
//backward functon Eq. (2.49) for region 3a on the page 91 in International Steam Tables pulished from Springer
//backward functon Eq. (2.50) for region 3b on the page 92 in International Steam Tables pulished from Springer
//backward functon Eq. (2.51) for region 3b on the page 92 in International Steam Tables pulished from Springer

//2a
//Table 2.82
  const Ia = [] // lengthen is 30
  const Ja = [] // lengthen is 30
  const na = [] // lengthen is 30

  Ia[ 1]= 0;   Ja[ 1]=  1;   na[ 1]= -0.182575361923032e-1; 
  Ia[ 2]= 0;   Ja[ 2]=  3;   na[ 2]= -0.125229548799536   ; 
  Ia[ 3]= 0;   Ja[ 3]=  6;   na[ 3]=  0.592290437320145   ; 
  Ia[ 4]= 0;   Ja[ 4]= 16;   na[ 4]=  0.604769706185122e+1; 
  Ia[ 5]= 0;   Ja[ 5]= 20;   na[ 5]=  0.238624965444474e+3; 
  Ia[ 6]= 0;   Ja[ 6]= 22;   na[ 6]= -0.298639090222922e+3; 
  Ia[ 7]= 1;   Ja[ 7]=  0;   na[ 7]=  0.512250813040750e-1; 
  Ia[ 8]= 1;   Ja[ 8]=  1;   na[ 8]= -0.437266515606486   ; 
  Ia[ 9]= 1;   Ja[ 9]=  2;   na[ 9]=  0.413336902999504   ; 
  Ia[10]= 1;   Ja[10]=  3;   na[10]= -0.516468254574773e+1; 
  Ia[11]= 1;   Ja[11]=  5;   na[11]= -0.557014838445711e+1; 
  Ia[12]= 1;   Ja[12]=  6;   na[12]=  0.128555037824478e+2; 
  Ia[13]= 1;   Ja[13]= 10;   na[13]=  0.114144108953290e+2; 
  Ia[14]= 1;   Ja[14]= 16;   na[14]= -0.119504225652714e+3; 
  Ia[15]= 1;   Ja[15]= 20;   na[15]= -0.284777985961560e+4; 
  Ia[16]= 1;   Ja[16]= 22;   na[16]=  0.431757846408006e+4; 
  Ia[17]= 2;   Ja[17]=  3;   na[17]=  0.112894040802650e+1; 
  Ia[18]= 2;   Ja[18]= 16;   na[18]=  0.197409186206319e+4; 
  Ia[19]= 2;   Ja[19]= 20;   na[19]=  0.151612444706087e+4; 
  Ia[20]= 3;   Ja[20]=  0;   na[20]=  0.141324451421235e-1; 
  Ia[21]= 3;   Ja[21]=  2;   na[21]=  0.585501282219601   ; 
  Ia[22]= 3;   Ja[22]=  3;   na[22]= -0.297258075863012e+1; 
  Ia[23]= 3;   Ja[23]=  6;   na[23]=  0.594567314847319e+1; 
  Ia[24]= 3;   Ja[24]= 16;   na[24]= -0.623656565798905e+4; 
  Ia[25]= 4;   Ja[25]= 16;   na[25]=  0.965986235133332e+4; 
  Ia[26]= 5;   Ja[26]=  3;   na[26]=  0.681500934948134e+1; 
  Ia[27]= 5;   Ja[27]= 16;   na[27]= -0.633207286824489e+4; 
  Ia[28]= 6;   Ja[28]=  3;   na[28]= -0.558919224465760e+1; 
  Ia[29]= 7;   Ja[29]=  1;   na[29]=  0.400645798472063e-1; 





//2b
  const Ib = [] // lengthen is 34
  const Jb = [] // lengthen is 34
  const nb = [] // lengthen is 34

  Ib[ 1]=  0;   Jb[ 1]=  0;   nb[ 1]=  0.801496989929495e-1 ; 
  Ib[ 2]=  0;   Jb[ 2]=  1;   nb[ 2]= -0.543862807146111    ; 
  Ib[ 3]=  0;   Jb[ 3]=  2;   nb[ 3]=  0.337455597421283    ; 
  Ib[ 4]=  0;   Jb[ 4]=  4;   nb[ 4]=  0.890555451157450e+1 ; 
  Ib[ 5]=  0;   Jb[ 5]=  8;   nb[ 5]=  0.313840736431485e+3 ; 
  Ib[ 6]=  1;   Jb[ 6]=  0;   nb[ 6]=  0.797367065977789    ; 
  Ib[ 7]=  1;   Jb[ 7]=  1;   nb[ 7]= -0.121616973556240e+1 ; 
  Ib[ 8]=  1;   Jb[ 8]=  2;   nb[ 8]=  0.872803386937477e+1 ; 
  Ib[ 9]=  1;   Jb[ 9]=  3;   nb[ 9]= -0.169769781757602e+2 ; 
  Ib[10]=  1;   Jb[10]=  5;   nb[10]= -0.186552827328416e+3 ; 
  Ib[11]=  1;   Jb[11]= 12;   nb[11]=  0.951159274344237e+5 ; 
  Ib[12]=  2;   Jb[12]=  1;   nb[12]= -0.189168510120494e+2 ; 
  Ib[13]=  2;   Jb[13]=  6;   nb[13]= -0.433407037194840e+4 ; 
  Ib[14]=  2;   Jb[14]= 18;   nb[14]=  0.543212633012715e+9 ; 
  Ib[15]=  3;   Jb[15]=  0;   nb[15]=  0.144793408386013    ; 
  Ib[16]=  3;   Jb[16]=  1;   nb[16]=  0.128024559637516e+3 ; 
  Ib[17]=  3;   Jb[17]=  7;   nb[17]= -0.672309534071268e+5 ; 
  Ib[18]=  3;   Jb[18]= 12;   nb[18]=  0.336972380095287e+8 ; 
  Ib[19]=  4;   Jb[19]=  1;   nb[19]= -0.586634196762720e+3 ; 
  Ib[20]=  4;   Jb[20]= 16;   nb[20]= -0.221403224769889e+11; 
  Ib[21]=  5;   Jb[21]=  1;   nb[21]=  0.171606668708389e+4 ; 
  Ib[22]=  5;   Jb[22]= 12;   nb[22]= -0.570817595806302e+9 ; 
  Ib[23]=  6;   Jb[23]=  1;   nb[23]= -0.312109693178482e+4 ; 
  Ib[24]=  6;   Jb[24]=  8;   nb[24]= -0.207841384633010e+7 ; 
  Ib[25]=  6;   Jb[25]= 18;   nb[25]=  0.305605946157786e+13; 
  Ib[26]=  7;   Jb[26]=  1;   nb[26]=  0.322157004314333e+4 ; 
  Ib[27]=  7;   Jb[27]= 16;   nb[27]=  0.326810259797295e+12; 
  Ib[28]=  8;   Jb[28]=  1;   nb[28]= -0.144104158934487e+4 ; 
  Ib[29]=  8;   Jb[29]=  3;   nb[29]=  0.410694867802691e+3 ; 
  Ib[30]=  8;   Jb[30]= 14;   nb[30]=  0.109077066873024e+12; 
  Ib[31]=  8;   Jb[31]= 18;   nb[31]= -0.247964654258893e+14; 
  Ib[32]= 12;   Jb[32]= 10;   nb[32]=  0.188801906865134e+10; 
  Ib[33]= 14;   Jb[33]= 16;   nb[33]= -0.123651009018773e+15;



//2C
  const Ic = [] // lengthen is 34
  const Jc = [] // lengthen is 34
  const nc = [] // lengthen is 34

  Ic[ 1]=  0;   Jc[ 1]=  0;   nc[ 1]=  0.112225607199012    ; 
  Ic[ 2]=  0;   Jc[ 2]=  1;   nc[ 2]= -0.339005953606712e+1 ; 
  Ic[ 3]=  0;   Jc[ 3]=  2;   nc[ 3]= -0.320503911730094e+2 ; 
  Ic[ 4]=  0;   Jc[ 4]=  3;   nc[ 4]= -0.197597305104900e+3 ; 
  Ic[ 5]=  0;   Jc[ 5]=  4;   nc[ 5]= -0.407693861553446e+3 ; 
  Ic[ 6]=  0;   Jc[ 6]=  8;   nc[ 6]=  0.132943775222331e+5 ; 
  Ic[ 7]=  1;   Jc[ 7]=  0;   nc[ 7]=  0.170846839774007e+1 ; 
  Ic[ 8]=  1;   Jc[ 8]=  2;   nc[ 8]=  0.373694198142245e+2 ; 
  Ic[ 9]=  1;   Jc[ 9]=  5;   nc[ 9]=  0.358144365815434e+4 ; 
  Ic[10]=  1;   Jc[10]=  8;   nc[10]=  0.423014446424664e+6 ; 
  Ic[11]=  1;   Jc[11]= 14;   nc[11]= -0.751071025760063e+9 ; 
  Ic[12]=  2;   Jc[12]=  2;   nc[12]=  0.523446127607898e+2 ; 
  Ic[13]=  2;   Jc[13]=  3;   nc[13]= -0.228351290812417e+3 ; 
  Ic[14]=  2;   Jc[14]=  7;   nc[14]= -0.960652417056937e+6 ; 
  Ic[15]=  2;   Jc[15]= 10;   nc[15]= -0.807059292526074e+8 ; 
  Ic[16]=  2;   Jc[16]= 18;   nc[16]=  0.162698017225669e+13; 
  Ic[17]=  3;   Jc[17]=  0;   nc[17]=  0.772465073604171    ; 
  Ic[18]=  3;   Jc[18]=  5;   nc[18]=  0.463929973837746e+5 ; 
  Ic[19]=  3;   Jc[19]=  8;   nc[19]= -0.137317885134128e+8 ; 
  Ic[20]=  3;   Jc[20]= 16;   nc[20]=  0.170470392630512e+13; 
  Ic[21]=  3;   Jc[21]= 18;   nc[21]= -0.251104628187308e+14; 
  Ic[22]=  4;   Jc[22]= 18;   nc[22]=  0.317748830835520e+14; 
  Ic[23]=  5;   Jc[23]=  1;   nc[23]=  0.538685623675312e+2 ; 
  Ic[24]=  5;   Jc[24]=  4;   nc[24]= -0.553089094625169e+5 ; 
  Ic[25]=  5;   Jc[25]=  6;   nc[25]= -0.102861522421405e+7 ; 
  Ic[26]=  5;   Jc[26]= 14;   nc[26]=  0.204249418756234e+13; 
  Ic[27]=  6;   Jc[27]=  8;   nc[27]=  0.273918446626977e+9 ; 
  Ic[28]=  6;   Jc[28]= 18;   nc[28]= -0.263963146312685e+16; 
  Ic[29]= 10;   Jc[29]=  7;   nc[29]= -0.107890854108088e+10; 
  Ic[30]= 12;   Jc[30]=  7;   nc[30]= -0.296492620980124e+11; 
  Ic[31]= 16;   Jc[31]= 10;   nc[31]= -0.111754907323424e+16; 


export const Back_2PHSa = (h, s) => {

  const P_ = 4 //[MPa] T*
  const h_ = 4200 //[kJ/kg] 
  const s_ = 12 //[kJ/(kgK)] 

  const eta0 =0.5 
  const sigma0 = 1.2 

  const etaPow = []
  const sigmaPow = []

  const eta = h/h_
  const sigma = s/s_

  const eta1 = eta - eta0
  const sigma1 = sigma - sigma0

  for(let i=1;i<=29;i++){
    etaPow[i] = Math.pow(eta1, Ia[i])
    sigmaPow[i] = Math.pow(sigma1, Ja[i])
  }

  let pai = 0
  for(let i=1;i<=29;i++){
    pai += na[i] * etaPow[i] * sigmaPow[i] 
  }
  const P = pai**4 * P_

  return P 
}

export const Back_2PHSb = (h, s) => {

  const P_ = 100 //[MPa] T*
  const h_ = 4100 //[kJ/kg] 
  const s_ = 7.9 //[kJ/(kgK)] 

  const eta0 =0.6 
  const sigma0 = 1.01

  const etaPow = []
  const sigmaPow = []

  const eta = h/h_
  const sigma = s/s_

  const eta1 = eta - eta0
  const sigma1 = sigma - sigma0

  for(let i=1;i<=33;i++){
    etaPow[i] = Math.pow(eta1, Ib[i])
    sigmaPow[i] = Math.pow(sigma1, Jb[i])
  }

  let pai = 0
  for(let i=1;i<=33;i++){
    pai += nb[i] * etaPow[i] * sigmaPow[i] 
  }
  const P = pai**4 * P_

  return P 
}

export const Back_2PHSc = (h, s) => {

  const P_ = 100 //[MPa] T*
  const h_ = 3500 //[kJ/kg] 
  const s_ = 5.9 //[kJ/(kgK)] 

  const eta0 =0.7
  const sigma0 = 1.1

  const etaPow = []
  const sigmaPow = []

  const eta = h/h_
  const sigma = s/s_

  const eta1 = eta - eta0
  const sigma1 = sigma - sigma0

  for(let i=1;i<=31;i++){
    etaPow[i] = Math.pow(eta1, Ic[i])
    sigmaPow[i] = Math.pow(sigma1, Jc[i])
  }

  let pai = 0
  for(let i=1;i<=31;i++){
    pai += nc[i] * etaPow[i] * sigmaPow[i] 
  }
  const P = pai**4 * P_

  return P 
}

