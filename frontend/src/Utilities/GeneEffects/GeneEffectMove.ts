import GeneEffectInterface from './GeneEffectInterface'
import GeneEffectParameter from './GeneEffectParameter'
import { EffectID } from '../GlobalVarriables/EffectCatalog'

class GeneEffectMove implements GeneEffectInterface{
  
  id : EffectID = "MOVE";
  uid: number;
  parameter: GeneEffectParameter;

  constructor(uid: number, parameter: GeneEffectParameter){
    this.uid = uid;
    this.parameter = parameter;
  }

  /**
   * Summary:
   *  本インスタンスにセットされた移動速度をもとに、3Dオブジェクトを平行移動させた場合の移動速度を算出する
   * @param parameter
   * @returns 
   */
  calculate(parameter: GeneEffectParameter): GeneEffectParameter{
    const vector = this.parameter.vector;
    // 移動方向を産出するため、positionではなくvectorを使用する点に注意
    parameter.vector.x = vector.x;
    parameter.vector.y = vector.y;
    parameter.vector.z = vector.z;
    return parameter
  }
 
}


export default GeneEffectMove