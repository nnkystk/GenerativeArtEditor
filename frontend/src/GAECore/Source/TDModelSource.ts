import TDModelID from '../GlobalVar/TDModelID';
import EffectModelStorage from './EffectModelSourceStorage'
import TDModelSourceProperty from './TDModelSourceProperty'

class TDModelSource{

  id                        : TDModelID;
  effectModelSourceStorage  : EffectModelStorage    = new EffectModelStorage();
  property                  : TDModelSourceProperty = new TDModelSourceProperty();

  constructor(id: TDModelID){
    this.id = id;
  }

}

export default TDModelSource