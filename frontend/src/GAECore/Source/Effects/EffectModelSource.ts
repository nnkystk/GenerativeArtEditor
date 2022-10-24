import EffectParameterSource from './EffectParameterSource'
import { EFFECT_ID } from 'src/GAECore/GlobalVar/EffectCatalog';

interface EffectModelSource{

  id        : EFFECT_ID;
  parameter : EffectParameterSource;

}

export default EffectModelSource