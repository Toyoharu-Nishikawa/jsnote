//backward functon Eq. (2.45) page85 in International Steam Tables pulished from Springer

//Table2.75
  const I = [] // lengthen is 20 
  const J = [] // lengthen is 20
  const n = [] // lengthen is 20

  I[ 1]= 0;   J[ 1]= 0;   n[ 1]= -0.691997014660582   ; 
  I[ 2]= 0;   J[ 2]= 1;   n[ 2]= -0.183612548787560e+2; 
  I[ 3]= 0;   J[ 3]= 2;   n[ 3]= -0.928332409297335e+1; 
  I[ 4]= 0;   J[ 4]= 4;   n[ 4]=  0.659639569909906e+2; 
  I[ 5]= 0;   J[ 5]= 5;   n[ 5]= -0.162060388912024e+2; 
  I[ 6]= 0;   J[ 6]= 6;   n[ 6]=  0.450620017338667e+3; 
  I[ 7]= 0;   J[ 7]= 8;   n[ 7]=  0.854680678224170e+3; 
  I[ 8]= 0;   J[ 8]=14;   n[ 8]=  0.607523214001162e+4; 
  I[ 9]= 1;   J[ 9]= 0;   n[ 9]=  0.326487682621856e+2; 
  I[10]= 1;   J[10]= 1;   n[10]= -0.269408844582931e+2; 
  I[11]= 1;   J[11]= 4;   n[11]= -0.319947848334300e+3; 
  I[12]= 1;   J[12]= 6;   n[12]= -0.928354307043320e+3; 
  I[13]= 2;   J[13]= 0;   n[13]=  0.303634537455249e+2; 
  I[14]= 2;   J[14]= 1;   n[14]= -0.650540422444146e+2; 
  I[15]= 2;   J[15]=10;   n[15]= -0.430991316516130e+4; 
  I[16]= 3;   J[16]= 4;   n[16]= -0.747512324096068e+3; 
  I[17]= 4;   J[17]= 1;   n[17]=  0.730000345529245e+3; 
  I[18]= 4;   J[18]= 4;   n[18]=  0.114284032569021e+4; 
  I[19]= 5;   J[19]= 0;   n[19]= -0.436407041874559e+3; 


export const Back_1PHS = (h, s) => {

  const P_ = 100 //[MPa] T*
  const h_ = 3400 //[kJ/kg] 
  const s_ = 7.6 //[kJ/(kgK)] 

  const eta0 = 0.05
  const sigma0 = 0.05 

  const etaPow = []
  const sigmaPow = []

  const eta = h/h_
  const sigma = s/s_

  const eta1 = eta + eta0
  const sigma1 = sigma + sigma0

  for(let i=1;i<=19;i++){
    etaPow[i] = Math.pow(eta1, I[i])
    sigmaPow[i] = Math.pow(sigma1, J[i])
  }

  let pai = 0
  for(let i=1;i<=19;i++){
    pai += n[i] * etaPow[i] * sigmaPow[i] 
  }
  const P = pai * P_

  return P 
}


