import TDModelID from '../GlobalVar/TDModelID';
import EffectModelStorage from './EffectModelSourceStorage'
import TDModelSourceProperty from './TDModelSourceProperty'

interface TDModelSource{
  id                        : TDModelID;
  effectModelSourceStorage  : EffectModelStorage;
  property                  : TDModelSourceProperty;
}

export default TDModelSource