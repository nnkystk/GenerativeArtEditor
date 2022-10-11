import { EFFECT_ID } from 'src/GAECore/GlobalVar/EffectCatalog';
import EffectModelSource from '../EffectModelSource';
import EffectParameterSource from '../EffectParameterSource';

class EffectRollSource implements EffectModelSource{

  id        : EFFECT_ID              = 'ROLL';
  parameter : EffectParameterSource = new EffectParameterSource();

}

export default EffectRollSource