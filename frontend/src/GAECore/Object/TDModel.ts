import EffectModelStorage from './EffectModelStorage'
import TDModelProperty from './TDModelProperty'

interface TDModel{
  tdObj         : any;
  effectStorage : EffectModelStorage;
  property      : TDModelProperty;
}

export default TDModel