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

  play(mesh: THREE.Mesh){
    if(this.parameter.vector){
      mesh.position.x += this.parameter.vector.x;
      mesh.position.y += this.parameter.vector.y;
      mesh.position.z += this.parameter.vector.z;
    }
    return mesh
  }
 
}


export default GeneEffectMove