import GeneEffectInterface from './GeneEffectInterface'
import GeneEffectParameter from './GeneEffectParameter'

type Vector = { x: number, y: number, z: number }
class GeneEffectRoll implements GeneEffectInterface{
  
  id : string = "ROLL";
  uid: string;
  parameter: GeneEffectParameter;

  constructor(uid: string, parameter: GeneEffectParameter){
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