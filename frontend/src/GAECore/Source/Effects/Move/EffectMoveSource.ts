import { EFFECT_ID } from '../../../../GAECore/GlobalVar/EffectCatalog';
import EffectModelSource from '../EffectModelSource';
import EffectParameterSource from '../EffectParameterSource'

class EffectMoveSource implements EffectModelSource{

  id        : EFFECT_ID             = 'MOVE';
  parameter : EffectParameterSource = new EffectParameterSource();

}

export default EffectMoveSource