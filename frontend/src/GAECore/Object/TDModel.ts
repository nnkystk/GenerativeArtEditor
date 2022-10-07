import EffectModelStorage from './EffectModelStorage'
import TDModelProperty from './TDModelProperty'
import TDModelID from '../GlobalVar/TDModelID';

interface TDModel{
  id            : TDModelID;
  tdObj         : any;
  effectStorage : EffectModelStorage;
  property      : TDModelProperty;
}

export default TDModel