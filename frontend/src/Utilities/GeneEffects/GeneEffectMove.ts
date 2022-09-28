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

  calculate(parameter: GeneEffectParameter): GeneEffectParameter{
    // 移動方向を産出するため、positionではなくvectorを使用する点に注意
    parameter.vector.x += this.parameter.vector.x;
    parameter.vector.y += this.parameter.vector.y;
    parameter.vector.z += this.parameter.vector.z;

    // !!! 仮置き 移動後のポジションの座標を算出する !!!
    parameter.position.x += this.parameter.vector.x;
    parameter.position.y += this.parameter.vector.y;
    parameter.position.z += this.parameter.vector.z;
    
    return parameter
  }
 
}


export default GeneEffectMove