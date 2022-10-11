import EffectModel from './Effects/EffectModel';

class EffectModelStorage{

  public storage: Array<EffectModel> = [];

  store(effectModel: EffectModel){
    this.storage.push(effectModel);
  }

}

export default EffectModelStorage