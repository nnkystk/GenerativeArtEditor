import GeneModel from '../GeneModel/GeneModel'
import MeshStorage from '../Mesh/MeshStorage';
import GeneEffectParameter from './GeneEffectParameter';

class GeneEffectPlayer{

  static play(meshStorage: MeshStorage, geneModel: GeneModel){

    /**
     *  Summary: 
     *    GeneModelに登録されたEffectを発火させる。
     *    その後、任意でEffectによる変更をStateに反映させる
     * @param   { GeneModel } geneModel: Effectを発火する対象オブジェクト
     * @return  void
     */

    // Effect適用対象のMeshを取得
    const targetMeshModel = meshStorage.getMeshById(geneModel.id);
    const targetMesh      = targetMeshModel?.mesh;

    if(targetMesh){

      // 表示中の3Dオブジェクトの各種プロパティを取得
      let parameter: GeneEffectParameter = new GeneEffectParameter();
      parameter.position  = { x: targetMesh.position.x, y: targetMesh.position.y, z: targetMesh.position.z };

      // Effect適用後のプロパティを産出
      // TODO: アニメーションの発火順序を優先度づける
      geneModel.effectStorage.storage.map( (effect) => {
        parameter = effect.calculate(parameter);
      })

      // TODO: 境界判定など特殊なEffectを実装する

      /** Meshに全Effect適用後のプロパティを反映  */
      // TODO: 色
      // TODO: スケール
      // 移動後の位置
      targetMesh.position.x += parameter.vector.x;
      targetMesh.position.y += parameter.vector.y;
      targetMesh.position.z += parameter.vector.z;
      // 回転
      targetMesh.rotation.x += parameter.rotation.x;
      targetMesh.rotation.y += parameter.rotation.y;
      targetMesh.rotation.z += parameter.rotation.z;
    }

  }

  constructor() {
  }

}

export default GeneEffectPlayer