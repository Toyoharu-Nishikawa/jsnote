import {satproT} from "./satproT.js" 


const Ia = []
const an = []

 Ia[ 1] = 0;  an[ 1] =  2.7316038664298157  ;
 Ia[ 2] = 1;  an[ 2] =  3.360282439156663   ;
 Ia[ 3] = 2;  an[ 3] = -0.39062750916222777 ;
 Ia[ 4] = 3;  an[ 4] =  21.785889537801616  ;
 Ia[ 5] = 4;  an[ 5] = -93.12884913196679   ;
 Ia[ 6] = 5;  an[ 6] =  225.0409277525414   ;
 Ia[ 7] = 6;  an[ 7] = -305.232841092149    ;
 Ia[ 8] = 7;  an[ 8] =  219.8411824591425   ;
 Ia[ 9] = 8;  an[ 9] = -78.89688329281434   ;
 Ia[10] = 9;  an[10] =  11.143543613059302  ;

const Ib = []
const bn = []

 Ib[ 1] = 0;  bn[ 1] =  -23848681.716905195 ;
 Ib[ 2] = 1;  bn[ 2] =   240673104.90903345  ;
 Ib[ 3] = 2;  bn[ 3] =  -1078501853.8047779 ;
 Ib[ 4] = 3;  bn[ 4] =   2816739381.715979   ;
 Ib[ 5] = 4;  bn[ 5] =  -4725044882.92391   ;
 Ib[ 6] = 5;  bn[ 6] =   5279549005.222743   ;
 Ib[ 7] = 6;  bn[ 7] =  -3929375771.904755  ;
 Ib[ 8] = 7;  bn[ 8] =   1878436208.5168288  ;
 Ib[ 9] = 8;  bn[ 9] =  -523386666.31915474 ;
 Ib[10] = 9;  bn[10] =   64760162.6688479    ;


const Tguess = (s) => {
  const s_ = 5
  const T_ = 100

  const sigma = s/s_
  if(s<4.037801221789984 || 4.900974052144227<s){
    let theta = 0
    for(let i=1;i<=10;i++){
      theta += an[i] * Math.pow(sigma, Ia[i])
    }
    const T = theta * T_
    return T
  }
  else{
    let theta = 0
    for(let i=1;i<=10;i++){
      theta += bn[i] * Math.pow(sigma, Ib[i])
    }
    const T = theta * T_
    return T
  }
}


export const ZsatS = (s) => {
//     input:  S: entropy in kJ/kgK
//     output: properties on the saturation line
//             p: pressure in MPa
//             t: temperature in K
//             h: enthalpy in kJ/kg
  const sc = 4.41202148223476 // [kJ/kgK] critical specific entropy

  const Tini = Tguess(s)

  let dt=0.01
  //let T1 = 273.16 //start from triple povar
  let T1 = Tini //start from triple povar
  let state = satproT(T1)
  let s1 = s > sc ? state.g.s: state.l.s
  const sini = s1
  let Flag = 0
  let T2
  let s2
  let del

  for(let n=1;n<=20;n++){
    T2 = T1 + dt
    T2 = T2 > 647.096 ? 647.096 : T2
    state = satproT(T2)
    s2 = s > sc ? state.g.s: state.l.s
    del = s - s2
    if(Math.abs(del)<=1.0E-9){
      Flag=1
      break
    }
    dt = del * dt / (s2 - s1)
    T1 = T2
    s1 = s2
  }
  if(Flag==0){
    T1 = 647.096
    T2 = T2 -0.001
    let Tm 
    for(let n=1;n<=20;n++){
      Tm = (T1+T2)/2
      state = satproT(Tm)
      s2 = s > sc ? state.g.s: state.l.s
      del = s - s2
      
      if(Math.abs(del)<=1.0E-6){
        Flag=1
        break
      }
      if(s>sc){
        if(del>0){T1=Tm}
        else{T2=Tm}
      }
      else{
        if(del>0){T2=Tm}
        else{T1=Tm}
      }
    }
 }
 if(Flag==0 && (sc-0.01)<s && s<(sc+0.01)){
   if(Math.abs(del)<1E-3){
             Flag=1
   }
 }
 if(Flag==0){
   const msg = "function ZsatS did not converg in satproS.js " + `s = ${s}`
   throw new RangeError(msg)
 }
 


  const state_ = s > sc ? state.g: state.l

  return state_
}

