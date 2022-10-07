import TDModelProperty from '../TDModelSourceProperty';
import EffectParameterSource from './EffectParameterSource'
import { EffectID } from '../../../Utilities/GlobalVarriables/EffectCatalog'

interface EffectModelSource{

  id        : EffectID;
  parameter : EffectParameterSource;

}

export default EffectModelSource