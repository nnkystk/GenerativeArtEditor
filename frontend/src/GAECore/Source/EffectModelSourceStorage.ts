import EffectModelSource from './Effects/EffectModelSource';

class EffectModelSourceStorage{

  public storage: Array<EffectModelSource> = [];

  store(tdModelSource: EffectModelSource){
    this.storage.push(tdModelSource);
  }

}

export default EffectModelSourceStorage