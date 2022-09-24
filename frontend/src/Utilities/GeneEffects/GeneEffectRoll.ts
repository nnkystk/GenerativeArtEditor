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

  calculate(parameter: GeneEffectParameter): GeneEffectParameter{
    parameter.rotation.x += this.parameter.rotation.x;
    parameter.rotation.y += this.parameter.rotation.y;
    parameter.rotation.z += this.parameter.rotation.z;
    return parameter
  }
 
}


export default GeneEffectRoll