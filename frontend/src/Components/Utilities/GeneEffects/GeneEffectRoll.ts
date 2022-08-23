import GeneEffectInterface from './GeneEffectInterface'
import GeneModel from '../GeneModel';


type Vector = { x: number, y: number, z: number }
class GeneEffectRoll implements GeneEffectInterface{
  
  public id : string = "ROLL";
  public uid: string;
  public parameters: Vector;

  constructor(uid:string, vector?: Vector){
    this.uid = uid;
    const DEFAULT_VECTOR = { x: 1, y: 0, z: 0 }
    this.parameters = vector?       // 引数が渡された場合はその引数をセットする。渡されない場合はデフォルト値をセットする
      { "x": vector.x, "y": vector.y, "z": vector.z }:
      { "x": DEFAULT_VECTOR.x, "y": DEFAULT_VECTOR.y, "z": DEFAULT_VECTOR.z } 
  }

  play(mesh: THREE.Mesh){
    mesh.rotation.x += this.parameters.x;
    mesh.rotation.y += this.parameters.y;
    mesh.rotation.z += this.parameters.z;
    return mesh
  }
 
}


export default GeneEffectRoll