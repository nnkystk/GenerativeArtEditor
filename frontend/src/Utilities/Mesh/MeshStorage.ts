class MeshStorage{

  public storage: { [ id: number ]: THREE.Mesh } = {};

  constructor(){
  }

  /**
  getGeneModelById(id: number){
    const targetModel = this.storage.find( (model) => model.id === id );
    if(targetModel){
      return targetModel
    }else{
      return undefined
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
   */

  store(id: number, mesh: THREE.Mesh){
    this.storage[id] = mesh;
  }

}

export default MeshStorage