import { EFFECT_CATALOG, EFFECT_ID } from '../GlobalVar/EffectCatalog';
import EffectRollSource from './Effects/Roll/EffectRollSource';

export class SourceGenerator{
  
  constructor(){ }

  static generateEffectModelSource(effectID: EFFECT_ID){
    const TargetEffect = SourceGenerator.findEffectModelSourceByID(effectID);
    const effect = new TargetEffect();
    return effect
  }

  static findEffectModelSourceByID(effectID: EFFECT_ID){
    const targetEffect = EFFECT_CATALOG.find( (obj) => obj.id == effectID );
    if(targetEffect){
      return targetEffect.effect;
    }else{
      return EffectRollSource;
    }
  }

}

export default SourceGenerator