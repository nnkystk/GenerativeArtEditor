import { EffectID } from 'src/Utilities/GlobalVarriables/EffectCatalog';
import TDModelProperty from '../../TDModelProperty';
import EffectModel from '../EffectModel';
import EffectParameter from '../EffectParameter';

class EffectRoll implements EffectModel{

  id        : EffectID = 'ROLL';
  parameter : EffectParameter;

  constructor(parameter: EffectParameter){
    this.parameter = parameter? parameter: new EffectParameter();
  }

  calculate(property: TDModelProperty, parameter?: EffectParameter){

    const _property = {...property};

    if(parameter){    // 引数としてparameterが渡された場合
      _property.rotation.x = parameter.rotation.x;
      _property.rotation.y = parameter.rotation.y;
      _property.rotation.z = parameter.rotation.z;
    }else{            // 引数としてparameterが渡されなかった場合
      _property.rotation.x = this.parameter.rotation.x;
      _property.rotation.y = this.parameter.rotation.y;
      _property.rotation.z = this.parameter.rotation.z;
    }

    return _property

  }

}

export default EffectRoll