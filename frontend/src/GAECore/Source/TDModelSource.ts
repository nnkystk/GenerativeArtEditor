import EffectModelStorage from './EffectModelSourceStorage'
import TDModelSourceProperty from './TDModelSourceProperty'

interface TDModelSource{
  id                        : number;
  effectModelSourceStorage  : EffectModelStorage;
  property                  : TDModelSourceProperty;
}

export default TDModelSource