import GeneEffectInterface from './GeneEffectInterface'
import GeneEffectParameter from './GeneEffectParameter'
import { EffectID } from '../GlobalVarriables/EffectCatalog'

class GeneReflectOnBound implements GeneEffectInterface{
  /** Summary
   *    描画範囲外に出た際に動作方向を反射させる
   */
  
  id : EffectID = "REFLECT_ON_BOUND";
  uid: number;
  parameter: GeneEffectParameter;

  constructor(uid: number, parameter: GeneEffectParameter){
    this.uid = uid;
    this.parameter = parameter;
  }

  calculate(parameter: GeneEffectParameter): GeneEffectParameter{
    parameter.vector.x = this.parameter.vector.x;
    parameter.vector.y = this.parameter.vector.y;
    parameter.vector.z = this.parameter.vector.z;
    return parameter
  }
 
}


export default GeneReflectOnBound