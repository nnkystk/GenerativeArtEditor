import TDModelProperty from '../../TDModelProperty';
import EffectModel from '../EffectModel';
import ParamRoll from './ParamRoll'

class EffectRoll implements EffectModel{

  parameter: ParamRoll = new ParamRoll();
  calculate(parameter: TDModelProperty){
    return parameter
  }

}

export default EffectRoll