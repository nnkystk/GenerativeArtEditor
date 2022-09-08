import GeneEffectInterface from './GeneEffectInterface'
import GeneEffectParameter from './GeneEffectParameter'
import EffectID from '../GlobalVarriables/EffectID'

class GeneEffectRoll implements GeneEffectInterface{
  
  id : EffectID = "ROLL";
  uid: number;
  parameter: GeneEffectParameter;

  constructor(uid: number, parameter: GeneEffectParameter){
    this.uid = uid;
    this.parameter = parameter;
  }

  play(mesh: THREE.Mesh){
    if(this.parameter.vector){
      mesh.rotation.x += this.parameter.vector.x;
      mesh.rotation.y += this.parameter.vector.y;
      mesh.rotation.z += this.parameter.vector.z;
    }
    return mesh
  }
 
}


export default GeneEffectRoll