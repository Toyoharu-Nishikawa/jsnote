//import {region_1}          from './IF97_1.js'
//import {region_2}          from './IF97_2.js'
//import {region_3}          from './IF97_3.js'
//import {region_5}          from './IF97_5.js'
//import {PsatT,TsatP}       from './IF97_Sat.js'
//import {ZPH_1,ZPS_1}       from './Aux_1.js'
//import {ZPH_2,ZPS_2}       from './Aux_2.js'
//import {ZHS_2}             from './Aux_2HS.js'
//import {VPT_30}            from './Aux_3.js'
//import {ZPH_5,ZPS_5}       from './Aux_5.js'
//import {RegPT}             from './Reg_pt.js'
//import {RegPH}             from './Reg_ph.js'
//import {RegPS}             from './Reg_ps.js'
//import {expisen1,expisen2} from './expisen.js'
//import {satproP} from './satproP.js'
//import {satproT} from './satproT.js'
//import {propPT} from './propPT.js'
//import {propPH} from './propPH.js'
//import {propPS} from './propPS.js'
//import {propHS} from './propHS.js'
//import {viscos, conduc} from './transp.js'
//import {transPT} from './transPT.js'
//import {transatT} from './transatT.js'
//import {transatP} from './transatP.js'

import * as if97 from "./index.js"

var T = 500;
var P =16;
var SPl = {}
var SPg = {}
var SP= {
  P: 10,  
  T: 300, 
};

const a = if97.SATp2all(P)
console.log(a)

