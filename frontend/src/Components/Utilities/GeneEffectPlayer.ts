import GeneModel from './GeneModel'


class GeneEffectPlayer{

  static play(geneModel: GeneModel){

    /**
     *  Summary: 
     *    GeneModelに登録されたEffectを発火させる。
     *    その後、任意でEffectによる変更をStateに反映させる
     * @param   { GeneModel } geneModel: Effectを発火する対象オブジェクト
     * @return  void
     */

    geneModel.effectList.map( (effect) => {
      effect.play(geneModel.mesh);
    })

  }

  constructor() {
  }

}

export default GeneEffectPlayer