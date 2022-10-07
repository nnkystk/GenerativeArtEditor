import { EffectID } from 'src/Utilities/GlobalVarriables/EffectCatalog';
import EffectModelSource from '../EffectModelSource';
import ParamRollSource from './ParamRollSource';

class EffectRollSource implements EffectModelSource{

  id        : EffectID        = 'ROLL';   
  parameter : ParamRollSource = new ParamRollSource();

}

export default EffectRollSource