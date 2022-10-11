import { EFFECT_ID } from '../../../../GAECore/GlobalVar/EffectCatalog';
import EffectModelSource from '../EffectModelSource';
import ParamMoveSource from './ParamMoveSource';

class EffectMoveSource implements EffectModelSource{

  id        : EFFECT_ID        = 'MOVE';
  parameter : ParamMoveSource = new ParamMoveSource();

}

export default EffectMoveSource