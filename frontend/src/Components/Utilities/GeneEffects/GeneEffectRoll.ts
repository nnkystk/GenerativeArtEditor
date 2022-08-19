import GeneEffectInterface from '../GeneEffectInterface'
import GeneModel from '../GeneModel';


type Vector = { x: number, y: number, z: number }
class GeneEffectRoll implements GeneEffectInterface{
  
  id = "ROLL";
  private _vector: Vector = { x: 1, y: 0, z: 0};

  constructor(vector: Vector){
    this._vector = vector;
  }

  play(mesh: THREE.Mesh){
    mesh.rotation.x += this._vector.x;
    mesh.rotation.y += this._vector.y;
    mesh.rotation.z += this._vector.z;
    return mesh
  }

  get vector(){
    return this._vector;
  }

  set vector(vector: Vector){
    this._vector = vector;
  }
  
}


export default GeneEffectRoll