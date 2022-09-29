import GeneEffectInterface from './GeneEffectInterface'
import GeneEffectParameter from './GeneEffectParameter'
import { EffectID } from '../GlobalVarriables/EffectCatalog'

class GeneEffectMove implements GeneEffectInterface{
  
  id : EffectID = "MOVE";
  uid: number;
  parameter: GeneEffectParameter;

  /**
   * 
   * @param uid 
   * @param parameter.vector : 移動方向のベクトル
   */
  constructor(uid: number, parameter: GeneEffectParameter){
    this.uid = uid;
    this.parameter = parameter;
  }

  /**
   * Summary:
   *  - 本インスタンスにセットされた移動速度をもとに、3Dオブジェクトを平行移動させた場合の移動速度を算出する
   * Implementation:
   *  - 3Dオブジェクトが現在移動している方向に対して移動速度を加算する。移動方向がマイナスの場合はマイナス方向に加算する。
   * @param parameter
   * @returns 
   */
  calculate(parameter: GeneEffectParameter): GeneEffectParameter{
    const vector = this.parameter.vector;
    parameter.vector.x = (parameter.vector.x >= 0) ? Math.abs(vector.x) : - (Math.abs(vector.x));
    parameter.vector.y = (parameter.vector.y >= 0) ? Math.abs(vector.y) : - (Math.abs(vector.y));
    parameter.vector.z = (parameter.vector.z >= 0) ? Math.abs(vector.z) : - (Math.abs(vector.z));
    return parameter

  }
 
}


export default GeneEffectMove