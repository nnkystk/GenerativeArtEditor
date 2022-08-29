import GeneEffectParameter from './GeneEffects/GeneEffectParameter';
import GeneModel from './GeneModel'
import GeneGenerator from './GeneGenerator';
import Vector from './Vector'

class GeneModelStorage{

  public storage: Array<GeneModel> = [];

  constructor(){
  }

  getGeneModelById(id: number){
    const targetModel = this.storage.find( (model) => model.id === id );
    if(targetModel){
      return targetModel
    }else{
      return undefined
    }
  }

  setPosition(id: number, position: Vector){
    const targetModel = this.getGeneModelById(id);
    if(targetModel){
      // UI表示用のオブジェクトに反映する
      targetModel.position = position;
      // Meshに反映する
      targetModel.mesh.position.set(position.x, position.y, position.z);
    }
  }

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

  addGeneModel(){
    const mesh      = GeneGenerator.generateMesh();
    const geneModel = GeneGenerator.generateGeneModel(mesh.id, mesh);
    this.storage.push(geneModel);
  }

}

export default GeneModelStorage