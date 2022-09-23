import Vector from '../GlobalVarriables/Vector'
import HexadecimalColor from '../GlobalVarriables/HexadecimalColor'

class MeshStorage{

  public storage: { [ id: number ]: THREE.Mesh } = {};

  constructor(){
  }


  getMeshById(id: number){
    // const targetModel = this.storage.find( (model) => model.id === id );
    const targetMesh = this.storage[id];
    if(targetMesh){
      return targetMesh
    }else{
      return undefined
    }
  }
  /**
  setEffectParameter(modelID: number, effectUID: number, paramerer: GeneEffectParameter){
    const targetModel = this.getGeneModelById(modelID);
    if(targetModel){
      const targetEffect = targetModel.effectList.find( (effect) => effect.uid == effectUID );
      if(targetEffect){
        targetEffect.parameter = paramerer;
      }else{
        console.log('Effect is not found')
      }
    }else{
      console.log('Model is not found')
    }
  }
   */

  store(id: number, mesh: THREE.Mesh){
    this.storage[id] = mesh;
  }

  setPosition(id:number, position: Vector){
    const targetMesh = this.getMeshById(id);
    if(targetMesh){
      targetMesh.position.set(position.x, position.y, position.z);
    }
  }

  setScale(id:number, scale: Vector){
    const targetMesh = this.getMeshById(id);
    if(targetMesh){
      targetMesh.scale.set(scale.x, scale.y, scale.z);
    }
  }

  setColor(id:number, color: HexadecimalColor){
    const targetMesh = this.getMeshById(id);
    if(targetMesh){
      {/* @ts-ignore */} // meshにセットされるmaterialインスタンスがcolorプロパティを持たない可能性がありts検査エラーが発生する。
      targetMesh.material.color.setHex("0x" + color.r + color.g + color.b);
    }
  }

}

export default MeshStorage