import Vector from '../GlobalVarriables/Vector'
import HexadecimalColor from '../GlobalVarriables/HexadecimalColor'
import MeshModel from './MeshModel';

class MeshStorage{

  public storage: Array<MeshModel> = [];

  constructor(){
  }

  getMeshById(id: number){
    const targetMeshModel = this.storage.find( (model) => model.id === id );
    if(targetMeshModel){
      return targetMeshModel
    }else{
      return undefined
    }
  }

  store(meshModel: MeshModel){
    this.storage.push(meshModel);
  }

  setPosition(id:number, position: Vector){
    const targetMeshModel = this.getMeshById(id);
    if(targetMeshModel){
      targetMeshModel.mesh.position.set(position.x, position.y, position.z);
    }
  }

  setScale(id:number, scale: Vector){
    const targetMeshModel = this.getMeshById(id);
    if(targetMeshModel){
      targetMeshModel.mesh.scale.set(scale.x, scale.y, scale.z);
    }
  }

  setColor(id:number, color: HexadecimalColor){
    const targetMeshModel = this.getMeshById(id);
    if(targetMeshModel){
      {/* @ts-ignore */} // meshにセットされるmaterialインスタンスがcolorプロパティを持たない可能性がありts検査エラーが発生する。
      targetMeshModel.mesh.material.color.setHex("0x" + color.r + color.g + color.b);
    }
  }

}

export default MeshStorage