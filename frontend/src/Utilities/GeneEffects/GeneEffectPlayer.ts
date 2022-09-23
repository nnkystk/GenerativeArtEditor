import GeneModel from '../GeneModel/GeneModel'
import MeshStorage from '../Mesh/MeshStorage';

class GeneEffectPlayer{

  static play(meshStorage: MeshStorage, geneModel: GeneModel){

    /**
     *  Summary: 
     *    GeneModelに登録されたEffectを発火させる。
     *    その後、任意でEffectによる変更をStateに反映させる
     * @param   { GeneModel } geneModel: Effectを発火する対象オブジェクト
     * @return  void
     */

    geneModel.effectStorage.storage.map( (effect) => {
      const targetMesh = meshStorage.getMeshById(geneModel.id);
      if(targetMesh){
        effect.play(targetMesh.mesh);
      }
    })

  }

  constructor() {
  }

}

export default GeneEffectPlayer