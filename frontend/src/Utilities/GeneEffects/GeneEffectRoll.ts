import GeneEffectInterface from './GeneEffectInterface'
import GeneEffectParameter from './GeneEffectParameter'
import { EffectID } from '../GlobalVarriables/EffectCatalog'

class GeneEffectRoll implements GeneEffectInterface{
  
  id : EffectID = "ROLL";
  uid: number;
  parameter: GeneEffectParameter;

  constructor(uid: number, parameter: GeneEffectParameter){
    this.uid = uid;
    this.parameter = parameter;
  }

  /**
   * Summary:
   *  本インスタンスにセットされた回転速度をもとに、3Dオブジェクトを回転させた場合の回転速度を算出する
   * @param parameter 
   * @returns 
   */
  calculate(parameter: GeneEffectParameter): GeneEffectParameter{
    const rotation = this.parameter.rotation;
    parameter.rotation.x = rotation.x;
    parameter.rotation.y = rotation.y;
    parameter.rotation.z = rotation.z;
    return parameter
  }
 
}


export default GeneEffectRoll