//Table 2.73
  const Ia = [] // lengthen is 34
  const Ja = [] // lengthen is 34
  const na = [] // lengthen is 34

  Ia[ 1]=  0;   Ja[ 1]=   0;   na[ 1]=  0.913965547600543    ; 
  Ia[ 2]=  1;   Ja[ 2]=  -2;   na[ 2]= -0.430944856041991e-4 ; 
  Ia[ 3]=  1;   Ja[ 3]=   2;   na[ 3]=  0.603235694765419e+2 ; 
  Ia[ 4]=  3;   Ja[ 4]= -12;   na[ 4]=  0.117518273082168e-17; 
  Ia[ 5]=  5;   Ja[ 5]=  -4;   na[ 5]=  0.220000904781292    ; 
  Ia[ 6]=  6;   Ja[ 6]=  -3;   na[ 6]= -0.690815545851641e+2 ; 
 
export const HB13 = (s) => {

  const h_ = 1700 //[kJ/kg] 
  const s_ = 3.8 //[kJ/(kgK)] 

  const sigmaA = 0.884 
  const sigmaB = 0.864 

  const etaPow = []
  const sigmaPow = []

  const sigma = s/s_

  const sigma0 = sigma - sigmaA 
  const sigma1 = sigma - sigmaB

  for(let i=1;i<=6;i++){
    etaPow[i] = Math.pow(sigma0, Ia[i])
    sigmaPow[i] = Math.pow(sigma1, Ja[i])
  }

  let eta = 0
  for(let i=1;i<=6;i++){
    eta += na[i] * etaPow[i] * sigmaPow[i] 
  }
  const h = eta * h_

  return h
}

